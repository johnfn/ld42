class Condo {
  constructor(state: State) {

  }
}

interface IEntity {
  update: (state: State) => void;
}

class State {
  entities!: IEntity[];

  // like canvas
  stage!: PIXI.Container;
}

class Game {
  state!: State;
  
  constructor() {
    PIXI.loader.load(() => this.start());
  }

  start() {
    this.gameLoop();

    const app = new PIXI.Application(Constants.WIDTH, Constants.HEIGHT, { 
      antialias: true,
      view: document.getElementById("main-canvas")! as HTMLCanvasElement,
    });
    document.body.appendChild(app.view);

    PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
    app.renderer.roundPixels = true;

    this.state = {
      entities: [],
      stage: app.stage,
    };

    this.state.entities.push();
    
    const graphics = new PIXI.Graphics();

    graphics.beginFill(0xf8f839, 1);
    // graphics.beginFill(0x33ffff, 1);
    graphics.drawRect(50, 250, 120, 120);
    app.stage.addChild(graphics);

    const tiled = new TiledTilemap(PIXI.loader.resources["testmap"].data, app.renderer);
    app.stage.addChild(tiled.loadRegion(new Rect({ x: 0, y: 0, w: 16 * 32, h: 16 * 32 })));
    
  }

  gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());

    /*
    stage.children.sort((a, b) => {
      return ((a as any).z || 0) - ((b as any).z || 0);
    });
    */
  }
}

PIXI.loader.add("testmap", `./assets/testmap.json`);
PIXI.loader.add("test", `./assets/test.png`);

new Game();