class RangedWeapon extends Weapon {
    timer: number;

    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        this.timer = 0;

        super(x, y, damage, knockback, "RangedWeapon", name, scene, spriteImage, collisionManager, items);
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        this.timer += gameTime.Elapsed.Seconds;

        super.Update(gameTime, handLocation, playerRotation);
    }

}