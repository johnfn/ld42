const RoomTypes = {
  condo: {
    name     : "Condo 1",
    capacity : 5,
    occupancy: 0,
    rent     : 5,

    cost: {
      buttons: 10,
    },
  },

  catLabratory: {
    name: "Cat Laboratailory",
    capacity : 0,
    occupancy: 0,
    rent     : 0,

    cost: {
      buttons: 200,
    },
  },

  yarnEmporium: {
    name: "Yarn Empurrrrrrium",
    capacity : 3,
    occupancy: 0,
    rent     : 0,

    cost: {
      buttons: 20,
    },
  },

  emptyRoom: {
    name: "Empty space",
    capacity : 0,
    occupancy: 0,
    rent     : 0,

    cost: {
      buttons: 1,
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
  public static WIDTH_IN_TILES  = Constants.ROOM_WIDTH_IN_TILES;
  public static HEIGHT_IN_TILES = Constants.ROOM_HEIGHT_IN_TILES;

  // we do this so that we only update during the tick
  wasClicked: boolean;

  occupants: number;
  capacity : number;
  rent     : number;
  roomName : RoomName;

  capacityDisplay: PIXI.Text | undefined;

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

    this.roomName = props.roomName;
    this.occupants = roomStats.occupancy;
    this.capacity  = roomStats.capacity;
    this.rent      = roomStats.rent;

    this.x = props.tileX * Constants.MAP_TILE_SIZE;
    this.y = props.tileY * Constants.MAP_TILE_SIZE;

    this.wasClicked = false;

    const roomSprite = this.renderRoom();

    roomSprite.interactive = true;
    roomSprite.on("click", (e: PIXI.interaction.InteractionEvent) => {
      this.wasClicked = true;
    });

    if (this.capacity > 0) {
      this.capacityDisplay = new PIXI.Text("", {
        fontFamily: 'FreePixel', 
        fontSize  : 24, 
        fill      : 0x000000, 
        align     : 'left',
      });

      this.addChild(this.capacityDisplay);
    }
  }

  renderRoom(): PIXI.Sprite {
    if (this.roomName === "condo") {
      // why are we wrapping roomSprite? idk but thats how it is
      const spriteTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
      const roomSprite: PIXI.Sprite = new PIXI.Sprite(spriteTexture);
      const gfx = new PIXI.Graphics();
      gfx.beginFill(Constants.COLORS.CONDO);
      gfx.drawRect(0, 0, Room.WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, Room.HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE);

      this.addChild(gfx);
      this.addChild(roomSprite); // at relative x, y = 0
      roomSprite.x += 8;
      roomSprite.y += 8;

      return roomSprite;
    } else if (this.roomName === "yarnEmporium") {
      const spri = new PIXI.Sprite();
      const gfx = new PIXI.Graphics();

      gfx.beginFill(0x0000ff);
      gfx.drawRect(0, 0, Room.WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, Room.HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE);

      spri.addChild(gfx);
      this.addChild(spri);

      return spri;
    } else if (this.roomName === "catLabratory") {
      const spri = new PIXI.Sprite();
      const gfx = new PIXI.Graphics();

      gfx.beginFill(0xff0000);
      gfx.drawRect(0, 0, Room.WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, Room.HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE);

      spri.addChild(gfx);
      this.addChild(spri);

      return spri;
    } else if (this.roomName === "emptyRoom") {
      const spri = new PIXI.Sprite();
      const gfx = new PIXI.Graphics();

      gfx.beginFill(0x303030);
      gfx.drawRect(0, 0, Room.WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, Room.HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE);

      spri.addChild(gfx);
      this.addChild(spri);

      return spri;
    } else {
      const x: never = this.roomName;

      throw new Error("unimplemented!!!!!!!!!!");
    }
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

    if (this.capacityDisplay) {
      this.capacityDisplay.text = `${ this.occupants }/${ this.capacity }`;
    }
  }
}
