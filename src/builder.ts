// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {
  
  silhouette!: PIXI.Graphics;
  
  readonly hexColor = 0xffe7d7;

  constructor(stage: PIXI.Container) {
    super();

    stage.addChild(this);
    

    this.renderBuilderRoomSilhouette();
  }
  
  update(state: State): void {
    console.log(state.mousePosition);
  }

  renderBuilderRoomSilhouette(): void {
    const graphic = new PIXI.Graphics();

    const roomTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(roomTexture);
    const width = roomSprite.width;
    const height = roomSprite.height;

    const startX = 50;  // Arbitrary
    const startY = 100; // Arbitrary
    const lineThickness = 6.5;

    graphic
      .lineStyle(lineThickness, this.hexColor, 1, 0) // alignment 0 = inner
      .moveTo(startX, startY)
      .lineTo(width + startX, startY)
      .lineTo(width + startX, startY + height)
      .lineTo(        startX, startY + height)
      .lineTo(        startX, startY)
      .closePath();
    
    // TODO: Opacity handling
    graphic.interactive = true;

    graphic.alpha = 0.3;
    // console.log(Constants.EVENTS)
    // graphic.on(Constants.EVENTS.mouseover, e => graphic.alpha = 1.0);
    // graphic.on(Constants.EVENTS.mouseout, e => graphic.alpha =  0.3);
    graphic.on('mouseover', (event) => console.log('mo', event));

    graphic.on('mouseover', (event) => {
      console.log(event);
    })
    graphic.on('mouseout', (event) => {
      console.log(event);
    })

    this.silhouette = graphic;

    // silhouette = null;
    this.addChild(graphic);
    console.log(this.children);
  }


}