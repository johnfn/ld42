// This is the object for building new structures, like floors and rooms.

class Builder extends PIXI.Graphics implements IEntity {
  


  constructor(stage: PIXI.Container) {
    super();

    stage.addChild(this);
    

    this.renderBuilderRoomSilhouette();
  }
  
  update(state: State): void {

  }

  renderBuilderRoomSilhouette(): void {
    const graphic = new PIXI.Graphics;

    const roomTexture: PIXI.Texture = PIXI.loader.resources.room.texture;
    const roomSprite: PIXI.Sprite = new PIXI.Sprite(roomTexture);
    const width = roomSprite.width;
    const height = roomSprite.height;

    graphic.beginFill(0x888888); // grey
    graphic.drawRect(50, 100, 50 + width, 100 + height);

    this.addChild(graphic);
    
  }


}