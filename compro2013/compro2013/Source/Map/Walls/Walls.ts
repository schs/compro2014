class Wall extends eg.Collision.Collidable {
    shape: eg.Graphics.Shape;
    scene: eg.Rendering.Scene2d;
    collisionManager: eg.Collision.CollisionManager;




    constructor(x: number, y: number, width: number, height: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.scene = scene;
        this.shape = new eg.Graphics.Rectangle(x, y, width, height);
        this.collisionManager = collisionManager;


        super(this.shape.GetDrawBounds());
        this.scene.Add(this.shape);
        this.collisionManager.Monitor(this);
    }








}