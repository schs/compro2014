class Lightsaber extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, 100, 0, "Lightsaber", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Lightsaber.png", 64, 64), collisionManager);

    }





}