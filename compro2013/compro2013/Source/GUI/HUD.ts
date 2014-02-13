class HUD extends eg.Game implements eg.IUpdateable {
    playerHealth: number;
    playerLevel: number;
    text: eg.Graphics.Text2d;
    scene: eg.Rendering.Scene2d;
    imageSource: eg.Graphics.ImageSource;
    imageSource2: eg.Graphics.ImageSource;
    backgroundImage: eg.Graphics.Sprite2d;
    backgroundImage2: eg.Graphics.Sprite2d;
    sword: eg.Graphics.Sprite2d;
    fist: eg.Graphics.Sprite2d;

    constructor(scene: eg.Rendering.Scene2d) {
        super();
        this.scene = scene;
        this.playerHealth = 100;
        this.playerLevel = 0;
        this.text = new eg.Graphics.Text2d(this.scene.DrawArea.width / 2, 50, "Score");
        this.scene.Add(this.text);
        this.text.Scale(5);
        this.imageSource = new eg.Graphics.ImageSource("/Images/HUD sword 1.png", 576, 576);
        this.backgroundImage = new eg.Graphics.Sprite2d(650, 375, this.imageSource, 200, 200);
        this.imageSource2 = new eg.Graphics.ImageSource("/Images/Fist.png", 576, 576);
        this.backgroundImage2 = new eg.Graphics.Sprite2d(650, 375, this.imageSource, 200, 200);

    }
    addPlayerHealth() {
        this.playerHealth--;
        this.text.Text = "Health: " + this.playerHealth + "Level:  " + this.playerLevel;
    }

    addPlayerLevel() {
        this.playerLevel++;
        this.text.Text = "Health: " + this.playerHealth + "Level: " + this.playerLevel;
    }
    turnOnLightRed() {
        this.backgroundImage.Visible = true;
    }

    update(gameTime: eg.GameTime) {
        if (this.sword.Visible == true) {
            if (this.backgroundImage.Visible == true) {
            }
            if (this.fist.Visible == true) {
                this.backgroundImage2.Visible = true;

            }
        }
    }
}
