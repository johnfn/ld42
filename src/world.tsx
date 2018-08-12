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

type Building = {
  type     : "room" | "laboratory";

  tileX    : number;
  tileY    : number;

  worldRect: Rect;

  occupants: number;
  capacity : number;
};

// TODO: Maybe separate into layers?

class World extends PIXI.Graphics implements IEntity {
  /**
   * what is at the (x, y) position of the map? 
   */
  grid: MapCell[][];
  buildings: Building[];

  constructor(stage: PIXI.Container) {
    super();

    stage.addChild(this);
    this.grid = this.buildMap();
    this.buildings = [];

    this.renderMap();

    if (Constants.DEBUG_FLAGS.DEBUG_ADD_BUILDING) {
      this.addRoom(30, Constants.SKY_HEIGHT_IN_TILES - 6);
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
    const buildingSprite = new Room(this);
    const widthInTiles   = 9;
    const heightInTiles  = 6;

    // TODO(grant): dont forget all the x + xi , y + yi tiles need to be tagged here
    this.grid[x][y].building = { type: "room" };

    for (let i = x; i < x + widthInTiles; i++) {
      for (let j = y; j < y + heightInTiles; j++) {
        this.grid[i][j].building = { type: "room" };
      }
    }

    buildingSprite.x = x * Constants.MAP_TILE_SIZE;
    buildingSprite.y = y * Constants.MAP_TILE_SIZE;

    this.addChild(buildingSprite);

    // TODO(grant): dont forget all the x + xi , y + yi tiles need to be tagged here too
    this.grid[x][y].buildingSprite = buildingSprite;

    this.buildings.push({
      type: "room",

      tileX: x,
      tileY: y,

      worldRect: new Rect({
        x: x * Constants.MAP_TILE_SIZE,
        y: y * Constants.MAP_TILE_SIZE,
        w: widthInTiles * 16,
        h: widthInTiles * 16,
      }),

      occupants: 0,
      capacity : 5,
    });
  }

  public getBuildings(): Building[] {
    return this.buildings;
  }

  public getCellAt(x: number, y: number): MapCell {
    //console.log(Math.floor(x / Constants.MAP_TILE_SIZE), Math.floor(y / Constants.MAP_TILE_SIZE));

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

    // render grass
    this.renderBlockyThing({
      thingType: 'terrainSprite',
      whenToRender: (mapCell: MapCell): boolean => ((mapCell.terrain) === 'grass'),
      spriteCreator: (): { graphic: PIXI.Container, widthTiles: number, heightTiles: number } => {
        return {  
          // 324 x 48
          graphic : new PIXI.Sprite(PIXI.loader.resources['ground-1'].texture),
          widthTiles: 19,
          heightTiles: 3
        };
      }
    })
    // render rooms
    /*
    this.renderBlockyThing({
      thingType: 'buildingSprite',
      whenToRender: (mapCell: MapCell): boolean => ((mapCell.building && mapCell.building.type) === 'room'),
      spriteCreator: (): { graphic: PIXI.Container, widthTiles: number, heightTiles: number } => {
        return {  
          // 324 x 48
          graphic : new PIXI.Sprite(PIXI.loader.resources['ground-1'].texture),
          widthTiles: 19,
          heightTiles: 3
        };
      }
    }) */
  }

  renderBlockyThing(args: {
    thingType: 'terrainSprite' | 'buildingSprite',
    whenToRender: ((m: MapCell) => boolean),
    spriteCreator: (() => { graphic: PIXI.Container, widthTiles: number, heightTiles: number } )
  }): void {
    const toBeFilled: boolean[][] = new Array(Constants.MAP_WIDTH_IN_TILES);

    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      toBeFilled[x] = new Array(Constants.MAP_HEIGHT_IN_TILES);
      for (let y = 0; y < Constants.MAP_HEIGHT_IN_TILES; y++) {
        if (args.whenToRender(this.grid[x][y])) {
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

          const { graphic, widthTiles, heightTiles } = args.spriteCreator(); // needs to be a new one each time
          graphic.x = x * Constants.MAP_TILE_SIZE;
          graphic.y = y * Constants.MAP_TILE_SIZE;
          this.addChild(graphic);

          // iterate 
          for (let xi = 0; xi < widthTiles; xi++ ) {
            for (let yi = 0 ; yi < heightTiles; yi++) {
              if (x + xi >= Constants.MAP_WIDTH_IN_TILES) { continue; }
              if (y + yi >= Constants.MAP_HEIGHT_IN_TILES) { continue; }

              toBeFilled[x + xi][y + yi] = false; 
              // attach back each cell to its containing sprite
              this.grid[x + xi][y + yi][args.thingType] = graphic;
            }
          }
        }
      }
    }
  }
}
