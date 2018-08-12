let count = 0;
class Sun extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['sun-1'].texture));

    // this is the starting position.
    this.x = 16 * 8;
    this.y = 10;
    stage.addChild(this);
  }

  update(gameState: State): void {
    const blurFilter1 = new PIXI.filters.BlurFilter();
    count += 0.00005;

    let blurAmount = 10 * Math.cos(count);
    blurFilter1.blur = blurAmount;

    this.filters = [blurFilter1];
    console.log(blurFilter1.blur);
  }
}