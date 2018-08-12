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

  }

  renderBuilderRoomSilhouette(): void {
    const graphic = new PIXI.Graphics();

    const roomTexture: PIXI.Texture = PIXI.loader.resources['room-1'].texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(roomTexture);
    const width = roomSprite.width;
    const height = roomSprite.height;

    const startX = 50;  // Arbitrary
    const startY = 100; // Arbitrary

    graphic
      // .beginFill(color)
      .lineStyle(10, this.hexColor, 1, 0) // alignment 0 = inner
      .moveTo(startX, startY)
      .lineTo(width, 0)
      .lineTo(0, height)
      .lineTo(-1 * width, 0)
      .lineTo(0, -1 * height)
      .closePath()
    // graphic.drawRect(50, 100, width, height);
    
    // TODO: Opacity handling
    graphic.interactive = true;

    graphic.alpha = 0.3;
    console.log(Constants.EVENTS)
    graphic.on(Constants.EVENTS.mouseover, e => graphic.alpha = 1.0);
    graphic.on(Constants.EVENTS.mouseout, e => graphic.alpha =  0.3);

    //silhouette = graphic;

    // silhouette = null;
    this.addChild(graphic);
  }


}