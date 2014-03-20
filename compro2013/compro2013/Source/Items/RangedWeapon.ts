class RangedWeapon extends Item {
    name: string;
    damage: number;
    private attack: Attack;


    constructor(x: number, y: number, damage: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource) {
        this.damage = damage;
        this.name = name;

        super(x, y, "RangedWeapon", scene, spriteImage);
    }

}