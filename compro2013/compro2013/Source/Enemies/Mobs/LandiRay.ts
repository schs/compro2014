class LandiRay extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies,
        items: Item[]) {
        super(100, 2, 6, 5, x, y, new eg.Graphics.ImageSource("../../../Resources/Images/Enemies/LandiRay.png", 320, 64), 5, 8, 64, scene, collisionManager, enemies, items)

    }
} 