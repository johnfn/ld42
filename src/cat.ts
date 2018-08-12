type CatDesire = "buy-room"

type CatGoal = 
  | { activity: 'waiting' }
  | { activity: 'falling' }
  | { 
      activity: 'walking';

      destination: {
        worldX: number;
        worldY: number;
      };

      desire: CatDesire;
    }
  ;

type CatInfo = {
  name             : string;
  room            ?: Point;
  favoriteActivity : FavoriteCatActivities;
}

class Cat extends PIXI.Container implements IEntity {
  state: CatGoal;
  info : CatInfo;

  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['pink-cat-1'].texture));

    stage.addChild(this);

    this.state = { activity: 'waiting' };

    this.x = 16 * 15;
    this.y = 16 * 25;

    this.info = this.generateCatInfo();
  }

  generateCatInfo(): CatInfo {
    return {
      name            : Util.RandElem(Constants.Strings.CAT_NAMES),
      favoriteActivity: Util.RandElem(Object.keys(Constants.CAT_ACTIVITIES) as FavoriteCatActivities[]),
    }
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

    if (this.state.activity === 'walking') {
      // TODO - see if we've reached our destination.

      return this.state;
    }

    if (this.state.activity === 'waiting') {
      const buildings = gameState.world.getBuildings();
      const bestBuilding = Util.SortByKey(buildings, b => {
        if (b.occupants >= b.capacity) {
          return Number.POSITIVE_INFINITY;
        }

        return Util.ManhattanDistance({ x: b.worldX, y: b.worldY }, this);
      })[0];

      if (!bestBuilding) {
        this.say(gameState, "I can't find any rooms meow :(");

        return { activity: 'waiting' };
      } else {
        return {
          activity: 'walking',
          destination: {
            worldX: bestBuilding.worldX,
            worldY: bestBuilding.worldY,
          },
          desire: "buy-room",
        };
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

    if (this.state.activity === 'walking') {
      const dest = this.state.destination;

      if (dest.worldX > this.x) {
        this.x++;
      }

      if (dest.worldX < this.x) {
        this.x--;
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
