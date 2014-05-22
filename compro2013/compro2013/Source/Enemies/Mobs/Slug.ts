class Slug extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, enemies: Enemy[], items: Item[]) {
        super(300, 2, .5, 3, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/Slug.png", 576, 64), 9, 12, 64, scene, collisionManager, enemies, items)

    }
} 