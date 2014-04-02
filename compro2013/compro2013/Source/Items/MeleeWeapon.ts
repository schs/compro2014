class MeleeWeapon extends Item {
    name: string;
    damage: number;
    private attack: Attack;
    knockback: number;



    constructor(x: number, y: number, knockback: number, damage: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.damage = damage;
        this.name = name;
        this.knockback = knockback;

        super(x, y, "MeleeWeapon", scene, spriteImage, collisionManager);
    }



}