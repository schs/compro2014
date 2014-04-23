class Projectile extends eg.Collision.Collidable {
    name: string;
    damage: number;
    active: boolean;
    direction: eg.Vector2d;
    velocity: eg.Vector2d;
    startVelocity: eg.Vector2d;
    lastCollision: eg.Collision.Collidable;
    collisionManager: eg.Collision.CollisionManager;
    movementController: eg.MovementControllers.MovementController;
    scene: eg.Rendering.Scene2d;
    knockback: number;
    sprite: eg.Graphics.Sprite2d;
    projectiles: Projectile[];


    constructor(x: number, y: number, damage: number, velocity: number, rotation: number, knockback: number, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, projectiles: Projectile[]) {
        this.name = name;
        this.damage = damage;
        this.projectiles = projectiles;
        this.knockback = knockback;
        this.active = true;
        this.scene = scene;
        this.collisionManager = collisionManager;
        this.sprite = new eg.Graphics.Sprite2d(x, y, spriteImage) 
        super(new eg.Bounds.BoundingRectangle(this.sprite.Position, new eg.Size2d(this.sprite.Size.HalfWidth, this.sprite.Size.HalfHeight/2)));
        this.movementController = new eg.MovementControllers.MovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite));
        this.movementController.Rotation = rotation;
        this.sprite.Visible = false;

        this.velocity = this.InitVelocity(velocity);
        this.sprite.ZIndex = ZIndexing.Projectiles;
        this.collisionManager.Monitor(this);
        this.scene.Add(this.sprite);
    }

    InitVelocity(speed: number):eg.Vector2d {
        var angle = -this.movementController.Rotation;
        var hypotenuse = speed;
        return new eg.Vector2d(Math.cos(angle) * hypotenuse, Math.sin(angle) * -hypotenuse);
        
    }

    Dispose() {
        if (this.active) {
            this.active = false;
            this.projectiles.splice(this.projectiles.indexOf(this, 0), 1);
            super.Dispose();
            this.sprite.Dispose();
        }
    }

    Update(gameTime: eg.GameTime) {
        if(!this.sprite.Visible)
            this.sprite.Visible = true;
        this.movementController.Position = this.movementController.Position.Add(this.velocity);
        this.movementController.Update(gameTime);
    }
    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Wall) {     
            this.Dispose();
        }

        if (collider.collisionType == CollisionType.Enemy) {
            this.Dispose();
            (<Enemy>collider).TakeDamage(this.damage, this.knockback);
        }
    }
}