class Attack extends eg.Collision.Collidable implements ICollidableTyped {
    sprite: eg.Graphics.Sprite2d;
    collisionType: CollisionType;
    speed: number;
    timer: number;
    damage: number;
    knockback: number;
    attacking: boolean;

    constructor(position: eg.Vector2d, size: eg.Size2d, damage: number, knockback: number) {
        this.knockback = knockback;
        this.damage = damage;

        super(new eg.Bounds.BoundingRectangle(position, size))
        

    }   

    Excute () {
        this.attacking = true;


    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;



    }


    Update (gameTime: eg.GameTime, position: eg.Vector2d) {
        this.Bounds.Position = position.Clone();

    }


}