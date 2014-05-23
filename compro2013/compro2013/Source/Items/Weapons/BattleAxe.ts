class BattleAxe extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {

        super(x, y, 35, 25, "BattleAxe", scene, new eg.Graphics.ImageSource("Resources/Images/Items/Weapons/BattleAxe.png", 64, 64), collisionManager, items);

    }
}