class HUD extends eg.Game {
    playerHealth: number;
    playerLevel: number;
    text: eg.Graphics.Text2d;
    scene: eg.Rendering.Scene2d;
    constructor(scene: eg.Rendering.Scene2d) {
        super();
        this.scene = scene;
        this.playerHealth = 100;
        this.playerLevel = 0;
        this.text = new eg.Graphics.Text2d(this.scene.DrawArea.width / 2, 50, "Score");
        this.scene.Add(this.text);
        this.text.Scale(5);

    }
    addScorePlayer1() {
        this.playerHealth--;
        this.text.Text = "Health: " + this.playerHealth + "Level:  " + this.playerLevel;
    }

    addScorePlayer2() {
        this.playerLevel++;
        this.text.Text = "Health: " + this.playerHealth + "Level: " + this.playerLevel;
    }
}
