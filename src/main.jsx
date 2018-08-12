"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Room = /** @class */ (function (_super) {
    __extends(Room, _super);
    function Room(state) {
        var _this = _super.call(this) || this;
        _this.beginFill(0x8B572A, 1);
        _this.drawRect(50, 250, 120, 120);
        state.stage.addChild(_this);
        return _this;
    }
    Room.prototype.update = function (state) {
    };
    return Room;
}(PIXI.Graphics));
var State = /** @class */ (function () {
    function State() {
    }
    return State;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        PIXI.loader.load(function () { return _this.start(); });
    }
    Game.prototype.start = function () {
        var app = new PIXI.Application(Constants.WIDTH, Constants.HEIGHT, {
            antialias: true,
            view: document.getElementById("main-canvas"),
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
        ReactDOM.render(<Toolbar />, document.getElementById("toolbar"));
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        for (var _i = 0, _a = this.state.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.update(this.state);
        }
        /*
        stage.children.sort((a, b) => {
          return ((a as any).z || 0) - ((b as any).z || 0);
        });
        */
    };
    return Game;
}());
PIXI.loader.add("testmap", "./assets/testmap.json");
PIXI.loader.add("test", "./assets/test.png");
new Game();
