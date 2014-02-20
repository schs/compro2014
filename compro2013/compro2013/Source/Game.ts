class Game extends eg.Game {
    static DEBUG: boolean = true;
    fps: eg.Graphics.Text2d;

    player: Player;
    mapHandler: MapHandler;

    constructor() {
        super();

        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        if (Game.DEBUG) {
            this.fps = new eg.Graphics.Text2d(this.Scene.Camera.TopLeft.X + 20, this.Scene.Camera.TopLeft.Y + 20, "FPS", eg.Graphics.Color.White);
            this.fps.ZIndex = 10;
            this.Scene.Add(this.fps);
        }
    }

    Update(gameTime: eg.GameTime) {
        if (Game.DEBUG && gameTime.Total.Seconds % 5 < 1) {
            this.fps.Position = new eg.Vector2d(this.Scene.Camera.TopLeft.X + 20, this.Scene.Camera.TopLeft.Y + 20);
            this.fps.Text = "FPS: " + Math.round(1000/gameTime.Elapsed.Milliseconds);
        }
    }


} 