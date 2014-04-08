class Dennis extends Pet {

    constructor(x: number, y: number, targetPlayer: Player, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        super(100, 2, 6, 10.25, x, y, targetPlayer, new eg.Graphics.ImageSource("/Resources/Images/Pet/Dennis.png", 832, 64), 12, 18, 64, scene, collisionManager)


    }
}