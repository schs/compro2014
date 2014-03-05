class BrownSmear extends Enemy {

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        super(100, 2, 6, 3, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/BrownSmear.png", 832, 64),64, 64, scene, collisionManager)
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, 12, new eg.Size2d(64), 13);
        this.animation.Play(true);
    }
} 