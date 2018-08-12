/**
 * a single room. if you place these next to each other the kitties will have no wall!! 
 * make sure to give us some padding - like tile_width / 2
 */
class Room extends PIXI.Container {
  
  // we do this so that we only update during the tick
  wasClicked: boolean;

  // adds myself to context centered at my_center relative to context
  constructor(context: PIXI.Container, my_center?: Point) {
    super();
    
    // why are we wrapping roomSprite? idk but thats how it is
    const spriteTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(spriteTexture);
    roomSprite;
    const debugSprite: PIXI.Graphics = new PIXI.Graphics();
    debugSprite.beginFill(0x8B572A, 1);
    debugSprite.drawRect(0, 0, 144, 96);

    //roomSprite.x  -= this.width / 2.0;
    //roomSprite.y  -= this.height / 2.0;
    this.addChild(roomSprite); // at relative x, y = 0
    //this.addChild(debugSprite); // at relative x, y = 0
    // need roomSprite.width and roomSprite.height to be both divisible by tile_width
    // my size is 144 x 96, floor needs to handle
    // ie 9 * 16 x 6 * 16
    //Assert(roomSprite.width == 144 && roomSprite.height == 96);

    context.addChild(this);

    this.wasClicked = false;

    this.on("click", (e: PIXI.interaction.InteractionEvent) => {
      this.wasClicked = true;
    });
  }

  update(state: State): void {
    if (this.wasClicked) {
      this.wasClicked = false;
      state.selection = {
        type: "room",
        info: this.info,
      }
    }
  }
}
