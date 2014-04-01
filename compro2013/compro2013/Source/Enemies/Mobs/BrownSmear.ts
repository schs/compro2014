class BrownSmear extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies: Enemy[]) {
        super(100, 2, 6, 3, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/BrownSmear.png", 832, 64), 13, 18, 64, scene, collisionManager, enemies)

    }
} 