class CarlTheSnake extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies: Enemy[],
        items: Item[]) {
        super(100, 5, 1, 5, x, y, new eg.Graphics.ImageSource("../../../Resources/Images/Enemies/CarlTheSnake.png", 3008, 64), 47, 40, 64, scene, collisionManager, enemies, items)

    }
} 