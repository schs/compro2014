class Enemy extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    circle: eg.Graphics.Circle;
    health: number;
    damage: number;
    attackspeed: number;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;
    movementcontroller: eg.MovementControllers.LinearMovementController;
    speed: number;

    constructor(health: number, damage: number, attackspeed: number, x: number, y: number, imageSource: eg.Graphics.ImageSource, scene: eg.Rendering.Scene2d) {

        this.collisionType = CollisionType.Enemy;
        this.imageSource = imageSource;
        this.sprite = new eg.Graphics.Sprite2d(x, y, this.imageSource);
        this.scene = scene;
        this.health = health;
        this.damage = damage;
        this.attackspeed = attackspeed;
        this.scene.Add(this.sprite);
        this.movementcontroller = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite), this.speed, false);

        super(this.sprite.GetDrawBounds());

    }



    Update() {

    }


}

