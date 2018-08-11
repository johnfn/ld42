class TextureCache {
  static Cache: { [key: string]: PIXI.Sprite } = {};

  public static GetCachedSpritesheetTexture(textureName: string, x: number, y: number): PIXI.Sprite {
    const key = `${ textureName }-${ x }-${ y }`;

    const tilewidth  = 32;
    const tileheight = 32;

    if (!TextureCache.Cache[key]) {
      const texture = PIXI.loader.resources[textureName].texture.clone();
      const rect = new PIXI.Rectangle(x * tilewidth, y * tileheight, tilewidth, tileheight);

      texture.frame = rect;

      this.Cache[key] = new PIXI.Sprite(texture);
    }

    return this.Cache[key];
  }
}