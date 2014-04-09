class Attack extends eg.Collision.Collidable implements ICollidableTyped {
    collisionType: CollisionType;
    speed: number;
    timer: number;
    damage: number;
    knockback: number;
    attacking: boolean;
    collisionManager: eg.Collision.CollisionManager;

    constructor(position: eg.Vector2d, size: eg.Size2d, damage: number, knockback: number, collisionManager: eg.Collision.CollisionManager) {
        this.knockback = knockback;
        this.damage = damage;
        this.collisionManager = collisionManager;
        super(new eg.Bounds.BoundingRectangle(position, size))
        this.collisionManager.Monitor(this)

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

    }


}