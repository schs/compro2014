class LoadingScreen implements eg.IUpdateable{
    loading: boolean;
    picture: eg.Graphics.Rectangle;
    scene: eg.Rendering.Scene2d;
    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;
        this.picture = new eg.Graphics.Rectangle(this.scene.Camera.Position.X, this.scene.Camera.Position.Y, this.scene.Camera.Size.Width, this.scene.Camera.Size.Height);
        this.picture.ZIndex = 10;



        this.scene.Add(this.picture);
    }


    Update(gameTime: eg.GameTime) {
        


    }










}