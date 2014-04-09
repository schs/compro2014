class Sword extends MeleeWeapon {
    
    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        
        super(
            x,
            y,
           10, 1,
            "Sword", scene,
            new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Sword1.png", 64, 64),
            collisionManager
            );

    }



}