interface IEntity {
  update: (state: State) => void;
}

class State {
  entities      !: IEntity[];

  // like canvas
  stage         !: PIXI.Container;
  world           !: World;
  camera        !: Camera;
  mousePosition !: Point;

  /**
   * This is the resource count of the number of buttons we have. You use these to build rooms, etc.
   */
  buttons       !: number;
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

    this.app.stage.on("mousemove", (e: PIXI.interaction.InteractionEvent) => {
      this.state.mousePosition = new Point({
        x: e.data.global.x,
        y: e.data.global.y,
      });
    });
  }

  start() {
    this.stupidPixiSetupSetuff();

    this.state = {
      entities     : [],
      stage        : this.app.stage,
      buttons      : 2,
      world        : new World(this.app.stage),
      camera       : new Camera(),
      mousePosition: new Point({ x: 0, y: 0 }),
    };

    this.app.stage.interactive = true;

    this.state.entities.push(this.state.camera);
    this.state.entities.push(new MapScrollListener(this.app.stage));

    this.state.entities.push(new HotelFloor(this.app.stage, new Point({ x: Constants.SCREEN_WIDTH / 2.0, y: 80 })));

    this.state.entities.push(new Builder(this.app.stage, 50, 100));

    this.state.entities.push(new GrantsDebug(this.app.stage));
    this.state.entities.push(new Cat(this.app.stage));

    this.gameLoop();

    ReactDOM.render(
      <Toolbar state={ this.state } />,
      document.getElementById("toolbar")! as HTMLElement,
    );

    this.state.entities.push(Toolbar.Instance);
  }

  removeEntity(x: IEntity) {

  }

  gameLoop(): void {
    requestAnimationFrame(() => this.gameLoop());

    for (const entity of this.state.entities) {
      entity.update(this.state);
    }
  }
}
  

// TODO(someone): Move all assets into constants and load via loop

PIXI.loader.add("testmap", `./assets/testmap.json`);
//PIXI.loader.add("test"   , `./assets/test.png`);
//PIXI.loader.add("room"   , `./assets/room-1.png`); // 144 x 96
//PIXI.loader.add("room"   , `./assets/umbrella-1.png`); // 144 x 96
//PIXI.loader.add("room"   , `./assets/water-1.png`); // 144 x 96

const ASSET_LIST: string = `
birds-1.png
boat-1.png
button-1.png
clouds-1.png
dock-1.png
ground-1.png
ground-2.png
mountains-1.png
pink-cat-1.png
room-1.png
sun-1.png
test.png
tree-1.png
umbrella-1.png
water-1.png
`;
ASSET_LIST.split('\n').map(asset_name => {
  if (asset_name.trim() === "") { return; }

  PIXI.loader.add(asset_name.replace(/.png/g, '')   , `./assets/${asset_name}`);
})
  

new Game();
