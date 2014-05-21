class Axe extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {

        super(x, y, 25, 30, "Axe", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/Axe.png", 64, 64), collisionManager, items);

    }
}