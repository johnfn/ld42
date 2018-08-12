class CatSpawner extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    if (Math.random() > .99) {
      const numHomelessCats = state.getCats().filter(c => !!c.info.room).length;

      if (numHomelessCats < Constants.MAX_HOMELESS_CATS) {
        state.entities.push(new Cat(state.stage));
      }
    }
  }
}