const RoomTypes = {
  condo: {
    name     : "Condo 1",
    capacity : 5,
    occupancy: 0,

    cost: {
      buttons: 10,
    },
  },

  catLabratory: {
    name: "Cat Laboratailory",
    capacity : 0,
    occupancy: 0,

    cost: {
      buttons: 200,
    },
  },

  yarnEmporium: {
    name: "Yarn Empurrrrrrium",
    capacity : 0,
    occupancy: 0,

    cost: {
      buttons: 20,
    },
  },
};

type RoomName = keyof typeof RoomTypes;

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

  // so we can find it in the list of entities
  type = "ROOM_TAG";

  constructor(props: {
    tileX    : number;
    tileY    : number;
    roomName : RoomName;
    state    : State;
  }) {
    super();

    const roomStats = RoomTypes[props.roomName];

    props.state.entities.push(this);

    this.occupants = roomStats.occupancy;
    this.capacity  = roomStats.capacity;

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

  hasCapacity(): boolean {
    return this.capacity > this.occupants;
  }

  update(state: State): void {
    if (this.wasClicked) {
      this.wasClicked = false;
      state.selection = {
        type: "room",
        room: this,
      };
    }

    if (state.selection.type === "room" && state.selection.room === this) {
      this.alpha = 0.8;
    } else {
      this.alpha = 1.0;
    }
  }
}
