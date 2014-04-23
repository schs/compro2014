class BattleAxe extends MeleeWeapon {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {

        super(x, y, 10, 30, "BattleAxe", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Weapons/BattleAxe.png", 64, 64), collisionManager);

    }
}