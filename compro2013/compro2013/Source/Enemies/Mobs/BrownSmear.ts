class BrownSmear extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        super(100, 2, 6, 2, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/BrownSmear.png", 64, 64), scene, collisionManager)

    }
} 