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
  terrainSprite?: PIXI.Container;
}

class World extends PIXI.Graphics implements IEntity {
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
    const numSkyTiles = 20; // TODO: unhardcode this

    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      grid[x] = [];

      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        let terrain: MapTerrain;

        if (y < numSkyTiles) {
          terrain = { type: 'sky' };
        } else if (y === numSkyTiles) {
          if (x < 10) {
            terrain = { type: 'water' };
          } else {
            terrain = { type: 'grass' };
          }
        } else {
          if (x < 10) {
            terrain = { type: 'water' };
          } else {
            terrain = { type: 'dirt' };
          }
        }

        grid[x][y] = {
          terrain,
        };
      }
    }

    if (Constants.DEBUG_FLAGS.DEBUG_ADD_BUILDING) {
      grid[20][10].building
    }

    return grid;
  }

  renderMap(): void {
    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        const terrainType = this.grid[x][y].terrain.type;
        let graphic: PIXI.Container;//  = new PIXI.Graphics();

        // TODO(johnfn): unhardcode colors
        if (terrainType === "sky") {
          graphic = (() => {
            const graphic = new PIXI.Graphics();
            graphic.beginFill(Constants.COLORS.SKY);
            graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
          })()
        } else if (terrainType === "grass") {
          graphic = (() => {
            const graphic = new PIXI.Graphics();
            //const graphic = new PIXI.Sprite(PIXI.loader.resources['ground-1'].texture);
            //graphic.scale = new PIXI.Point(3,4);
            graphic.beginFill(0x00ff00);
        graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
          })()
        } else if (terrainType === "dirt") {
          graphic = (() => {
            const graphic = new PIXI.Graphics();
            graphic.beginFill(0xc3870f);
        graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
          })()
        } else if (terrainType === "water") {
          graphic = (() => {
            const graphic = new PIXI.Graphics();
            graphic.beginFill(Constants.COLORS.WATER);
        graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
          })()
        } else {
          // ensure we didnt miss a case

          const x: never = terrainType;
          throw new Error(`unexpected terrain type ${ x }`);
        }


        graphic.x = x * Constants.MAP_TILE_SIZE;
        graphic.y = y * Constants.MAP_TILE_SIZE;

        this.grid[x][y].terrainSprite = graphic;

        this.addChild(graphic);
      }
    }
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
