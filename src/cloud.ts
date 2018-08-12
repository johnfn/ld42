class Cloud extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['clouds-1'].texture));

    // this is the starting position.
    this.x = -250;
    this.y = 16 * 2;
    stage.addChild(this);
  }

  update(gameState: State): void {

    // if (this.x > Constants.WORLD_WIDTH) {
    //   this.x = 0;
    // }
    if (this.x > 1050) {
      this.x = -250;
    } else {
      this.x+= 0.2;
    }
  }
}