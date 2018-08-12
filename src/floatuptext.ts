class FloatUpText extends PIXI.Graphics implements IEntity {
  lifespan   = 100;
  // wtf does this do
  z          = 100;

  constructor(state: State, text: string) {
    super();

    this.addChild(new PIXI.Text(text, {
      fontFamily: 'FreePixel', 
      fontSize  : 24, 
      fill      : 0xffffff, 
      align     : 'left'
    }));

    state.stage.addChild(this);
    state.entities.push(this);
  }

  update(state: State): void {
    this.lifespan--;

    if (this.lifespan < 0) {
      this.parent.removeChild(this);
      state.removeEntity(this);
    }

    this.y--;
  }
}