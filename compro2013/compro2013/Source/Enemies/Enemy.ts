class Enemy extends eg.Collision.Collidable implements ICollidableTyped {
    collisionType: CollisionType;
    circle: eg.Graphics.Circle;
    attacking: boolean;
    health: number;
    damage: number;
    attackspeed: number;
    speed: number;
    targetedPlayer: Player;
    attackTimer: number;
    range: eg.Collision.Collidable;
    collisionManager: eg.Collision.CollisionManager;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;
    movementController: eg.MovementControllers.LinearMovementController;
    

    constructor(health: number, damage: number, attackspeed: number, speed: number, x: number, y: number, imageSource: eg.Graphics.ImageSource, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.collisionManager = collisionManager;
        this.collisionType = CollisionType.Enemy;
        this.imageSource = imageSource;
        this.sprite = new eg.Graphics.Sprite2d(x, y, this.imageSource);
        this.attackTimer = 60;
        this.attacking = false;
        this.sprite.ZIndex = ZIndexing.Enemy;
        super(this.sprite.GetDrawBounds());
        this.scene = scene;
        this.health = health;
        this.damage = damage;
        this.attackspeed = attackspeed;
        this.speed = speed;
        this.scene.Add(this.sprite);
        this.range = new eg.Collision.Collidable(new eg.Bounds.BoundingCircle(this.sprite.Position, 500));
        this.collisionManager.Monitor(this);
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.range.Bounds, this.Bounds, this.sprite), this.speed, true);
   }

    Move() {
        var xSide: number = this.movementController.Position.X - this.targetedPlayer.movementController.Position.X;
        var ySide: number = this.movementController.Position.Y - this.targetedPlayer.movementController.Position.Y;
        var rotation: number = Math.atan2(xSide, ySide);
        this.movementController.Rotation = -rotation;
        this.movementController.Position.X -= this.speed * Math.sin(rotation);
        this.movementController.Position.Y -= this.speed * Math.cos(rotation);
    }

    TargetPlayer(player: Player) {
        //Target Player
        if (player != this.targetedPlayer)
            if (!this.targetedPlayer || BoundsHelper.PythagoreanTheorem(this.movementController.Position.X - (<Player>player).movementController.Position.X,
                this.movementController.Position.Y - (<Player>player).movementController.Position.Y) >
                BoundsHelper.PythagoreanTheorem(this.movementController.Position.X - this.targetedPlayer.movementController.Position.X,
                    this.movementController.Position.Y - this.targetedPlayer.movementController.Position.Y)) {
                this.targetedPlayer = (<Player>player);
            }
        //Move to Player
        if (!this.attacking) {
            this.Move();
        }
        //Start moving if not attacking
        if (!this.IsCollidingWith(this.targetedPlayer)) {
            this.attacking = false;
        }
    }
    TakeDamage(amount: number) {
            this.health -= amount;
            console.log(this.health);
        if (this.health < 1) {
            this.Die();
        }
    }

    Die() {
        this.Dispose();
        this.sprite.Dispose();
    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Wall) {
            var tempPostion = this.movementController.Position.Clone();
            var depth: eg.Vector2d = BoundsHelper.GetIntersectionDepth(this.Bounds, collider.Bounds);
            if (Math.abs(depth.Y) < Math.abs(depth.X)) {
                this.movementController.Position = new eg.Vector2d(this.movementController.Position.X, tempPostion.Y + depth.Y);
            }
            else {
                this.movementController.Position = new eg.Vector2d(tempPostion.X + depth.X, this.movementController.Position.Y);

            }
        }
        if (collider == this.targetedPlayer) {
            this.attacking = true;
            
        }
    }

    Update(gameTime: eg.GameTime, players: Player[]) {
        this.movementController.Update(gameTime);

        for (var i in players) {
            if(this.range.IsCollidingWith(players[i]))
                this.TargetPlayer(players[i]);
        }

        this.attackTimer += gameTime.Elapsed.Seconds;
        if (this.attacking && this.attackTimer > .5/ this.attackspeed) {
            this.targetedPlayer.TakeDamage(this.damage);
            this.attackTimer = 0;
        }
        this.TakeDamage(10);

    }
}

