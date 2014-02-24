class MeleeWeapon extends Item {
    name: string;
    damage: number;

    constructor(x: number, y: number, damage: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource) {
        this.damage = damage;
        this.name = name;
        super(x, y, "MeleeWeapon", scene, spriteImage);
    }
}