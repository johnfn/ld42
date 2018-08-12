class Mountain extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['mountains-1'].texture));

    stage.addChild(this);

    // this is the starting position.
    this.x = 16 * 30;
    this.y = 16 * 8;
  }

  update(gameState: State): void {
    // do nothing
  }
}