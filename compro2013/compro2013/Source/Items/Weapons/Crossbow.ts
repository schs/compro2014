class Crossbow extends RangedWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        
        super(x, y, 35, 15, "Crossbow", scene, new eg.Graphics.ImageSource("Resources/Images/Items/Weapons/Crossbow.png", 64, 64), collisionManager, items);
    }

    generatePrice(setPrice?: number) {
        if (setPrice)
            super.generatePrice(setPrice);
        else
            super.generatePrice(1000);
    }

    ExecuteAttack(projectiles?: Projectile[]) {
        if (this.timer >= 1) {
            projectiles.push(new Projectile(this.sprite.Position.X, this.sprite.Position.Y, this.damage, 50, this.sprite.Rotation, this.knockback, this.scene, new eg.Graphics.ImageSource("Resources/Images/Items/Weapons/Arrow.png", 64, 64), this.collisionManager, projectiles));
       this.timer = 0}
       }

}