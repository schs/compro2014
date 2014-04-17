class MeleeWeapon extends Weapon {   
    attacking: boolean;
    attackRotation: number;
    attackCollider: eg.Collision.Collidable;
     
    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.attackRotation = 0;
        super(x, y, damage, knockback, "MeleeWeapon", name, scene, spriteImage, collisionManager);
    }

    ExecuteAttack() {
        this.attacking = true;
    }

    Equip() {
        super.Equip();
        this.attackCollider = new eg.Collision.Collidable(new  eg.Bounds.BoundingRectangle(this.sprite.Position, new eg.Size2d(32, 64)));
        this.collisionManager.Monitor(this.attackCollider);
        this.attackCollider.OnCollision.Bind(this.AttackCollision.bind(this));
    }

    AttackCollision(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Enemy && this.attacking)
            (<Enemy>collider).TakeDamage(this.damage); 
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        if (this.attacking)
            this.attackRotation += .3;
        this.sprite.Position = handLocation.Add(new eg.Vector2d(0, 20)).RotateAround(handLocation, playerRotation);
        if (!this.attacking)
            this.sprite.Rotation = playerRotation + 1.5 + this.attackRotation;
        else {
            this.sprite.Rotation = playerRotation + this.attackRotation;
        }
        if (this.attackCollider) {
            this.attackCollider.Bounds.Position = this.sprite.Position;
            this.attackCollider.Bounds.Rotation = this.sprite.Rotation;
        }

    }
}