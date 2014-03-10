class Axe extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, 50, "Axe", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Axe01.png", 64, 64));

    }
}