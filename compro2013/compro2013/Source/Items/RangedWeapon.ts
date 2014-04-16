class RangedWeapon extends Weapon {
    projectiles: Projectile[];

    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.projectiles = [];

        super(x, y, damage, knockback, "RangedWeapon", name, scene, spriteImage, collisionManager);
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        for (var projectile in this.projectiles) {
            this.projectiles[projectile].Update(gameTime);
        }

        super.Update(gameTime, handLocation, playerRotation);
    }

}