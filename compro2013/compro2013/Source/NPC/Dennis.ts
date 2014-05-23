class Dennis extends Pet {

    constructor(x: number, y: number, targetPlayer: Player, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        super(100, 10, 1, 12.30, x, y, targetPlayer, new eg.Graphics.ImageSource("Resources/Images/Pet/Dennis.png", 832, 64), 12, 18, 64, scene, collisionManager)


    }
}