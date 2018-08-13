function isElevator(x: any): x is Elevator {
    return x.type === 'ELEVATOR_TAG';
}

class Elevator extends PIXI.Container implements IEntity {
  public static ELEVATOR_WIDTH_IN_TILES = 2;
  public static ELEVATOR_START_X = (
      Constants.INITIAL_BUILDER_LOCATIONX_IN_TILES - Elevator.ELEVATOR_WIDTH_IN_TILES
    ) * Constants.MAP_TILE_SIZE;
  //public static ELEVATOR_START_Y = Constants.GROUND_LOCATION_Y; // assuming 0 floors
  // height in room heights
  numFloors: number;
  type = 'ELEVATOR_TAG';

  constructor(stage: PIXI.Container) {
    super();
    this.numFloors = 1;

    stage.addChild(this);

    this.reRenderSelf();
  }

  update(gameState: State): void {
  }

  // returns pixel value of center of elevator in x coordinates
  getCenter(): number {
    return Elevator.ELEVATOR_START_X + 0.5 * this.width;
  }

  // WIP do not use
  _incrementFloors(): void {
    this.numFloors++;
    const gfx = new PIXI.Graphics();
    gfx.beginFill(Constants.COLORS.ELEVATOR);
    gfx.drawRect(0, 0, 
      Elevator.ELEVATOR_WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, 
      Constants.ROOM_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE * this.numFloors
    );
    gfx.y = Constants.GROUND_LOCATION_Y - this.numFloors * Constants.ROOM_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;
    this.addChild(gfx);
  }

  // when adding levels, increment my numFloors and then call my renderSelf()
  reRenderSelf(): void {

    // first remove
    this.removeChild(this.children[0]);

    const gfx = new PIXI.Graphics();
    gfx.beginFill(Constants.COLORS.ELEVATOR);
    gfx.drawRect(0, 0, 
        Elevator.ELEVATOR_WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, 
        Constants.ROOM_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE * this.numFloors
    );
    this.addChild(gfx);

    this.x = Elevator.ELEVATOR_START_X;
    this.y = Constants.GROUND_LOCATION_Y - this.numFloors * Constants.ROOM_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;
  }
}