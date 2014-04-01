class Pet extends eg.Collision.Collidable implements ICollidableTyped {
    collisionType: CollisionType;
    attacking: boolean;
    health: number;
    damage: number;
    attackspeed: number;
    speed: number;
    targetedPlayer: Player;
    targetedEnemy: Enemy;
    attackTimer: number;
    range: eg.Collision.Collidable;
    collisionManager: eg.Collision.CollisionManager;
    lastCollision: eg.Collision.Collidable;
    lastPosition: eg.Vector2d;
    pathfind: eg.Vector2d;
    sprite: eg.Graphics.Sprite2d;
    animation: eg.Graphics.SpriteAnimation;

    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;
    movementController: eg.MovementControllers.LinearMovementController;


    constructor(health: number, damage: number, attackspeed: number, speed: number, x: number, y: number, targetPlayer: Player, imageSource: eg.Graphics.ImageSource, frameCount: number, fps: number, imageSize: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.collisionManager = collisionManager;
        this.collisionType = CollisionType.Enemy;
        this.attackTimer = 60;
        this.attacking = false;
        this.sprite = new eg.Graphics.Sprite2d(x, y, imageSource, imageSize, imageSize);
        this.targetedPlayer = targetPlayer;
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, fps, new eg.Size2d(imageSize), frameCount);
        this.sprite.ZIndex = ZIndexing.Pet;
        super(this.sprite.GetDrawBounds());
        this.scene = scene;
        this.health = health;
        this.damage = damage;
        this.attackspeed = attackspeed;
        this.speed = speed;
        this.scene.Add(this.sprite);
        this.range = new eg.Collision.Collidable(new eg.Bounds.BoundingCircle(this.sprite.Position, 75));
        this.collisionManager.Monitor(this);
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.range.Bounds, this.Bounds, this.sprite), this.speed, true);
        this.pathfind = new eg.Vector2d(this.speed, this.speed);
        this.lastPosition = this.movementController.Position.Clone();
        this.animation.Play(true);
        this.range.OnCollision.Bind(this.RangeCollision.bind(this));
        this.collisionManager.Monitor(this.range);
        
    }

    RangeCollision(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;
        if (collider.collisionType == CollisionType.Enemy) {
            this.TargetEnemy(<Enemy>collider)
        }
            
        
    }

    TargetEnemy (enemy: Enemy) {

        if (enemy != this.targetedEnemy)
            if (!this.targetedPlayer || BoundsHelper.PythagoreanTheorem(this.movementController.Position.X - (<Enemy>enemy).movementController.Position.X,
                this.movementController.Position.Y - (<Enemy>enemy).movementController.Position.Y) >
                BoundsHelper.PythagoreanTheorem(this.movementController.Position.X - this.targetedPlayer.movementController.Position.X,
                    this.movementController.Position.Y - this.targetedPlayer.movementController.Position.Y)) {
                        this.targetedEnemy = (<Enemy>enemy);
            }
        
}

    Move(position: eg.Vector2d) {
        var xSide: number = this.movementController.Position.X - position.X;
        var ySide: number = this.movementController.Position.Y - position.Y;
        var rotation: number = Math.atan2(xSide, ySide);
        this.movementController.Rotation = -rotation - 1.5;
        this.movementController.Position.X -= this.speed * Math.sin(rotation);
        this.movementController.Position.Y -= this.speed * Math.cos(rotation);
        if (!this.animation.IsPlaying())
            this.animation.Play(true);
    }

    
    TakeDamage(amount: number) {
        
        this.health -= amount;
        console.log(this.health);
        if (this.health < 1) {
            //  this.Die();
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
                if ((Math.abs(this.movementController.Position.X - this.lastPosition.X) <= this.speed / 1.5)) {
                    if (Math.abs(this.movementController.Position.X - collider.Bounds.Position.X) < (<eg.Bounds.BoundingRectangle>this.Bounds).Size.Width / 2)
                        this.pathfind.X *= -1;
                    else if (Math.abs(this.movementController.Position.Y - this.lastPosition.Y) <= this.speed / 2) {
                        this.pathfind.X *= -1;
                        this.movementController.Position.X += depth.X;
                        this.movementController.Position.Y += depth.Y;
                    }
                }

                this.lastPosition = this.movementController.Position.Clone();
                this.movementController.Position = new eg.Vector2d(this.movementController.Position.X + this.pathfind.X, tempPostion.Y + depth.Y);
            }
            else if (Math.abs(depth.Y) > Math.abs(depth.X)) {
                if (Math.abs(this.movementController.Position.Y - this.lastPosition.Y) <= this.speed / 1.5) {
                    if (Math.abs(this.movementController.Position.Y - collider.Bounds.Position.Y) < (<eg.Bounds.BoundingRectangle>this.Bounds).Size.Height / 2)
                        this.pathfind.Y *= -1;
                    else if (Math.abs(this.movementController.Position.X - this.lastPosition.X) <= this.speed / 2) {
                        this.pathfind.Y *= -1;
                        this.movementController.Position.Y += depth.Y;
                        this.movementController.Position.X += depth.X;
                    }
                }

                this.lastPosition = this.movementController.Position.Clone();
                this.movementController.Position = new eg.Vector2d(tempPostion.X + depth.X, this.movementController.Position.Y + this.pathfind.Y);
            }
        }
        if (collider == this.targetedPlayer) {
            this.attacking = false;

        }
    }


    Update(gameTime: eg.GameTime) {
        this.movementController.Update(gameTime);

        

        this.attackTimer += gameTime.Elapsed.Seconds;
        if (this.attacking && this.attackTimer > .5 / this.attackspeed) {
            this.targetedEnemy.TakeDamage(this.damage);
            this.attackTimer = 0;
        }
        
        if (!this.range.IsCollidingWith(this.targetedPlayer)) {
            this.Move(this.targetedPlayer.movementController.Position);

        }
        else if (this.targetedEnemy)
             this.Move(this.targetedEnemy.movementController.Position);
        


        this.animation.Update(gameTime);
    }
}
// I like trains