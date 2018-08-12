/**
 * a single floor of the hotel. as usual needs paddding
 * make sure to give us some padding - like tile_width / 2
 */
class HotelFloor extends PIXI.Container {
  constructor(stage: PIXI.Container, myCenter: Point) {
    super();

    //const roomContainers: Room[] = [];

    //const testOtherCenter = new Point({ x: myCenter.x + 16, y: myCenter.y});
    //testOtherCenter;
    //roomContainers.push(new Room(stage, myCenter));
    //roomContainers.push(new Room(stage, testOtherCenter));

    //this.addChild(roomContainers[0]);
    //this.addChild(roomContainers[1]);
//
    //this.x = myCenter.x - this.width / 2.0;
    //this.y = myCenter.y - this.height / 2.0;

    //j//jroomSprite.x = Constants.MAP_TILE_SIZE * 0.5;
    //jroomSprite.y = Constants.MAP_TILE_SIZE * 0.5 * 2;
    //jthis.addChild(roomSprite);

    //this.beginFill(0x8B572A, 1);
    //this.drawRect(50, 250, 120, 120);

    stage.addChild(this);
  }

  update(state: State): void {
    // state.buttons += 1;
  }
}
