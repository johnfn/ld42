function isCat(x: any): x is Cat {
  return x.type === "CAT_TAG";
}

type CatGoal = 
  | { activity: 'waiting' }
  | { activity: 'falling' }
  | { activity: 'living' }
  | { 
      activity: 'finding-room';

      destination: {
        worldRect: Rect;
        room: Room;
      };
    }
  ;

type CatInfo = {
  name             : string;
  room            ?: Room;
  favoriteActivity : FavoriteCatActivities;
}

class Cat extends PIXI.Container implements IEntity {
  state: CatGoal;
  info : CatInfo;

  type = "CAT_TAG";

  // we do this so that we only update during the tick
  wasClicked: boolean;

  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['pink-cat-1'].texture));

    stage.addChild(this);

    this.state = { activity: 'waiting' };

    this.info = this.generateCatInfo();

    this.interactive = true;
    this.wasClicked = false;
    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      this.wasClicked = true;
    });
  }

  generateCatInfo(): CatInfo {
    return {
      name            : Util.RandElem(Constants.Strings.CAT_NAMES),
      favoriteActivity: Util.RandElem(Object.keys(Constants.CAT_ACTIVITIES) as FavoriteCatActivities[]),
    }
  }

  // TODO stop hardcoding w/h, get correct w/h
  getRect(): Rect {
    return new Rect({
      x: this.x,
      y: this.y,
      w: 32,
      h: 32,
    });
  }

  updateCatState(gameState: State): CatGoal {
    const tileBelow = gameState.world.getCellAt(this.x, this.y + 32);

    if (tileBelow.terrain === 'sky') {
      return { activity: 'falling' };
    }

    // we update our state based on our current state.

    if (this.state.activity === 'falling') {
      // we already checked that we're not in the sky, so we're definitely on land.

      return { activity: 'waiting' };
    }

    if (this.state.activity === 'finding-room') {
      // TODO - see if we've reached our destination.

      if (this.state.destination.worldRect.contains(this.getRect())) {
        return { activity: 'waiting' };
      } else {
        return this.state;
      }
    }

    if (this.state.activity === 'waiting') {
      if (this.info.room) {
        return { activity: 'waiting' };
      } else {
        // find a room

        const rooms = gameState.getRooms().filter(r => r.occupants < r.capacity);

        const bestRoom = Util.SortByKey(rooms, b => {
          return Util.ManhattanDistance({ x: b.worldRect().x, y: b.worldRect().y }, this);
        })[0];

        if (!bestRoom) {
          this.say(gameState, "I can't find any rooms right meow :(");

          return { activity: 'waiting' };
        } else {
          return {
            activity: 'finding-room',
            destination: {
              worldRect: bestRoom.worldRect(),
              room: bestRoom,
            },
          };
        }
      }
    }

    return { activity: 'waiting' };
  }

  update(gameState: State): void {
    // update state

    this.state = this.updateCatState(gameState);

    // update cat based on state

    if (this.state.activity === 'falling') {
      this.y += 1;
    }

    if (this.state.activity === 'finding-room') {
      const dest = this.state.destination;

      if (dest.worldRect.x > this.x) {
        this.x++;
      }

      if (dest.worldRect.x < this.x) {
        this.x--;
      }

      if (this.state.destination.worldRect.contains(this.getRect())) {
        this.info.room = dest.room; 
        dest.room.occupants++;
      }
    }

    if (this.state.activity === 'waiting'){
      if (this.info.room) {
        this.say(gameState, "purr");
      }
    }

    if (this.wasClicked) {
      this.wasClicked = false;

      gameState.selection = {
        type: "cat",
        cat: this,
      }
    }

    // update graphics

    if (gameState.selection.type === "cat" && gameState.selection.cat === this) {
      this.alpha = 0.8;
    } else {
      this.alpha = 1.0;
    }
  }

  say(gameState: State, text: string) {
    if (Math.random() > .99) {
      const t = new FloatUpText(gameState, text);

      this.addChild(t);
    }
  }
}