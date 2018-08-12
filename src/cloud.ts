class Cloud extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['clouds-1'].texture));

    // this is the starting position.
    this.x = 0;
    this.y = 16 * 7.5;
    stage.addChild(this);
  }

  update(gameState: State): void {

    // if (this.x > Constants.WORLD_WIDTH) {
    //   this.x = 0;
    // }
    if (this.x > 1050) {
      this.x = 0;
    } else {
      this.x++;
    }
  }
}