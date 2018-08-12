// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {
  
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
  constructor(stage: PIXI.Container, topLeftX?: number, topLeftY?: number) {
    super();

    stage.addChild(this);
    this.topLeftX = topLeftX ? topLeftX : 0;
    this.topLeftY = topLeftY ? topLeftY : 0;
    
    const roomTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(roomTexture);
    // this.zoneWidth = 
    const { width, height } = roomSprite;
    this.bottomRightX = this.topLeftX + width;
    this.bottomRightY = this.topLeftY + height;

    this.isHovering = false;
    // Debug
    // let { topLeftX, topLeftY, width, height } = this;
    // console.log({ topLeftX, topLeftY, width, height })

    this.renderBuilderRoomSilhouette();
  }
  
  update(state: State): void {
    const mousePos = state.mousePosition;
    const isInX = mousePos.x >= this.topLeftX && mousePos.x <= this.bottomRightX;
    const isInY = mousePos.y >= this.topLeftY && mousePos.y <= this.bottomRightY;
    // console.log(isInX, isInY);
    if (isInX && isInY) {
      // console.log('hi')
      if (!this.isHovering) {
        this.isHovering = true;
        this.children[0].alpha = 1.0;
      }
    } else {
      if (this.isHovering) {
        this.isHovering = false;
        this.children[0].alpha = 0.3;
      }
    }
  }

  renderBuilderRoomSilhouette(): void {
    const graphic = new PIXI.Graphics();

    

    // const startX = this.topLeftX;  // Arbitrary
    // const startY = this.topLeftY; // Arbitrary
    const lineThickness = 6.5;

    graphic
      .lineStyle(lineThickness, this.hexColor, 1, 0) // alignment 0 = inner
      .moveTo(this.topLeftX, this.topLeftY)
      .lineTo(this.bottomRightX, this.topLeftY)
      .lineTo(this.bottomRightX, this.bottomRightY)
      .lineTo(    this.topLeftX, this.bottomRightY)
      .lineTo(    this.topLeftX, this.topLeftY)
      .closePath();
    
    // TODO: Opacity handling
    graphic.interactive = true;

    graphic.alpha = 0.3;
    // console.log(Constants.EVENTS)
    // graphic.on(Constants.EVENTS.mouseover, e => graphic.alpha = 1.0);
    // graphic.on(Constants.EVENTS.mouseout, e => graphic.alpha =  0.3);

    graphic.on('mouseover', (event) => {
      console.log(event);
    })
    graphic.on('mouseout', (event) => {
      console.log(event);
    })
    graphic.on('click', (event) => {
      console.log('rec click')
    });

    this.silhouette = graphic;

    // silhouette = null;
    this.addChild(graphic);
    console.log(this.children);
  }


}