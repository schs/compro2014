class dayNight {
    imageSource: eg.Graphics.ImageSource;
    backgroundImage: eg.Graphics.Sprite2d;
    timer: number;
    timerLength: number;

    constructor(scene: eg.Rendering.Scene2d) {
        this.imageSource = new eg.Graphics.ImageSource("/Images/Black.png", 1290, 1290);
        this.backgroundImage = new eg.Graphics.Sprite2d(650, 375, this.imageSource, 1290, 1290);
    }
    Update(gameTime: eg.GameTime) {
    }
}