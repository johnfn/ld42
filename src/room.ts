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

    this.addChild(roomSprite); // at relative x, y = 0
    context.addChild(this);

    this.wasClicked = false;

    roomSprite.interactive = true;
    roomSprite.on("click", (e: PIXI.interaction.InteractionEvent) => {
      console.log('clickcikckci');
      this.wasClicked = true;
    });
  }

  update(state: State): void {
    if (this.wasClicked) {
      this.wasClicked = false;
      state.selection = {
        type: "room",
        info: state.world.getBuildings().filter(b => b.worldRect.x === this.x && b.worldRect.y === this.y)[0],
      };
    }
  }
}
