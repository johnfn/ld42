class MapScrollListener extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    const mouse = state.mousePosition;

    console.log(mouse);

    // state.camera.setX(state.camera.x + 1);
  }
}