/**
 * a single room. if you place these next to each other the kitties will have no wall!! 
 * make sure to give us some padding - like tile_width / 2
 */
class Room extends PIXI.Container {
  
  // adds myself to context centered at my_center relative to context
  constructor(context: PIXI.Container, my_center: Point) {
    super();
    
    // why are we wrapping roomSprite? idk but thats how it is
    const spriteTexture: PIXI.Texture = PIXI.loader.resources.room.texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(spriteTexture);
    //roomSprite.x  -= this.width / 2.0;
    //roomSprite.y  -= this.height / 2.0;
    this.addChild(roomSprite); // at relative x, y = 0
    // need roomSprite.width and roomSprite.height to be both divisible by tile_width
    // my size is 144 x 96, floor needs to handle
    // ie 9 * 16 x 6 * 16
    //Assert(roomSprite.width == 144 && roomSprite.height == 96);

    // move myself to my center
    //roomSprite.x = Constants.MAP_TILE_SIZE * 0.5;
    //roomSprite.y = Constants.MAP_TILE_SIZE * 0.5 * 2;
    //console.log('room width is ', this.width);
    this.x = my_center.x - this.width / 2.0;
    this.y = my_center.y - this.height / 2.0;

    //this.beginFill(0x8B572A, 1);
    //this.drawRect(50, 250, 120, 120);

    context.addChild(this);
  }

  update(state: State): void {
    
    // state.buttons += 1;
  }
}
