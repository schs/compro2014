class MeleeWeapon extends Item {
    name: string;
    damage: number;
    attack: Attack;
    knockback: number;


    constructor(x: number, y: number, knockback: number, damage: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource) {
        this.damage = damage;
        this.name = name;
        this.attack = new Attack(this.Bounds.Position, this.sprite.Size, this.damage, this.knockback);
        super(x, y, "MeleeWeapon", scene, spriteImage);
    }

    Attack() {


    }

    Update(gameTime: eg.GameTime, position: eg.Vector2d) {
        this.attack.Update(gameTime, position);
    }


}