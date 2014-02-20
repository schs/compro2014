class Game extends eg.Game {
    static DEBUG: boolean = true;
    fps: eg.Graphics.Text2d;

    player: Player;
    mapHandler: MapHandler;

    constructor() {
        super();
        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        this.player = new Player(100, 100, ["Up"], ["Down"], ["Left"], ["Right"], this.Input.Keyboard, this.Scene);

        if (Game.DEBUG) {
            this.fps = new eg.Graphics.Text2d(this.Scene.Camera.TopLeft.X + 20, this.Scene.Camera.TopLeft.Y + 20, "FPS", eg.Graphics.Color.White);
            this.fps.ZIndex = 10;
            this.Scene.Add(this.fps);
        }
    }

    Update(gameTime: eg.GameTime) {
        this.player.Update(gameTime);

        if (Game.DEBUG) {
            this.fps.Position = new eg.Vector2d(this.Scene.Camera.TopLeft.X + 20, this.Scene.Camera.TopLeft.Y + 20);
            this.fps.Text = "FPS: " + Math.round(1000 / gameTime.Elapsed.Milliseconds);
        }
    }

} 