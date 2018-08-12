class Room extends PIXI.Graphics {
  constructor(state: State) {
    super();

    this.beginFill(0x8B572A, 1);
    this.drawRect(50, 250, 120, 120);

    state.stage.addChild(this);
  }

  update(state: State): void {
  }
}

interface IEntity {
  update: (state: State) => void;
}

class State {
  entities!: IEntity[];

  // like canvas
  stage!: PIXI.Container;

  buttons!: number;
}

class Game {
  state!: State;
  
  constructor() {
    PIXI.loader.load(() => this.start());
  }

  start() {
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
      buttons: 10,
    };

    this.state.entities.push(new Room(this.state));

    this.gameLoop();

    ReactDOM.render(
      <Toolbar state={ this.state } />,
      document.getElementById("toolbar")! as HTMLElement,
    );
  }

  gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());

    for (const entity of this.state.entities) {
      entity.update(this.state);
    }

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