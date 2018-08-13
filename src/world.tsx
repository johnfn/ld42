// This is the parent object that contains all stuff related to the map - rooms,
// grass tiles, water tiles, CATS, etc.
// It's a big 2d grid.

type MapBuilding = 
  | { type: "room" }

type MapCell = {
  terrain        : TerrainTypes;
  terrainSprite ?: PIXI.Container;
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

    new Mountain(this);

  }

  update(state: State): void {
  }

  buildMap(): MapCell[][] {
    const grid: MapCell[][] = [];
    const numSkyTiles = Constants.SKY_HEIGHT_IN_TILES; 
    const leftWaterTiles = Constants.LEFT_WATER_WIDTH_IN_TILES;

    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      grid[x] = [];

      for (let y = 0; y < Constants.MAP_HEIGHT_IN_TILES; y++) {
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

  /**
   * expects x, y coordinates in grid coordinates
   */
  public addRoom(x: number, y: number, state: State, roomName: RoomName): void {
    const room = new Room({
      tileX: x,
      tileY: y,
      roomName,
      state,
    });

    this.addChild(room);
  }

  public getCellAt(x: number, y: number): MapCell {
    //console.log(Math.floor(x / Constants.MAP_TILE_SIZE), Math.floor(y / Constants.MAP_TILE_SIZE));

    return this.grid[Math.floor(x / Constants.MAP_TILE_SIZE)][Math.floor(y / Constants.MAP_TILE_SIZE)];    
  }   

  renderMap(): void {
    // do intelligent things: (thanks johnfn)
    for (let x = 0; x < Constants.MAP_WIDTH_IN_TILES; x++) {
      for (let y = 0; y < Constants.MAP_HEIGHT_IN_TILES; y++) {
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
          graphic = new PIXI.Graphics() || (() => {
            const graphic = new PIXI.Graphics();
            graphic.beginFill(Constants.COLORS.WATER);
            graphic.drawRect(0, 0, Constants.MAP_TILE_SIZE, Constants.MAP_TILE_SIZE);
            return graphic;
            //return new PIXI.Container();
          })()
        } else if (terrainType === "dirt") {
          graphic = new PIXI.Graphics();
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
      //whenToRender: (mapCell: MapCell): boolean => ((console.log('called', mapCell.terrain) || true) && (mapCell.terrain) === 'grass' && (console.log('grass') || true)),
      whenToRender: (mapCell: MapCell): boolean => ((mapCell.terrain) === 'grass'),
      spriteCreator: (): { graphic: PIXI.Container, widthTiles: number, heightTiles: number } => {
        console.log("MAKE SOME grass")
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
    thingType: 'terrainSprite',
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
