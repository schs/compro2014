class Crossbow extends RangedWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, new Attack(new eg.Vector2d(x, y), new eg.Size2d(32, 64), 10, 1, collisionManager), "Crossbow", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Crossbow.png", 64, 64), collisionManager);
    }

}