class MeleeWeapon extends Item {
    name: string;
    damage: number;
    knockback: number;
    public attack: Attack;
  
    


    constructor(x: number, y: number, damage: number, knockback: number, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
       
        this.name = name;
        this.damage = damage;
        this.knockback = knockback;

        super(x, y, "MeleeWeapon", scene, spriteImage, collisionManager);
    }

}