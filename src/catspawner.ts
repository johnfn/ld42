class CatSpawner extends PIXI.Container implements IEntity {
  public static CAT_SPAWN_Y = Constants.MAP_TILE_SIZE * 25;
  public static CAT_SPAWN_X_MIN = Constants.MAP_TILE_SIZE * 7.5;
  public static CAT_SPAWN_X_RANGE = Constants.MAP_TILE_SIZE * 6;

  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    if (Math.random() > .99) {
      const numHomelessCats = state.getCats().filter(c => !c.info.livingRoom).length;

      if (numHomelessCats < Constants.MAX_HOMELESS_CATS) {
        const newCat = new Cat(state.stage);

        state.entities.push(newCat);

        // this is the starting position. TODO stop hardcoding this

        newCat.x = CatSpawner.CAT_SPAWN_X_MIN + Math.floor(Math.random() * 100);
        newCat.y = 16 * 25;
      }
    }
  }
}