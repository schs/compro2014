class RangedWeapon extends Item {
    name: string;
    
    public attack: Attack;


    constructor(x: number, y: number, attack: Attack, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        
        this.name = name;

        super(x, y, "RangedWeapon", scene, spriteImage, collisionManager);
    }

}