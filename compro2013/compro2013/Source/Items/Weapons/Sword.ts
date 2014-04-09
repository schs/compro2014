class Sword extends MeleeWeapon {
    
    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        
        super(
            x,
            y,
            new SwingAttack(new eg.Vector2d(x, y), new eg.Size2d(32, 64), 10, 1, collisionManager),
            "Sword", scene,
            new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Sword1.png", 64, 64),
            collisionManager
            );

    }



}