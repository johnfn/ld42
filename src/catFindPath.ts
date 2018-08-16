//import { CANCELLED } from "dns";

// utility functions for cat moving and pathfinding
class CatFindPath {
  static _catFindPath(gameState: State, cat: Cat, dest: { room: Room }):(() => void) {
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
      const closestElevator = gameState.getEntitiesBy(isElevator)[0];
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

  public static updateCatPosition(gameState: State, cat: Cat): void {
    cat.x = Math.floor(cat.x);
    cat.y = Math.floor(cat.y);

    if (cat.state.activity === 'falling') {
      cat.y += 1;
      return;
    } else if (cat.state.activity === 'going-to-room') {
      CatFindPath._catFindPath(gameState, cat, cat.state.destination)();
    } else if (cat.state.activity === 'waiting') {
    } else if (cat.state.activity === 'doing-activity') {
    } else {
      const _state: never = cat.state;
    }
  }

  public static isCatFalling(gameState: State, cat: Cat) : boolean {
    const terrainBelow = gameState.world.getCellAt(cat.x, cat.y + Cat.height).terrain;
    let walkableBuildings: IHasWorldRect[] = gameState.getEntitiesBy(isElevator);
    walkableBuildings = walkableBuildings.concat(gameState.getEntitiesBy(isRoom));

    const catLeftPaw = new Point({x: cat.x, y: cat.y + Cat.height});
    const catRightPaw = new Point({x: cat.x + Cat.width, y: cat.y + Cat.height});
    const buildingBelowLeft: boolean = (walkableBuildings.filter(b => b.worldRect().contains(catLeftPaw)).length > 0);
    const buildingBelowRight: boolean = (walkableBuildings.filter(b => b.worldRect().contains(catRightPaw)).length > 0);

    if (terrainBelow === 'grass' || terrainBelow === 'dirt') {
      return false;
    } else if (buildingBelowLeft || buildingBelowRight) {
      return false;
    } else {
      return true;
    }
  }
}