class Item extends eg.Collision.Collidable implements ICollidableTyped {
    type: String;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    collisionType: CollisionType;

    constructor(x: number, y: number, type: String, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource) {
        this.collisionType = CollisionType.Item;
        this.type = type;
        this.scene = scene;
        this.sprite = new eg.Graphics.Sprite2d(x, y, spriteImage) 
        this.sprite.ZIndex = ZIndexing.Item;
        
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
        this.Bounds.Position = this.sprite.Position;
    }


    Collided(data: eg.Collision.CollisionData) {
        if (this.lastCollision !== data.With) {

        }
    }
} 