
// utility functions for cat moving and pathfinding
class CatFindPath {
  public static _catFindPath(gameState: State, cat: Cat, dest: { room: Room }):(() => void) {
    const catBottom = cat.y + Cat.height;

    if (catBottom === dest.room.worldRect().bottom) {
      if (dest.room.worldRect().x > cat.x) {
        return () => {cat.x++};
      } else if (dest.room.worldRect().x < cat.x) {
        return () => {cat.x--};
      } else {
        return () => {};
      }
    } else {
      const closestElevator = gameState.getEntitiesByPredicate(isElevator)[0];
      //console.log("CANT FIND DESTNATION, GOING TO ELEVATOR", catBottom, dest.room.worldRect().bottom, closestElevator.x);
      if (closestElevator.x > cat.x) {
        return () => {cat.x++};
      } else if (closestElevator.x < cat.x) {
        return () => {cat.x--};
      } else {
        // go up / down
        if (catBottom < dest.room.worldRect().bottom) {
          return () => {cat.y++};
        } else {
          return () => {cat.y--};
        }
      }
    }
  }

  public static catFindPath(gameState: State, cat: Cat, dest: { room: Room }): ({ step: (() => void) }) {
    return {
      step: () => {
        cat.x = ~~cat.x;
        cat.y = ~~cat.y;
        CatFindPath._catFindPath(gameState, cat, dest)();
      }
    }
  }

  public static updateCatPosition(gameState: State, cat: Cat): void {
    if (cat.state.activity === 'falling') {
      cat.y += 1;
      return;
    } else if (cat.state.activity === 'going-to-room') {
      CatFindPath.catFindPath(gameState, cat, cat.state.destination).step();
    }
  }
}