// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {
  
  silhouette!: PIXI.Graphics; 

  constructor(stage: PIXI.Container) {
    super();

    stage.addChild(this);
    

    this.renderBuilderRoomSilhouette();
  }
  
  update(state: State): void {

  }

  renderBuilderRoomSilhouette(): void {
    const graphic = new PIXI.Graphics();

    const roomTexture: PIXI.Texture = PIXI.loader.resources.room.texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(roomTexture);
    const width = roomSprite.width;
    const height = roomSprite.height;

    graphic.beginFill(0x888888); // grey
    graphic.drawRect(50, 100, width, height);
    

    // TODO: Opacity handling
    graphic.alpha = 0.3;
    console.log(Constants.EVENTS)
    graphic.on(Constants.EVENTS.mouseover, e => graphic.alpha = 1.0);
    graphic.on(Constants.EVENTS.mouseoff, e => graphic.alpha =  0.3);

    //silhouette = graphic;

    // silhouette = null;
    this.addChild(graphic);
  }


}