class Cat extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();

    const graphic = new PIXI.Graphics();

    graphic.beginFill(0xffffff);
    graphic.drawRect(0, 0, 16, 16);

    this.addChild(graphic);
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
