class Sword extends MeleeWeapon {
    
    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        
        super(x,y,50,"Sword", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Sword.png", 64, 64));

    }
}