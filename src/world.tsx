// This is the parent object that contains all stuff related to the map - rooms,
// grass tiles, water tiles, CATS, etc.
// It's a big 2d grid.

type MapBuilding = 
  | { type: "room" }

type MapCell = {
  terrain        : TerrainTypes;
  building      ?: MapBuilding;
  terrainSprite ?: PIXI.Container;
  buildingSprite?: PIXI.Container;
}

// TODO: Maybe separate into layers?

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

    if (Constants.DEBUG_FLAGS.DEBUG_ADD_BUILDING) {
      this.addRoom(30, Constants.SKY_HEIGHT_IN_TILES - 2);
    }
  }

  update(state: State): void {
    // state.buttons += 1;
  }

  buildMap(): MapCell[][] {
    const grid: MapCell[][] = [];
    const numSkyTiles = Constants.SKY_HEIGHT_IN_TILES; 
    //const numSkyTiles = 20; // TODO: unhardcode this
    const leftWaterTiles = 10;

    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      grid[x] = [];

      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        let terrain: TerrainTypes;

        if (y < numSkyTiles) {
          terrain = 'sky';
        } else if (y >= numSkyTiles && y < numSkyTiles + 3) {
          if (x < leftWaterTiles) {
            terrain = 'water';
          } else {
            terrain = 'grass';
          }
        } else {
          terrain = 'water';
        }

        grid[x][y] = {
          terrain,
        };
      }
    }

    return grid;
  }

  public addRoom(x: number, y: number): void {
    this.grid[x][y].building = { type: "room" };

    const buildingSprite = new PIXI.Graphics();

    buildingSprite.beginFill(0x00ffff);
    buildingSprite.drawRect(x * 16, y * 16, 32, 32);

    this.addChild(buildingSprite);

    this.grid[x][y].buildingSprite = buildingSprite;
  }

  public getCellAt(x: number, y: number): MapCell {
    console.log(Math.floor(x / Constants.MAP_TILE_SIZE), Math.floor(y / Constants.MAP_TILE_SIZE));

    return this.grid[Math.floor(x / Constants.MAP_TILE_SIZE)][Math.floor(y / Constants.MAP_TILE_SIZE)];    
  }   

  renderMap(): void {
    // do intelligent things: (thanks johnfn)
    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      for (let y = 0; y < Constants.MAP_WIDTH_IN_TILES; y++) {
        const terrainType = this.grid[x][y].terrain;
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
            graphic.beginFill(Constants.COLORS.WATER);
            graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
            //return new PIXI.Container();
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

    const numSkyTiles = Constants.SKY_HEIGHT_IN_TILES; 
    const leftWaterTiles = 10;

    const renderBlockyThing = (terrainType: string, renderfn: (() => PIXI.Container)) => {
      const toBeFilled: boolean[][] = new Array(Constants.MAP_WIDTH_IN_TILES);

      for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
        toBeFilled[x] = new Array(Constants.MAP_HEIGHT_IN_TILES);
        for (let y = 0; y < Constants.MAP_HEIGHT_IN_TILES; y++) {
          if (this.grid[x][y].terrain === terrainType) {
            toBeFilled[x][y] = true;
          } else {
            toBeFilled[x][y] = false;
          }
        }
      }

      for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
        for (let y = 0; y < Constants.MAP_HEIGHT_IN_TILES; y++) {
          if (toBeFilled[x][y]) {
            // test if all the next stuff is relevant
            // just assume it is for now

            const graphic = renderfn(); // needs to be a new one each time
            graphic.x = x * Constants.MAP_TILE_SIZE;
            graphic.y = y * Constants.MAP_TILE_SIZE;
            this.addChild(graphic);

            // iterate 
            for (let xi = 0; xi < 19; xi++ ) {
              for (let yi = 0; yi < 3; yi++) {
                if (x + xi >= Constants.MAP_WIDTH_IN_TILES) { continue; }
                if (y + yi >= Constants.MAP_HEIGHT_IN_TILES) { continue; }

                toBeFilled[x + xi][y + yi] = false;
              }
            }
          }
        }
      }
    }

    renderBlockyThing('grass', (): PIXI.Container => {
      return new PIXI.Sprite(PIXI.loader.resources['ground-1'].texture); // 324 x 48
      /*
      const graphic = new PIXI.Sprite(PIXI.loader.resources['ground-1'].texture); // 324 x 48
      graphic.x = x * Constants.MAP_TILE_SIZE;
      graphic.y = y * Constants.MAP_TILE_SIZE;
      return graphic; */
    });
  }
}
