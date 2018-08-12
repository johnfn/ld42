// This is the parent object that contains all stuff related to the map - rooms,
// grass tiles, water tiles, CATS, etc.
// It's a big 2d grid.

type MapTerrain = 
  | { type: "sky" }
  | { type: "grass" }
  | { type: "dirt" }
  | { type: "water" }

type MapBuilding = 
  | { type: "room" }

type MapCell = {
  terrain: MapTerrain;
  building?: MapBuilding;
}

class Map extends PIXI.Graphics implements IEntity {
  /**
   * what is at the (x, y) position of the map? 
   */
  grid: MapCell[][];

  constructor(stage: PIXI.Container) {
    super();

    }

    stage.addChild(this);

    this.buildMap();
  }

  buildMap(): void {
    this.grid = [];

    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        let terrain: MapTerrain;

        if (y < 10) {
          terrain = { type: 'sky' };
        } else if (y === 10) {
          terrain = { type: 'grass' };
        } else {
          terrain = { type: 'dirt' }
        }

        this.grid[x][y] = {
          terrain,
        };
      }
    }
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
