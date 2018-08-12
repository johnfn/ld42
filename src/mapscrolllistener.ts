class MapScrollListener extends PIXI.Container {
  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    const mouse = state.mousePosition;

    let dx = 0;
    let dy = 0;

    const speed = Constants.MOUSE_SCROLL_SPEED;

    if (mouse.x <= Constants.MOUSE_SCROLL_DEADZONE) {
      dx -= speed;
    }
    if (mouse.x >= Constants.SCREEN_WIDTH - Constants.MOUSE_SCROLL_DEADZONE) {
      dx += speed;
    }

    if (mouse.y <= Constants.MOUSE_SCROLL_DEADZONE) {
      dy -= speed;
    }
    if (mouse.y >= Constants.SCREEN_HEIGHT - Constants.MOUSE_SCROLL_DEADZONE) {
      dy += speed;
    }

    state.camera.setX(state.camera.x + dx);
    state.camera.setY(state.camera.y + dy);


    //console.log(mouse);

    // state.camera.setX(state.camera.x + 1);
  }
}