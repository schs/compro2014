class MeleeWeapon extends Weapon {   
    attackCollider: eg.Collision.Collidable;
     
    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        super(x, y, damage, knockback, "MeleeWeapon", name, scene, spriteImage, collisionManager, items);
    }

    ExecuteAttack() {
        if (!this.attacking){
            this.attacking = true;
            this.attackRotation = -1.8;
        }
    }

    EndAttack() {
            this.attackRotation = 0;
            this.attacking = false;
    }

    Equip() {
        super.Equip();
        if (this.attackCollider)
            this.collisionManager.Monitor(this.attackCollider);
        else {
            this.attackCollider = new eg.Collision.Collidable(new eg.Bounds.BoundingRectangle(this.sprite.Position, new eg.Size2d(64, 32)));
            this.collisionManager.Monitor(this.attackCollider);
        }
        this.attackCollider.OnCollision.Bind(this.AttackCollision.bind(this));
    }

    UnEquip() {
        if (this.attackCollider) {
            this.attackCollider.Dispose();
            this.attackCollider = null;
        }
        this.attacking = false;
        this.attackRotation = 0;
        super.UnEquip();
    }

    AttackCollision(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Enemy && this.attacking)
            (<Enemy>collider).TakeDamage(this.damage, this.knockback); 
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        if (this.attacking)
            this.attackRotation += .3;

        if (this.attackRotation >= 0) {
            this.EndAttack();
        }

        super.Update(gameTime, handLocation, playerRotation);

        if (this.attackCollider) {
            this.attackCollider.Bounds.Position = this.sprite.Position;
            this.attackCollider.Bounds.Rotation = this.sprite.Rotation;
        }

    }
}