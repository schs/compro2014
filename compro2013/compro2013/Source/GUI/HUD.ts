class HUD {
    score: eg.Graphics.Text2d;
    scorePosition: eg.Vector2d;

    fps: eg.Graphics.Text2d;
    fpsPosition: eg.Vector2d;

    health: eg.Graphics.Text2d;
    healthPosition: eg.Vector2d;

    gold: eg.Graphics.Text2d;
    goldPosition: eg.Vector2d;

    scene: eg.Rendering.Scene2d;
    inventorySprites: eg.Graphics.Sprite2d;
    backgroundImage: eg.Graphics.Sprite2d;

    hudLocation: eg.Vector2d;

    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;

        this.hudLocation = this.scene.Camera.TopLeft.Clone();

        this.scorePosition = new eg.Vector2d(50, 10);
        this.score = new eg.Graphics.Text2d(0, 0, "Score: ");
        this.score.Scale(3);
        this.score.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.score);
        
        //FPS Text only enabled when debug is on
        if (Game.DEBUG) {
            this.fpsPosition = new eg.Vector2d(50, 30);
            this.fps = new eg.Graphics.Text2d(0, 0, "FPS", eg.Graphics.Color.White);
            this.fps.ZIndex = 10;
            this.scene.Add(this.fps);
        }
        this.healthPosition = new eg.Vector2d(50, 50);
        this.health = new eg.Graphics.Text2d(0, 0, "Health: ");
        this.health.Scale(3);
        this.health.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.health);

        this.goldPosition = new eg.Vector2d(50, 70);
        this.gold = new eg.Graphics.Text2d(0, 0, "Gold: ");
        this.gold.Scale(3);
        this.gold.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.gold);
        
    }

    Update(gameTime: eg.GameTime, score: number, health: number, gold: number) {
        this.hudLocation = this.scene.Camera.TopLeft.Clone();

        this.score.Position = this.hudLocation.Add(this.scorePosition);
        this.score.Text = "Score: " + score;

        //FPS Text
        if (Game.DEBUG) {
            this.fps.Position = this.hudLocation.Add(this.fpsPosition);
            this.fps.Text = "FPS: " + Math.round(1000 / gameTime.Elapsed.Milliseconds);
        }

        this.health.Position = this.hudLocation.Add(this.healthPosition);
        this.health.Text = "Health: " + health;

        this.gold.Position = this.hudLocation.Add(this.goldPosition);
        this.gold.Text = "Gold: " + gold;
    }
}
