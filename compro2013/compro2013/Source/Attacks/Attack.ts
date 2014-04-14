class Attack extends eg.Collision.Collidable implements ICollidableTyped {
    collisionType: CollisionType;
    speed: number;
    timer: number;
    damage: number;
    knockback: number;
    attacking: boolean;
    shape: eg.Graphics.Rectangle;
    collisionManager: eg.Collision.CollisionManager;
    attackRotation: number;
    attackPosition: eg.Vector2d;

    constructor(position: eg.Vector2d, size: eg.Size2d, damage: number, knockback: number, collisionManager: eg.Collision.CollisionManager) {
        this.knockback = knockback;
        this.damage = damage;
        this.collisionManager = collisionManager;
        this.shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height);
        super(new eg.Bounds.BoundingRectangle(position, size))
        this.collisionManager.Monitor(this)
        this.shape.ZIndex = 10;
        this.attackRotation = 0;
        this.attackPosition = new eg.Vector2d(0,0);
    }   

    Execute (weapon: Item) {
        this.attacking = true;
        this.attackRotation = 1;
    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;
        if (collider.collisionType == CollisionType.Enemy && this.attacking) {
            (<Enemy>collider).TakeDamage(this.damage);

        }
    }


    Update(gameTime: eg.GameTime, position: eg.Vector2d, absolutePosition: eg.Vector2d, rotation: number) {

        if (this.attacking) {

            this.attackRotation -= .1;
           
        }
        else {
            this.attackRotation = 0;
            
        }

        this.Bounds.Position = absolutePosition.RotateAround(position, rotation + this.attackRotation);
         //this.attackPosition = new eg.Vector2d(absolutePosition.X, absolutePosition.Y -(<eg.Bounds.BoundingRectangle>this.Bounds).Size.HalfHeight);
         //   this.Bounds.Position = absolutePosition.RotateAround(this.attackPosition, this.Bounds.Rotation);
        this.Bounds.Rotation = rotation + 1.5 + this.attackRotation;
        this.shape.Position = this.Bounds.Position;
        this.shape.Rotation = this.Bounds.Rotation;
        
    }


}