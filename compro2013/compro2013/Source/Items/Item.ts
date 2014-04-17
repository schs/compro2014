class Item extends eg.Collision.Collidable implements ICollidableTyped {
    type: String;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    collisionType: CollisionType;
    collisionManager: eg.Collision.CollisionManager;

    constructor(x: number, y: number, type: String, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.collisionType = CollisionType.Item;
        this.type = type;
        this.scene = scene;
        this.sprite = new eg.Graphics.Sprite2d(x, y, spriteImage) 
        this.sprite.ZIndex = ZIndexing.Item;
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
        this.Bounds.Position = this.sprite.Position;
        this.collisionManager = collisionManager;
        this.collisionManager.Monitor(this, true);
    }

    Equip() {
        this.collisionManager.Unmonitor(this)
    }

    Collided(data: eg.Collision.CollisionData) {

    }
} 