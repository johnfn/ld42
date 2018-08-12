interface IEntity {
  update: (state: State) => void;
}

class State {
  entities!: IEntity[];

  // like canvas
  stage   !: PIXI.Container;
  map     !: World;
  camera  !: Camera

  /**
   * This is the resource count of the number of buttons we have. You use these to build rooms, etc.
   */
  buttons !: number;
}

class Game {
  state !: State;
  app   !: PIXI.Application;
  
  constructor() {
    PIXI.loader.load(() => this.start());
  }

  stupidPixiSetupSetuff() {
    this.app = new PIXI.Application(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT, { 
      antialias: true,
      view: document.getElementById("main-canvas")! as HTMLCanvasElement,
    });
    document.body.appendChild(this.app.view);

    PIXI.settings.PRECISION_FRAGMENT = 'highp'; //this makes text looks better
    this.app.renderer.roundPixels = true;
  }

  stageMouseMove() {

  }

  start() {
    this.stupidPixiSetupSetuff();

    this.state = {
      entities : [],
      stage    : this.app.stage,
      buttons  : 2,
      map      : new World(this.app.stage),
      camera   : new Camera(),
    };

    this.state.entities.push(this.state.camera);
    this.state.entities.push(new MapScrollListener(this.app.stage));

    this.state.entities.push(new Room(this.app.stage, new Point({ x: 80, y: 80 })));

    this.state.entities.push(new GrantsDebug(this.app.stage));

    this.gameLoop();

    ReactDOM.render(
      <Toolbar state={ this.state } />,
      document.getElementById("toolbar")! as HTMLElement,
    );

    this.state.entities.push(Toolbar.Instance);
  }

  gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());

    //state.mousePosition = 
    var mousePosition = this.app.renderer.interaction.mouse.global;


    for (const entity of this.state.entities) {
      entity.update(this.state);
    }
  }
}

// TODO(someone): Move all assets into constants and load via loop

PIXI.loader.add("testmap", `./assets/testmap.json`);
PIXI.loader.add("test"   , `./assets/test.png`);
PIXI.loader.add("room"   , `./assets/room-1.png`); // 144 x 96

new Game();