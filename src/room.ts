class Room extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();
    const spriteTexture: PIXI.Texture = PIXI.loader.resources.room.texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(spriteTexture);
    // need roomSprite.width and roomSprite.height to be both divisible by tile_width

    roomSprite.x = 16 * 1;
    roomSprite.x = 16 * 2;
    this.addChild(roomSprite);

    //this.beginFill(0x8B572A, 1);
    //this.drawRect(50, 250, 120, 120);

    stage.addChild(this);
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
