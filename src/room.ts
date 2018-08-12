function isRoom(x: any): x is Room {
  return x.type === "ROOM_TAG";
}

/**
 * a single room. if you place these next to each other the kitties will have no wall!! 
 * make sure to give us some padding - like tile_width / 2
 */
class Room extends PIXI.Container {
  public static WIDTH_IN_TILES  = 9;
  public static HEIGHT_IN_TILES = 6;

  // we do this so that we only update during the tick
  wasClicked: boolean;

  occupants: number;
  capacity : number;

  type = "ROOM_TAG";

  constructor(props: {
    tileX    : number;
    tileY    : number;
    occupants: number;
    capacity : number;
    state    : State;
  }) {
    super();

    props.state.entities.push(this);

    this.occupants = props.occupants;
    this.capacity  = props.capacity;

    this.x = props.tileX * Constants.MAP_TILE_SIZE;
    this.y = props.tileY * Constants.MAP_TILE_SIZE;
    
    // why are we wrapping roomSprite? idk but thats how it is
    const spriteTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(spriteTexture);

    this.addChild(roomSprite); // at relative x, y = 0

    this.wasClicked = false;

    roomSprite.interactive = true;
    roomSprite.on("click", (e: PIXI.interaction.InteractionEvent) => {
      this.wasClicked = true;
    });
  }

  worldRect(): Rect {
    return new Rect({
      x: this.x,
      y: this.y,
      w: Room.WIDTH_IN_TILES  * 16,
      h: Room.HEIGHT_IN_TILES * 16,
    });
  }

  tileX(): number {
    return this.x / Constants.MAP_TILE_SIZE;
  }

  tileY(): number {
    return this.y / Constants.MAP_TILE_SIZE;
  }

  update(state: State): void {
    if (this.wasClicked) {
      this.wasClicked = false;
      state.selection = {
        type: "room",
        room: this,
      };
    }
  }
}
