class MeleeWeapon extends Item {
    name: string;
    damage: number;
    private attack: Attack;
    knockback: number;


    constructor(x: number, y: number, knockback: number, damage: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource) {
        this.damage = damage;
        this.name = name;
        this.knockback = knockback;
        
        super(x, y, "MeleeWeapon", scene, spriteImage);
this.attack = new Attack(this.Bounds.Position, this.sprite.Size, this.damage, this.knockback);
    }

    Attack() {
        this.attack.Excute();

    }

    Update(gameTime: eg.GameTime, position: eg.Vector2d) {
        this.attack.Update(gameTime, position);
        
    }


}