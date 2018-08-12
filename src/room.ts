class Room extends PIXI.Graphics {
  constructor(stage: PIXI.Container) {
    super();

    this.beginFill(0x8B572A, 1);
    this.drawRect(50, 250, 120, 120);

    stage.addChild(this);
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
