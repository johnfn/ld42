
console.log("IMPORTED CAT FIND PATH!!!! BOWEI" )

class CatFindPath {
  public static catFindPath(gameState: State, cat: Cat, dest: { room: Room }): ({ step: (() => void) }) {
    const catBottom = cat.y + Cat.height;

    if (catBottom === dest.room.worldRect().bottom) {
      if (dest.room.worldRect().x > cat.x) {
        return { step: () => {cat.x++} };
      } else if (dest.room.worldRect().x < cat.x) {
        return { step: () => {cat.x--} };
      }
    } else {
      const closestElevator = gameState.getEntitiesByPredicate(isElevator)[0];
      console.log("CANT FIND DESTNATION, GOING TO ELEVATOR", catBottom, dest.room.worldRect().bottom, closestElevator.x);
      if (closestElevator.x > cat.x) {
          return { step: () => { cat.x++ } };
      } else if (closestElevator.x < cat.x) {
          return { step: () => { cat.x-- } };
      } else {
        // WIP kill jitter here
          return { step: () => {} };
      }
    }
    return { step: () => {} };
  }
}