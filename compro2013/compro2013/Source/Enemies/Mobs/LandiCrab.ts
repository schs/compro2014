class LandiCrab extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies,
        items: Item[]) {
        super(300, 2, 6, 5, x, y, new eg.Graphics.ImageSource("Resources/Images/Enemies/LandiCrab.png", 576, 64), 9, 10, 64, scene, collisionManager, enemies, items)

    }
} 