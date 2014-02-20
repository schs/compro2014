class HUD {
    score: eg.Graphics.Text2d;
    scorePosition: eg.Vector2d;

    scene: eg.Rendering.Scene2d;
    inventorySprites: eg.Graphics.Sprite2d;
    backgroundImage: eg.Graphics.Sprite2d;

    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;

        this.scorePosition = new eg.Vector2d(50, 50);
        this.score = new eg.Graphics.Text2d(this.scene.Camera.TopLeft.X + this.scorePosition.X, this.scene.Camera.TopLeft.Y + this.scorePosition.Y, "Score: ");
        this.score.Scale(5);
        this.score.ZIndex = ZIndexing.HUD;
        this.scene.Add(this.score);
        
    }

    Update(gameTime: eg.GameTime, score: number) {
        this.score.Position = this.scene.Camera.TopLeft.Add(this.scorePosition);
        this.score.Text = "Score: " + score;
    }
}
