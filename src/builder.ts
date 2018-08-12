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

    // Add inner plus symbol
    const plusGfx = new PIXI.Graphics();
    const middleX = (this.topLeftX + this.bottomRightX) / 2;
    const middleY = (this.topLeftY + this.bottomRIghtY) / 2;
    
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
    
    // TODO: Opacity handling
    graphic.interactive = true;

    graphic.alpha = 0.3;

    // Don't work
    // graphic.on('mouseover', (event) => {
    //   console.log(event);
    // })
    // graphic.on('mouseout', (event) => {
    //   console.log(event);
    // })
    // graphic.on('click', (event) => {
    //   console.log('rec click')
    // });

    this.silhouette = graphic;

    // silhouette = null;
    this.addChild(graphic);
    console.log(this.children);
  }


}