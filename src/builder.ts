// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {

  location: Rect;
  pendingInteraction: string | null;

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

    Builder.renderBuilderRoomSilhouette(this, this.location);
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
      console.log("BUILDER MOUSEOVER")
      this.alpha = 1.0;
    } else if (this.pendingInteraction === 'mouseout') {
      this.alpha = 0.3;
    } else if (this.pendingInteraction === 'click') {
      console.log("BUILDER CLICK")
      gameState.world.addRoom(this.location.x / Constants.MAP_TILE_SIZE, this.location.y / Constants.MAP_TILE_SIZE, gameState);
      gameState.stage.removeChild(this);
      gameState.entities.push(new Builder(gameState.stage, this.location.x + this.location.w, this.location.y));
      gameState.buttons -= 10;
    }
    this.pendingInteraction = null;
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