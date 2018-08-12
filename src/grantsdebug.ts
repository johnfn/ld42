// Grant's debugging class.

// Feel free to disregard this.

class GrantsDebug extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();

    const gfx = new PIXI.Graphics();

    gfx.beginFill(0xff0000);
    gfx.drawRect(200, 200, 50, 50);
    this.addChild(gfx);

    stage.addChild(this);
  }

  update(state: State): void {
    // state.camera.setX(state.camera.x + 1);
  }
}