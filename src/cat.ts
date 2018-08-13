// TODO: Remove occupancy when you go do something else

function isCat(x: any): x is Cat {
  return x.type === "CAT_TAG";
}

type CatGoal = 
  | { activity: 'waiting' }
  | { activity: 'falling' }
  | { activity: 'doing-activity' }
  | { 
      activity: 'going-to-room';

      destination: {
        room: Room;
      };
    }
  ;

type CatInfo = {
  name             : string;
  happiness        : number;
  statuses         : string[];
  livingRoom      ?: Room;
  currentRoom     ?: Room;
  favoriteActivity : FavoriteCatActivities;
}

class Cat extends PIXI.Container implements IEntity {
  public static width = 32;
  public static height = 32;
  public static maxHappiness = 100;

  state: CatGoal;
  info : CatInfo;

  type = "CAT_TAG";

  tick = 0;

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
      favoriteActivity: Constants.DEBUG_FLAGS.DEBUG_ALL_CATS_LIKE_YARN ? "Yarn" : Util.RandElem(Object.keys(Constants.CAT_ACTIVITIES) as FavoriteCatActivities[]),
      happiness       : 50,
      statuses        : [],
    };
  }

  addStatus(status: string): void {
    if (this.info.statuses.length === 0 &&
        this.info.statuses[this.info.statuses.length - 1] === status) {
      return;
    }

    this.info.statuses.unshift(status);

    if (this.info.statuses.length > 3) {
      this.info.statuses = this.info.statuses.slice(0, 3);
    }
  }

  // TODO stop hardcoding w/h, get correct w/h
  getRect(): Rect {
    return new Rect({
      x: this.x,
      y: this.y,
      w: Cat.width,
      h: Cat.height
    });
  }

  findRoom(gameState: State): CatGoal {
    // find a room

    const rooms = gameState.getRooms().filter(r => r.roomName === "condo" && r.hasCapacity());
    const bestRoom = Util.SortByKey(rooms, b => {
      return Util.ManhattanDistance({ x: b.worldRect().x, y: b.worldRect().y }, this);
    })[0];

    if (!bestRoom) {
      if (this.tick % 60 === 0) {
        this.info.happiness--;

        this.addStatus(`${ this.info.name } is sad because they can't find a home.`);
      }

      // this.say(gameState, "I can't find any rooms right meow :(");
      this.emote(gameState, 'house');

      return { activity: 'waiting' };
    } else {
      this.info.currentRoom = undefined;

      return {
        activity: 'going-to-room',
        destination: {
          room: bestRoom,
        },
      };
    }
  }

  activitySeekTick = 0;

  potentiallySeekOutActivity(gameState: State): CatGoal {
    ++this.activitySeekTick;

    if (this.activitySeekTick < 100) {
      return this.state;
    }

    this.activitySeekTick = 0;

    // TODO: choose a random thing to do
    // there should be other options here, like going back home

    const randomActivity = Util.RandElem(["favorite", "home"]);

    const isDoingFavoriteActivity = this.info.currentRoom && this.info.currentRoom.roomName === "yarnEmporium";
    const isAtHome = this.info.currentRoom === this.info.livingRoom;
    const lastRoom = this.info.currentRoom;
    this.info.currentRoom = undefined;

    if (lastRoom && lastRoom.roomName !== "condo") {
      lastRoom.occupants--;
    }

    if (randomActivity === "favorite" && !isDoingFavoriteActivity) {
      if (this.info.favoriteActivity === "Yarn") {
        const allYarnRooms = gameState.getRooms().filter(r => r.roomName === "yarnEmporium");
        const roomsWithCapacity = allYarnRooms.filter(r => r.hasCapacity());

        if (roomsWithCapacity.length === 0) {
          if (allYarnRooms.length > 0) {
            this.addStatus(`${ this.info.name } is sad because the yarn emporium is busy.`);
          } else {
            this.addStatus(`${ this.info.name } is sad because there is no yarn.`);
          }

          this.info.happiness--;

          return { activity: 'doing-activity' };
        } else {
          return {
            activity: 'going-to-room',
            destination: {
              room: roomsWithCapacity[0],
            },
          };
        }
      }
    } else if (randomActivity === "home" && !isAtHome) {
      this.info.happiness++;

      return {
        activity: 'going-to-room',
        destination: {
          room: this.info.livingRoom!,
        },
      };
    }

    return { activity: 'doing-activity' };
  }

  updateCatState(gameState: State): CatGoal {
    const tileBelow = gameState.world.getCellAt(this.x, this.y + Cat.height);

    if (tileBelow.terrain === 'sky') {
      return { activity: 'falling' };

      // we update our state based on our current state.
    } else if (this.state.activity === 'falling') {
      // we already checked that we're not in the sky, so we're definitely on land.

      return { activity: 'waiting' };
    } else if (this.state.activity === 'going-to-room') {
      const destRoom = this.state.destination.room;
      const destRect = destRoom.worldRect();

      if (destRect.contains(this.getRect())) {
        // make sure that this hasn't been filled since we last checked

        if (!destRoom.hasCapacity()) {
          this.x = Util.RandRange(destRect.x, destRect.x + destRect.w - Cat.width);

          // this.say(gameState, "My catroom got taken meow :(", true);

          return { activity: 'waiting' };
        } else {
          this.x = Util.RandRange(destRect.x, destRect.x + destRect.w - Cat.width);
          destRoom.occupants++;

          this.info.currentRoom = destRoom;

          if (destRoom.roomName === "condo") {
            this.info.livingRoom = destRoom;
            this.addStatus(`${ this.info.name } has found a room to stay!`);

            return { activity: 'doing-activity' };
          } else {
            this.addStatus(`${ this.info.name } is playing with yarn!`);
            return { activity: 'doing-activity' };
          }
        }
      } else {
        return this.state;
      }
    } else if (this.state.activity === 'waiting') {
      if (this.info.livingRoom) {
        return this.potentiallySeekOutActivity(gameState);
      } else {
        return this.findRoom(gameState);
      }
    } else if (this.state.activity === 'doing-activity') {
      if (this.info.livingRoom) {
        return this.potentiallySeekOutActivity(gameState);
      } else {
        return this.findRoom(gameState);
      }
    } else {
      const _state: never = this.state;
      return { activity: 'waiting' };
    }
  }

  update(gameState: State): void {
    this.tick++;

    // update state

    this.state = this.updateCatState(gameState);

    // update cat based on state

    if (this.state.activity === 'falling') {
      this.y += 1;
    } else if (this.state.activity === 'going-to-room') {
      const dest = this.state.destination;

      if (dest.room.worldRect().x > this.x) {
        this.x++;
      } else if (dest.room.worldRect().x < this.x) {
        this.x--;
      }

      /*
      if (this.state.destination.worldRect.contains(this.getRect()) && this.state.destination.room.hasCapacity()) {
        this.info.room = dest.room; 
        dest.room.occupants++;
      } */
    } else if (this.state.activity === 'waiting'){

    } else if (this.state.activity === 'doing-activity'){
      // this.say(gameState, "purr");
      this.emote(gameState, 'heart');
    } else {
      const _state: never = this.state;
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

    // give buttons

    this.payRent(gameState);
  }

  payRent(gameState: State): void {
    if (gameState.time.hour === 12 && gameState.time.minute === 0 && this.info.livingRoom) {
      gameState.buttons += this.info.livingRoom.rent;

      this.say(gameState, `+${ this.info.livingRoom.rent } buttons`, true);
    }
  }

  say(gameState: State, text: string, alwaysSay = false) {
    if (Math.random() > .99 || alwaysSay) {
      const t = new FloatUpText(gameState, text);

      this.addChild(t);
    }
  }

  emote(gameState: State, type: 'heart' | 'house', alwaysSay = false) {
    if (Math.random() > .99 || alwaysSay) {
      const t = new CloudEmoji(gameState, type);

      this.addChild(t);
    }
  }
}