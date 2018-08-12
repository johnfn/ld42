interface IEntity {
  update: (state: State) => void;
}

class State {
  entities!: IEntity[];

  // like canvas
  stage!: PIXI.Container;

  buttons!: number;

  map!: Map;
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
    };

    this.state.entities.push(new Room(app.stage));

    this.gameLoop();

    ReactDOM.render(
      <Toolbar state={ this.state } />,
      document.getElementById("toolbar")! as HTMLElement,
    );

    this.state.entities.push(Toolbar.Instance);
  }

  gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());

    for (const entity of this.state.entities) {
      entity.update(this.state);
    }

  }
}

PIXI.loader.add("testmap", `./assets/testmap.json`);
PIXI.loader.add("test", `./assets/test.png`);

new Game();