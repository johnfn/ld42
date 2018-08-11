interface TiledTileLayerJSON {
  data: number[];

  height  : number;
  name    : string;
  opacity : number;
  startx  : number;
  starty  : number;
  visible : boolean;
  width   : number;
  x       : number;
  y       : number;

  type: "tilelayer";
}

interface TiledObjectJSON {
  gid?: number;

  properties?: any;
  propertytypes?: { [key: string]: "int" | "string" };
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: any;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

interface TiledObjectLayerJSON {
  draworder: "topdown";
  height: number;
  name: string;
  objects: TiledObjectJSON[];
  opacity: number;
  visible: boolean;
  width: number;
  x: number;
  y: number;

  type: "objectgroup";
}

interface TilesetJSON {
  columns: number;
  firstgid: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tileheight: number;
  tilewidth: number;
}

interface TiledJSON {
  height: number;
  width : number;
  nextobjectid: number;
  orientation: "orthogonal";
  renderorder: "right-down";
  tileheight: number;
  tilewidth: number;
  version: number;

  layers: (TiledTileLayerJSON | TiledObjectLayerJSON)[];
  tilesets: TilesetJSON[];
}

interface Tile {
  x: number;
  y: number;

  tile: SpritesheetTile;
  layername: string;
}

interface Tileset {
  gidStart: number;
  gidEnd: number;

  name: string;
  image: string;

  imagewidth: number;
  imageheight: number;
  tilewidth: number;
  tileheight: number;
}

interface TiledObject {
  tile: SpritesheetTile;

  properties?: { [key: string]: string; };

  height: number;
  width: number;

  x: number;
  y: number;
}

interface SpritesheetTile {
  name: string;
  spritesheetx: number;
  spritesheety: number;
  tilewidth: number;
  tileheight: number
}

class TiledTilemap {
  private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private data: TiledJSON;
  private tilesets: Tileset[];
  private tiles: (Tile | undefined)[][] = [];

  constructor(data: TiledJSON, renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer) {
    this.renderer = renderer;
    this.data = data;

    this.tilesets = this.loadTilesets();
    this.loadLayers();
  }

  private loadTilesets(): Tileset[] {
    const tilesets: Tileset[] = [];

    for (const { image, name, firstgid, imageheight, imagewidth, tileheight, tilewidth } of this.data.tilesets) {
      const tiles = (imageheight * imagewidth) / (tileheight * tilewidth);

      tilesets.push({
        name,
        image,
        imagewidth,
        imageheight,
        tilewidth,
        tileheight,

        gidStart: firstgid,
        gidEnd  : firstgid + tiles,
      });
    }

    return tilesets;
  }

  private gidToTileset(gid: number): SpritesheetTile {
    for (const { gidStart, gidEnd, name, imagewidth, tilewidth, tileheight } of this.tilesets) {
      if (gid >= gidStart && gid < gidEnd) {
        const normalizedGid = gid - gidStart;
        const tilesWide = imagewidth / tilewidth;

        const x = (normalizedGid % tilesWide);
        const y = Math.floor(normalizedGid / tilesWide);

        return {
          name,
          spritesheetx: x,
          spritesheety: y,
          tilewidth,
          tileheight,
        };
      }
    }

    throw new Error("gid out of range. very bad?!?");
  }

  private loadLayers(): void {
    for (const layer of this.data.layers) {
      if (layer.type === "objectgroup") {
        this.loadObjects(layer);
      } else if (layer.type === "tilelayer") {
        this.loadTiles(layer);
      }
    }
  }

  private loadObjects(_layer: TiledObjectLayerJSON): void {
    /*
    const objects: Entity<any, any>[] = [];
    for (const object of layer.objects) {
      const newObject = this.buildObject(object, this.game);
      if (!newObject) { continue; }
      newObject.set("x", object.x);
      newObject.set("y", object.y - 32);
      objects.push(newObject);
    }
    const result: ExternalLayerTypes["objects"] = {
      type   : "objects",
      objects,
    };
    (this.layers as any)[layer.name] = result;
    */
  }


  private loadTiles(layer: TiledTileLayerJSON): void {
    const tiles: (Tile | undefined)[][] = [];

    for (let i = 0; i < this.data.width; i++) {
      tiles[i] = [];

      for (let j = 0; j < this.data.height; j++) {
        tiles[i][j] = undefined;
      }
    }

    const { data, width, name: layername } = layer;

    for (let idx = 0; idx < data.length; idx++) {
      const value = data[idx];

      if (value === 0) { continue; } // empty
      if (value > 200000) { continue; } // tiled bug ?
      const x = (idx % width);
      const y = Math.floor(idx / width);

      tiles[x][y] = {
        x: x * this.data.tilewidth,
        y: y * this.data.tileheight,
        tile: this.gidToTileset(value),
        layername: layername,
      };
    }

    this.tiles = tiles;
  }

  public loadRegion(region: Rect): PIXI.Sprite {
    const renderer = PIXI.RenderTexture.create(region.w, region.h);
    const tileWidth  = this.data.tilewidth;
    const tileHeight = this.data.tileheight;

    for (let i = region.x / tileWidth; i < region.right / tileWidth; i++) {
      for (let j = region.y / tileHeight; j < region.bottom / tileHeight; j++) {
        const tile = this.tiles[i][j];

        if (!tile) { continue; }

        const {
          x,
          y,
          tile: {
            name: spritesheet,
            spritesheetx,
            spritesheety,
          },
        } = tile;

        const spriteTex = TextureCache.GetCachedSpritesheetTexture(
          spritesheet,
          spritesheetx,
          spritesheety,
        );

        // We have to offset here because we'd be drawing outside of the
        // bounds of the RenderTexture otherwise.
        spriteTex.x = x - region.x;
        spriteTex.y = y - region.y;

        this.renderer.render(spriteTex, renderer, false);
      }
    }

    return new PIXI.Sprite(renderer);
  }

  public getTileAt(x: number, y: number): Tile | undefined {
    const tileWidth  = this.data.tilewidth;
    const tileHeight = this.data.tileheight;

    if (x < 0 || 
        y < 0 || 
        Math.floor(x / tileWidth ) >= this.tiles.length ||
        Math.floor(y / tileHeight) >= this.tiles[0].length
      ) {
      return undefined;
    }

    return this.tiles[Math.floor(x / tileWidth)][Math.floor(y / tileHeight)];
  }
}
