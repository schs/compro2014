class Weapon extends Item {
    name: string;
    damage: number;
    knockback: number;
    attackRotation: number;
    attacking: boolean;

    constructor(x: number, y: number, damage: number, knockback: number, type: string, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        this.name = name;
        this.damage = damage;
        this.knockback = knockback;
        this.attackRotation = 0;
        this.attacking = false;
        super(x, y, type, scene, spriteImage, collisionManager, items);
    }

    generatePrice(setPrice?: number) {
        if (!setPrice) 
            this.cost = (this.damage + this.knockback) * 2;
        super.generatePrice(setPrice);
    }

    Equip() {
        super.Equip();
    }

    UnEquip() {
        super.UnEquip();
    }
    ExecuteAttack(projectile?: Projectile[]) {
        //abstract method
    }

    EndAttack() {
        //abstract method
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        this.sprite.Position = handLocation.Add(new eg.Vector2d(this.sprite.Size.HalfWidth, 0)).RotateAround(handLocation, playerRotation + this.attackRotation);
        this.sprite.Rotation = playerRotation + this.attackRotation;
    }
}