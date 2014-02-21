class Enemy extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    circle: eg.Graphics.Circle;
    health: number;
    damage: number;
    attackspeed: number;
    speed: number;
    range: eg.Collision.Collidable;
    collisionManager: eg.Collision.CollisionManager;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;
    movementcontroller: eg.MovementControllers.LinearMovementController;
    

    constructor(health: number, damage: number, attackspeed: number, speed: number, x: number, y: number, imageSource: eg.Graphics.ImageSource, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.collisionManager = collisionManager;
        this.collisionType = CollisionType.Enemy;
        this.imageSource = imageSource;
        this.sprite = new eg.Graphics.Sprite2d(x, y, this.imageSource);

        this.sprite.ZIndex = ZIndexing.Enemy;
        super(this.sprite.GetDrawBounds());
        this.scene = scene;
        this.health = health;
        this.damage = damage;
        this.attackspeed = attackspeed;
        this.speed = speed;
        this.scene.Add(this.sprite);
        this.range = new eg.Collision.Collidable(new eg.Bounds.BoundingCircle(this.sprite.Position, 500));

        this.range.OnCollision.Bind(this.RangeCollided.bind(this));
        this.collisionManager.Monitor(this.range);
        this.collisionManager.Monitor(this);
        this.movementcontroller = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.range.Bounds, this.Bounds, this.sprite), this.speed, false);
        
        
    }

    RangeCollided(data: eg.Collision.CollisionData) {

    }

    Collided(data: eg.Collision.CollisionData) {
        
    }

   
    Update() {

    }


}

