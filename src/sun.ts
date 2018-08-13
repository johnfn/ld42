class Sun extends PIXI.Container implements IEntity {
  public static SUN_START_X = 0;
  public static SUN_START_Y = Constants.GROUND_LOCATION_Y - 464;
  count: number;

  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['sun-1'].texture));

    this.count = 0;
    this.x = Sun.SUN_START_X;
    this.y = Sun.SUN_START_Y;
    stage.addChild(this);
  }

  update(gameState: State): void {
    const blurFilter1 = new PIXI.filters.BlurFilter();
    this.count += 0.0005;
    let blurAmount = Math.cos(this.count);
    blurFilter1.blur = 20 * this.count;

    this.filters = [blurFilter1];
  }
}