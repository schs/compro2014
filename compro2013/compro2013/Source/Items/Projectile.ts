class Projectile extends Item {
    name: string;
    damage: number;
    direction: eg.Vector2d;
    position: eg.Vector2d;
    velocity: eg.Vector2d;
    startVelocity: eg.Vector2d;
    lastCollision: eg.Collision.Collidable;
    knockback: number;
    public Attack: Attack;



    constructor(x: number, y: number, name: string, damage: number, xVelocity: number, yVelocity: number, knockback: number, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.name = name;
        this.damage = damage;
        this.position = new eg.Vector2d(x, y);
        this.velocity = new eg.Vector2d(xVelocity, yVelocity);
        this.startVelocity = new eg.Vector2d(xVelocity, yVelocity);
        this.direction = new eg.Vector2d(x, y);
        this.knockback = knockback;

        super(x, y, "Projectile", scene, spriteImage, collisionManager);
    
    }

}