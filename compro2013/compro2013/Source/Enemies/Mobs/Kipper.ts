class Kipper extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies: Enemy[],
        items: Item[]) {
        super(200, 3, 2, 5, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/Kipper.png", 1088, 64), 17, 18, 64, scene, collisionManager, enemies, items)

    }
} 