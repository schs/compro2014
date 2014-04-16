class MeleeWeapon extends Weapon {    
    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, damage, knockback, "MeleeWeapon", name, scene, spriteImage, collisionManager);
    }

    Equip() {
        this.attack = new Attack(this.sprite.Position, new eg.Size2d(32, 64), this.damage, this.knockback, this.collisionManager);
        this.scene.Add(this.attack.shape);
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        super.Update(gameTime, handLocation, playerRotation);
        if(this.attack)
            this.attack.Update(gameTime, this.sprite.Position, this.sprite.Rotation, this.sprite);
    }
}