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
  terrain       : MapTerrain;
  building     ?: MapBuilding;

  terrainSprite?: PIXI.Graphics;
}

class Map extends PIXI.Graphics implements IEntity {
  /**
   * what is at the (x, y) position of the map? 
   */
  grid: MapCell[][];

  constructor(stage: PIXI.Container) {
    super();

    stage.addChild(this);
    this.grid = this.buildMap();

    this.renderMap();
  }

  buildMap(): MapCell[][] {
    const grid: MapCell[][] = [];

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

        grid[x][y] = {
          terrain,
        };
      }
    }

    return grid;
  }

  renderMap(): void {
    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        const terrainType = this.grid[x][y].terrain.type;
        const graphic = new PIXI.Graphics();

        if (terrainType === "sky") {
          graphic.beginFill(0x0000ff);
        } else if (terrainType === "grass") {
          graphic.beginFill(0x00ff00);
        } else if (terrainType === "dirt") {
          graphic.beginFill(0xc3870f);
        } else if (terrainType === "water") {
          graphic.beginFill(0x0000ff);
        } else {
          // ensure we didnt miss a case

          const x: never = terrainType;
          throw new Error(`unexpected terrain type ${ x }`);
        }

        graphic.drawRect(0, 0, 32, 32);

        graphic.x = x * 32;
        graphic.y = y * 32;

        this.grid[x][y].terrainSprite = graphic;
      }
    }
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
