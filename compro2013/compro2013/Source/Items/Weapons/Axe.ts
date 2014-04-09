class Axe extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, new Attack(new eg.Vector2d(x, y), new eg.Size2d(32, 64), 10, 1, collisionManager), "Axe", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Axe1.png", 64, 64), collisionManager);

    }
}