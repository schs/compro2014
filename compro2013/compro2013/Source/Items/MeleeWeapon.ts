class MeleeWeapon extends Item {
    name: string;
    damage: number;

    constructor(name: string, scene: eg.Rendering.Scene2d, sprite: eg.Graphics.Sprite2d, damage: number) {
        this.damage = damage;
        this.name = name;
        super("MeleeWeapon", scene, sprite);
    }
}