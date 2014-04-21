class Projectile extends eg.Collision.Collidable {
    name: string;
    damage: number;
    direction: eg.Vector2d;
    velocity: eg.Vector2d;
    startVelocity: eg.Vector2d;
    lastCollision: eg.Collision.Collidable;
    collisionManager: eg.Collision.CollisionManager;
    movementController: eg.MovementControllers.MovementController;
    scene: eg.Rendering.Scene2d;
    knockback: number;
    sprite: eg.Graphics.Sprite2d;


    constructor(x: number, y: number, damage: number, xVelocity: number, yVelocity: number, rotation: number, knockback: number, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
        this.name = name;
        this.damage = damage;
        
        this.velocity = new eg.Vector2d(xVelocity, yVelocity);
        this.knockback = knockback;
        this.scene = scene;
        this.collisionManager = collisionManager;
        this.sprite = new eg.Graphics.Sprite2d(x, y, spriteImage) 
        super(this.sprite.GetDrawBounds());
        this.movementController = new eg.MovementControllers.MovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite));
        this.movementController.Rotation = rotation;
        this.sprite.ZIndex = ZIndexing.Projectiles;
        this.collisionManager.Monitor(this);
        this.scene.Add(this.sprite);
    }

    Move() {
        var angle = this.movementController.Rotation;


    }

    Update(gameTime: eg.GameTime) {
        this.movementController.Position = this.movementController.Position.Add(this.velocity);
        this.movementController.Update(gameTime);
    }

}