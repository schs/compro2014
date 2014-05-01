class Gold extends Item {

    constructor(x: number, y: number, GoldAmount: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager ) {

        super(x, y, "Gold", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/GoldPile.png", 64, 64), collisionManager)


    }
}