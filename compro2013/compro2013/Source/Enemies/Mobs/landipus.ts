class Landipus extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies,
        items: Item[]) {
        super(100, 2, 6, 5, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/Landipus.png", 384, 64), 6, 12, 64, scene, collisionManager, enemies, items)

    }
} 