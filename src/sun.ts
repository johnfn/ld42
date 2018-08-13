let count = 0;
class Sun extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['sun-1'].texture));

    // this is the starting position.
    this.x = 0;
    this.y = 10;
    stage.addChild(this);
  }

  update(gameState: State): void {
    const blurFilter1 = new PIXI.filters.BlurFilter();
    count += 0.0005;

    let blurAmount = Math.cos(count);
    blurFilter1.blur = 20 * blurAmount;

    this.filters = [blurFilter1];
  }
}