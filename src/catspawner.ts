class CatSpawner extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    if (Math.random() > .99) {
      const numHomelessCats = state.getCats().filter(c => !!c.info.room).length;

      if (numHomelessCats < Constants.MAX_HOMELESS_CATS) {
        const newCat = new Cat(state.stage);

        state.entities.push(newCat);

        // this is the starting position. TODO stop hardcoding this

        newCat.x = 14 * 15;
        newCat.y = 16 * 25 + Math.floor(Math.random() * 100);
      }
    }
  }
}