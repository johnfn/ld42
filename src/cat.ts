type CatDesire = "buy-room"

type CatGoal = 
  | { activity: 'waiting' }
  | { activity: 'falling' }
  | { 
      activity: 'finding-room';

      destination: {
        worldRect: Rect;
        building: Building;
      };

      desire: CatDesire;
    }
  ;

type CatInfo = {
  name             : string;
  room            ?: Building;
  favoriteActivity : FavoriteCatActivities;
}

class Cat extends PIXI.Container implements IEntity {
  state: CatGoal;
  info : CatInfo;

  // we do this so that we only update during the tick
  wasClicked: boolean;

  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['pink-cat-1'].texture));

    stage.addChild(this);

    this.state = { activity: 'waiting' };

    // this is the starting position. TODO stop hardcoding this
    this.x = 16 * 15;
    this.y = 16 * 25;

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

      if (this.state.destination.worldRect.intersects(this.getRect())) {
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

        const buildings = gameState.world.getBuildings();
        const bestBuilding = Util.SortByKey(buildings, b => {
          if (b.occupants >= b.capacity) {
            return Number.POSITIVE_INFINITY;
          }

          return Util.ManhattanDistance({ x: b.worldRect.x, y: b.worldRect.y }, this);
        })[0];

        if (!bestBuilding) {
          this.say(gameState, "I can't find any rooms right meow :(");

          return { activity: 'waiting' };
        } else {
          return {
            activity: 'finding-room',
            destination: {
              worldRect: bestBuilding.worldRect,
              building: bestBuilding,
            },
            desire: "buy-room",
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

      if (this.state.destination.worldRect.intersects(this.getRect())) {
        this.info.room = dest.building; 
        dest.building.occupants++;

        this.say(gameState, "purr");
      }
    }

    if (this.wasClicked) {
      this.wasClicked = false;
      gameState.selection = {
        type: "cat",
        info: this.info,
      }
    }
  }

  say(gameState: State, text: string) {
    if (Math.random() > .99) {
      const t = new FloatUpText(gameState, text);

      this.addChild(t);
    }
  }
}