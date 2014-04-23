class Crossbow extends RangedWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        
        super(x, y, 10, 1, "Crossbow", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Crossbow.png", 64, 64), collisionManager);
    }

    ExecuteAttack() {
        this.projectiles.push(new Projectile(this.sprite.Position.X, this.sprite.Position.Y, this.damage, 50, this.sprite.Rotation, this.knockback, this.scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Arrow.png", 64, 64), this.collisionManager, this.projectiles));
    }

}