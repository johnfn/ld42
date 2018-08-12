class Sun extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['sun-1'].texture));

    // this is the starting position.
    this.x = 16 * 32;
    this.y = 16 * 7.5;
    stage.addChild(this);
  }

  update(gameState: State): void {
    // do nothing
  }
}