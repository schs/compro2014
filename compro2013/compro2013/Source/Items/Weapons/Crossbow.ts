class Crossbow extends RangedWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        
        super(x, y, 10, 1, "Crossbow", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Crossbow.png", 64, 64), collisionManager);
    }

}