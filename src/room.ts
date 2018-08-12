class Room extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();
    const spriteTexture: PIXI.Texture = PIXI.loader.resources[`./assets/test.png`].texture;
    this.addChild(new PIXI.Sprite(spriteTexture));

    //this.beginFill(0x8B572A, 1);
    //this.drawRect(50, 250, 120, 120);

    stage.addChild(this);
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
