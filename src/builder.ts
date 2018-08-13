// This is the object for building new structures, like floors and rooms.

function isBuilder(x: any): x is Builder {
  return x.type === "BUILDER_TAG";
}

class Builder extends PIXI.Graphics implements IEntity {

  //absolute coordinates, units in pix
  location: Rect;
  floorLevel: number;
  pendingInteraction: 'mouseover' | 'mouseout' | 'click' | null;

  // so we can find it in the list of entiteis
  type = "BUILDER_TAG";

  static readonly hexColor = 0xffe7d7;

  public static INITIAL_BUILDER_POSITION = new Point({
    x: Constants.MAP_TILE_SIZE * Constants.INITIAL_BUILDER_LOCATIONX_IN_TILES,
    y: Constants.MAP_TILE_SIZE * (Constants.SKY_HEIGHT_IN_TILES - Room.HEIGHT_IN_TILES)
  });

  /**
   * Construction
   */
  constructor(stage: PIXI.Container, _topLeftX?: number, _topLeftY?: number, floorLevel?: number) {

    super();

    const topLeftX = _topLeftX || Builder.INITIAL_BUILDER_POSITION.x;
    const topLeftY = _topLeftY || Builder.INITIAL_BUILDER_POSITION.y;

    this.floorLevel = floorLevel || 1;

    stage.addChild(this);
    //const { width, height } = PIXI.loader.resources['room-1'].texture;
    const { width, height } = { width: Room.WIDTH_IN_TILES * Constants.MAP_TILE_SIZE, height: Room.HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE };

    this.location = new Rect({
      x: topLeftX,
      y: topLeftY,
      w: width,
      h: height
    })
    this.pendingInteraction = null;

    Builder.renderBuilderRoomSilhouette(this, this.worldRect());
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(this.worldRect().x, this.worldRect().y, this.worldRect().w, this.worldRect().h);

    this.on('mouseover', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'mouseover';
    })
    this.on('mouseout', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'mouseout';
    })
    this.on('click', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'click';
    });
    this.alpha = 0.3;

  }

  worldRect(): Rect {
    return this.location;
  }
  
  // check every tick whether we are in the box and whether we have just entered/exited
  update(gameState: State): void {
    if (this.pendingInteraction === 'mouseover') {
      this.alpha = 1.0;
    } else if (this.pendingInteraction === 'mouseout') {
      this.alpha = 0.3;
    } else if (this.pendingInteraction === 'click') {
      if (gameState.buttons >= 10) {
        this._successfullyBuildRoom(gameState);
        gameState.buttons -= 10;
      } else {
        //this.say(gameState, "I furrr-ailed to complete that action!");
        //this.say(gameState, "You have insuffurrrr-icient buttons, meow!");
        this.say(gameState, "Nya-ot enough buttons!");
      }
    }

    this.pendingInteraction = null;
  }

  say(gameState: State, text: string) {
    const t = new FloatUpText(gameState, text);
    // why doesnt float up text handle its position properly 
    t.x = this.worldRect().x;
    t.y = this.worldRect().y;
    this.addChild(t);
  }

  _successfullyBuildRoom(gameState: State): void {
      gameState.world.addRoom(
        this.worldRect().x / Constants.MAP_TILE_SIZE, 
        this.worldRect().y / Constants.MAP_TILE_SIZE, 
        gameState,
        gameState.selectedBuilding,
      );

      // remove ourselves from updateables list and derender
      gameState.removeEntity(this);
      gameState.stage.removeChild(this);
      // create the next. constructor adds itself to stage for rendering
      if (this.worldRect().x + this.worldRect().w * 2 < Constants.WORLD_WIDTH) {
        let nextLocation: [number, number];
        nextLocation = [this.worldRect().x + this.worldRect().w, this.worldRect().y];

        let alreadyCreatedBuilder: boolean = (gameState.getBuilders().map(anotherBuilder => ( 
            anotherBuilder.worldRect().x === nextLocation[0] && anotherBuilder.worldRect().y === nextLocation[1]
          )).reduce((pv, cv) => pv || cv, false) || gameState.getRooms().map(anotherBuilder => ( 
            anotherBuilder.worldRect().x === nextLocation[0] && anotherBuilder.worldRect().y === nextLocation[1]
          )).reduce((pv, cv) => pv || cv, false) );
        let existRoomUnderneath = gameState.getRooms().map(anotherBuilder => ( 
            anotherBuilder.worldRect().x === nextLocation[0] && (anotherBuilder.worldRect().y - anotherBuilder.worldRect().h) === nextLocation[1]
          )).reduce((pv, cv) => pv || cv, false)
        if (!alreadyCreatedBuilder && (existRoomUnderneath || this.floorLevel === 1)) {
          //console.log('new builder at ', nextLocation);
          gameState.entities.push(new Builder(gameState.stage, nextLocation[0], nextLocation[1], this.floorLevel));
        }
      }
      if (this.worldRect().y + this.worldRect().h * 2 > 0 || true) { // no upward bounds!
        let nextLocation: [number, number];
        nextLocation = [this.worldRect().x, this.worldRect().y - this.worldRect().h];
 // wip refactor
        let alreadyCreatedBuilder: boolean = (gameState.getBuilders().map(anotherBuilder => ( 
            anotherBuilder.worldRect().x === nextLocation[0] && anotherBuilder.worldRect().y === nextLocation[1]
          )).reduce((pv, cv) => pv || cv, false) || gameState.getRooms().map(anotherBuilder => ( 
            anotherBuilder.worldRect().x === nextLocation[0] && anotherBuilder.worldRect().y === nextLocation[1]
          )).reduce((pv, cv) => pv || cv, false) );

        if (!alreadyCreatedBuilder) {
          //console.log('new builder at ', nextLocation);
          gameState.entities.push(new Builder(gameState.stage, nextLocation[0], nextLocation[1], this.floorLevel + 1));
        }
      }
  }

  // TODO(bowei): make this its own private class
  public static renderBuilderRoomSilhouette(context: PIXI.Container, location: Rect): PIXI.Graphics {
    const graphic = new PIXI.Graphics();
    const { x: topLeftX, y: topLeftY } = location.topLeft;
    const { x: bottomRightX, y: bottomRightY } = location.bottomRight;

    const lineThickness = 6.5;
    graphic
      .lineStyle(lineThickness , this.hexColor, 1, 0) // alignment 0 = inner
      .moveTo(topLeftX    , topLeftY)
      .lineTo(bottomRightX, topLeftY)
      .lineTo(bottomRightX, bottomRightY)
      .lineTo(topLeftX    , bottomRightY)
      .lineTo(topLeftX    , topLeftY)
      .closePath();
    // Add inner plus symbol
    const plusGfx = new PIXI.Graphics();
    const middleX = (topLeftX + bottomRightX) / 2;
    const middleY = (topLeftY + bottomRightY) / 2;
    plusGfx
      .lineStyle(lineThickness, this.hexColor, 1, 0.5)
      .moveTo(middleX, middleY)
      .lineTo(middleX - 10, middleY)
      .lineTo(middleX + 10, middleY)
      .lineTo(middleX, middleY)
      .lineTo(middleX, middleY - 10)
      .lineTo(middleX, middleY + 10)
      .lineTo(middleX, middleY)
      .closePath();
    graphic.addChild(plusGfx);

    context.addChild(graphic);
    return graphic;
  }
}