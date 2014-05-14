class Trainipede extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies: Enemy[],
        items: Item[]) {
        super(100, 2, 6, 3, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/Bosses/Trainipede.png", 896, 128), 7, 20, 128, scene, collisionManager, enemies, items)

    }
} 