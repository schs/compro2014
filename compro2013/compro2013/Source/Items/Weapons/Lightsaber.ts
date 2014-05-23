class Lightsaber extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {

        super(x, y, 270, 10, "Lightsaber", scene, new eg.Graphics.ImageSource("../../../Resources/Images/Items/Weapons/BlueLightsaber.png", 64, 64), collisionManager, items);

    }


    generatePrice(setPrice?: number) {
        if (setPrice)
            super.generatePrice(setPrice);
        else
            super.generatePrice(2000);
    }


}