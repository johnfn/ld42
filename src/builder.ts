// This is the object for building new structures, like floors and rooms.

class RoomBuilder extends PIXI.Graphics implements IEntity {

  //absolute coordinates, units in pix
  location: Rect;
  pendingInteraction: 'mouseover' | 'mouseout' | 'click' | null;

  static readonly hexColor = 0xffe7d7;

  /**
   * Construction
   */
  constructor(stage: PIXI.Container, topLeftX: number, topLeftY: number) {
    super();

    stage.addChild(this);
    const { width, height } = PIXI.loader.resources['room-1'].texture;

    this.location = new Rect({
      x: topLeftX,
      y: topLeftY,
      w: width,
      h: height
    })
    this.pendingInteraction = null;

    RoomBuilder.renderRoomBuilderRoomSilhouette(this, this.location);
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(this.location.x, this.location.y, this.location.w, this.location.h);

    this.on('mouseover', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'mouseover';
    })
    this.on('mouseout', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'mouseout';
    })
    this.on('click', (event: PIXI.interaction.InteractionEvent) => {
      this.pendingInteraction = 'click';
    });

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
    t.x = this.location.x;
    t.y = this.location.y;
    this.addChild(t);
  }

  _successfullyBuildRoom(gameState: State): void {
      gameState.world.addRoom(this.location.x / Constants.MAP_TILE_SIZE, this.location.y / Constants.MAP_TILE_SIZE, gameState);
      // remove ourselves from updateables list and derender
      gameState.removeEntity(this);
      gameState.stage.removeChild(this);
      // create the next. constructor adds itself to stage for rendering
      let nextLocation: [number, number];
      if (this.location.x + this.location.w * 2 >= Constants.WORLD_WIDTH) {
        nextLocation =[this.location.x - 2 * this.location.w, this.location.y - this.location.h];
      } else {
        nextLocation = [this.location.x + this.location.w, this.location.y];
      }
      gameState.entities.push(new RoomBuilder(gameState.stage, nextLocation[0], nextLocation[1]));
  }

  // TODO(bowei): make this its own private class
  public static renderRoomBuilderRoomSilhouette(context: PIXI.Container, location: Rect): PIXI.Graphics {
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