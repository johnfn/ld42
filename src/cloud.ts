class Cloud extends PIXI.Container implements IEntity {
  public static CLOUD_START_X = -256;
  public static CLOUD_START_Y = Constants.GROUND_LOCATION_Y - 448;
  public static CLOUD_VELOCITY = 0.2;

  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['clouds-1'].texture));

    // this is the starting position.
    this.x = Cloud.CLOUD_START_X;
    this.y = Cloud.CLOUD_START_Y;
    stage.addChild(this);
  }

  update(gameState: State): void {

    // if (this.x > Constants.WORLD_WIDTH) {
    //   this.x = 0;
    // }
    if (this.x > Constants.WORLD_WIDTH) { // world_width = 1120
      this.x = Cloud.CLOUD_START_X;
    } else {
      this.x += Cloud.CLOUD_VELOCITY;
    }
  }
}