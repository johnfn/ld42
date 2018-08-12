class Mountain extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['mountains-1'].texture));

    stage.addChild(this);

    // this is the starting position. TODO stop hardcoding this
    this.x = 16 * 15;
    this.y = 16 * 25;
  }

  update(gameState: State): void {
    // do nothing
  }
}