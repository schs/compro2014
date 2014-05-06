class Lightsaber extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {

        super(x, y, 100, 0, "Lightsaber", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/BlueLightsaber.png", 64, 64), collisionManager, items);

    }





}