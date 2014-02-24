class HUD {
    score: eg.Graphics.Text2d;
    scorePosition: eg.Vector2d;

    health: eg.Graphics.Text2d;
    healthPosition: eg.Vector2d;

    scene: eg.Rendering.Scene2d;
    inventorySprites: eg.Graphics.Sprite2d;
    backgroundImage: eg.Graphics.Sprite2d;

    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;

        this.scorePosition = new eg.Vector2d(50, 50);
        this.score = new eg.Graphics.Text2d(this.scene.Camera.TopLeft.X + this.scorePosition.X, this.scene.Camera.TopLeft.Y + this.scorePosition.Y, "Score: ");
        this.score.Scale(3);
        this.score.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.score);

        this.healthPosition = new eg.Vector2d(-50, -50);
        this.health = new eg.Graphics.Text2d(this.scene.Camera.BotLeft.X + this.scorePosition.X, this.scene.Camera.BotLeft.Y + this.scorePosition.Y, "Score: ");
        this.health.Scale(3);
        this.health.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.health);

        
    }

    Update(gameTime: eg.GameTime, score: number, health: number) {
        this.score.Position = this.scene.Camera.TopLeft.Add(this.scorePosition);
        this.score.Text = "Score: " + score;

        this.health.Position = this.scene.Camera.BotLeft.Add(this.healthPosition);
        this.health.Text = "Health: " + health;
    }
}
