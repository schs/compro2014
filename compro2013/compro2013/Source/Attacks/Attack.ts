class Attack extends eg.Collision.Collidable implements ICollidableTyped {
    collisionType: CollisionType;
    speed: number;
    timer: number;
    damage: number;
    knockback: number;
    attacking: boolean;
    shape: eg.Graphics.Rectangle;
    collisionManager: eg.Collision.CollisionManager;

    constructor(position: eg.Vector2d, size: eg.Size2d, damage: number, knockback: number, collisionManager: eg.Collision.CollisionManager) {
        this.knockback = knockback;
        this.damage = damage;
        this.collisionManager = collisionManager;
        this.shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height);
        super(new eg.Bounds.BoundingRectangle(position, size))
        this.collisionManager.Monitor(this)
        this.shape.ZIndex = 10;
    }   

    Execute () {
        this.attacking = true;

    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;
        if (collider.collisionType == CollisionType.Enemy && this.attacking) {
            (<Enemy>collider).TakeDamage(this.damage);

        }
    }


    Update (gameTime: eg.GameTime) {
        this.shape.Position = this.Bounds.Position
    }


}