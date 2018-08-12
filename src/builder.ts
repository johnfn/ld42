// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {

  location: Rect;
  
  // wip - i'm removing these fields
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
  isHovering: boolean;

  silhouette!: PIXI.Graphics;

  readonly hexColor = 0xffe7d7;

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

    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    
    this.bottomRightX = this.topLeftX + width;
    this.bottomRightY = this.topLeftY + height;

    this.isHovering = false;
    // Debug
    // let { topLeftX, topLeftY, width, height } = this;
    // console.log({ topLeftX, topLeftY, width, height })

    this.silhouette = this.renderBuilderRoomSilhouette();
    this.interactive = true;
    this.hitArea = new PIXI.Rectangle(this.location.x, this.location.y, this.location.w, this.location.h);

    this.on('mouseover', (event: PIXI.interaction.InteractionEvent) => {
      console.log(event);
    })
    this.on('mouseout', (event: PIXI.interaction.InteractionEvent) => {
      console.log(event);
    })
    this.on('click', (event: PIXI.interaction.InteractionEvent) => {
      event;
      console.log('rec click')
    });

  }
  
  // check every tick whether we are in the box and whether we have just entered/exited
  update(state: State): void {
    const mousePos = state.mousePosition;
    if (this.location.contains(mousePos)) {
      if (!this.isHovering) {
        this.isHovering = true;
        this.onMouseover(state);
      }
    } else {
      if (this.isHovering) {
        this.isHovering = false;
        this.onMouseoff(state);
      }
    }
  }

  onMouseover(state: State): void {
    const [graphic] = this.children;
    graphic.alpha = 1.0;
  }

  onMouseoff(state: State): void {
    const [graphic] = this.children;
    graphic.alpha = 0.3;
  }

  renderBuilderRoomSilhouette(): PIXI.Graphics {
    const graphic = new PIXI.Graphics();
    const { x: topLeftX, y: topLeftY } = this.location.topLeft;
    const { x: bottomRightX, y: bottomRightY } = this.location.bottomRight;

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
    graphic.alpha = 0.3;
    
     /*
    graphic.interactive = true;
    graphic.hitArea = new PIXI.Rectangle(this.location.x, this.location.y, this.location.w, this.location.h);

    graphic.on('mouseover', (event: PIXI.interaction.InteractionEvent) => {
      console.log(event);
    })
    graph: PIXI.interaction.InteractionEventraction.InteractionEvent) => {
      console.log(event);
    }): PIXI.interaction.InteractionEvent
      event; *
    graphic.on('click', (event/
      console.log('rec click')
    }); */

    this.addChild(graphic);
    return graphic;
  }

}