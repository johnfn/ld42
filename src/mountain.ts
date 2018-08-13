class Mountain extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();

    this.addChild(new PIXI.Sprite(PIXI.loader.resources['mountains-1'].texture));

    // this is the starting position.
    const target_bottom_y = Constants.MAP_TILE_SIZE * Constants.SKY_HEIGHT_IN_TILES; // 480
    this.x = Constants.MAP_TILE_SIZE * 32;
    this.y = target_bottom_y - 360; //Constants.MAP_TILE_SIZE * 7.5; // 16 * 7.5 = 120
    stage.addChild(this);
  }

  update(gameState: State): void {
    // do nothing
  }
}