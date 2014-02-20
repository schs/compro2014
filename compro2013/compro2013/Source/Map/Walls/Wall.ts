class Wall extends eg.Collision.Collidable {
    shape: eg.Graphics.Shape;
    scene: eg.Rendering.Scene2d;
    collisionManager: eg.Collision.CollisionManager;

    constructor(position: eg.Vector2d, size: eg.Size2d, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.scene = scene;
        this.collisionManager = collisionManager;
        this.shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Height, size.Width, eg.Graphics.Color.FromRGBA(200, 0, 0, .4));
        this.shape.ZIndex = 6;

        super(this.shape.GetDrawBounds());
        if(Game.DEBUG)
            this.scene.Add(this.shape);
        this.collisionManager.Monitor(this, true);
        
    }

    Collided(data: eg.Collision.CollisionData) {
        
    }
} 