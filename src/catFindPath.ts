
class CatFindPath {
  public static catFindPath(cat: Cat, dest: { room: Room }): ({ step: void => void }) {
    if (dest.room.worldRect().x > cat.x) {
      return { step: () => {cat.x++} };
    } else if (dest.room.worldRect().x < cat.x) {
      return { step: () => {cat.x--} };
    }
  }
}