class RangedWeapon extends Weapon {


    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, items: Item[]) {


        super(x, y, damage, knockback, "RangedWeapon", name, scene, spriteImage, collisionManager, items);
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {


        super.Update(gameTime, handLocation, playerRotation);
    }

}