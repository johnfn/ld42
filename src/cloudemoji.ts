class CloudEmoji extends PIXI.Graphics implements IEntity {
  lifespan   = 100;
  // wtf does this do
  z          = 100;

  constructor(state: State, type: string) {
    super();

    if (type === 'heart') {
      this.addChild(new PIXI.Sprite(PIXI.loader.resources['emoji-heart'].texture));
    } else if (type === 'house') {
      this.addChild(new PIXI.Sprite(PIXI.loader.resources['emoji-house'].texture));
    }

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