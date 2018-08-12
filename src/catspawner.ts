class CatSpawner extends PIXI.Container implements IEntity {
  constructor(stage: PIXI.Container) {
    super();
  }

  update(state: State): void {
    if (Math.random() > .99) {
      state.entities.push(new Cat(state.stage));
    }
  }
}