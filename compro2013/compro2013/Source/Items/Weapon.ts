class Weapon extends Item {
    name: string;
    damage: number;
    knockback: number;
    attackBounds: eg.Bounds.BoundingRectangle;

    constructor(x: number, y: number, damage: number, knockback: number, type: string, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.name = name;
        this.damage = damage;
        this.knockback = knockback;

        super(x, y, type, scene, spriteImage, collisionManager);
    }

    Equip() {
        //abstract method
    }

    ExecuteAttack() {
        //abstract method
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        this.sprite.Position = handLocation.Add(new eg.Vector2d(0, 20)).RotateAround(handLocation, playerRotation);
        this.sprite.Rotation = playerRotation + 1.5;
    }
}