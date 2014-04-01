class LoadingScreen implements eg.IUpdateable{
    loading: boolean;
    picture: eg.Graphics.Rectangle;
    scene: eg.Rendering.Scene2d;
    text: eg.Graphics.Text2d;
    annoyingMessage: eg.Graphics.Text2d;
    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;
        this.picture = new eg.Graphics.Rectangle(this.scene.Camera.Position.X, this.scene.Camera.Position.Y, this.scene.Camera.Size.Width, this.scene.Camera.Size.Height);
        this.picture.ZIndex = 10;
        this.text = new eg.Graphics.Text2d(this.scene.Camera.Position.X, this.scene.Camera.Position.Y, "Loading", eg.Graphics.Color.Aqua);
        this.text.ZIndex = 11;
        this.text.Scale(3);
        this.annoyingMessage = new eg.Graphics.Text2d(this.scene.Camera.Position.X, this.scene.Camera.Position.Y-100, "Loading", eg.Graphics.Color.Aqua);

        this.scene.Add(this.picture);
        this.scene.Add(this.text);

    }


    Update(gameTime: eg.GameTime) {
        this.text.Position.X = this.scene.Camera.Position.X;
        this.text.Position.Y = this.scene.Camera.Position.Y;
        this.picture.Position.X = this.scene.Camera.Position.X;
        this.picture.Position.Y = this.scene.Camera.Position.Y;
        this.picture.Size.Width = this.scene.Camera.Size.Width;
        this.picture.Size.Height = this.scene.Camera.Size.Height;
    }

    tick(percent: number) {
        this.text.Text = "Loading... " +(Math.floor(percent*100+1)).toString();
    }

    clearScreen() {

        this.text.Visible = false;
        this.picture.Visible = false;
    }









}