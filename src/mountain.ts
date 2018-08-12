class Mountain extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['mountains-1'].texture));

    // this is the starting position.
    this.x = 20 * 25;
    this.y = 16 * 7.5;
    stage.addChild(this);
  }

  update(gameState: State): void {
    // do nothing
  }
}