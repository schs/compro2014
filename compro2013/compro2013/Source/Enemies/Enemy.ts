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
    lastPosition: eg.Vector2d;
    pathfind: eg.Vector2d;
    sprite: eg.Graphics.Sprite2d;
    animation: eg.Graphics.SpriteAnimation;
    enemies: Enemy[];
    goldDrop: number;
    items: Item[];

    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;
    movementController: eg.MovementControllers.LinearMovementController;


    constructor(health: number, damage: number,
        attackspeed: number, speed: number,
        x: number, y: number, imageSource: eg.Graphics.ImageSource,
        frameCount: number, fps: number, imageSize: number,
        scene: eg.Rendering.Scene2d, collisionManager:
        eg.Collision.CollisionManager, enemies: Enemy[],
        items: Item[])
    {
        this.collisionManager = collisionManager;
        this.collisionType = CollisionType.Enemy;
        this.items = items;
        this.attackTimer = 60;
        this.attacking = false;
        this.sprite = new eg.Graphics.Sprite2d(x, y, imageSource, imageSize, imageSize);
        this.enemies = enemies;
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, fps, new eg.Size2d(imageSize), frameCount);
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
        this.pathfind = new eg.Vector2d(this.speed, this.speed);
        this.lastPosition = this.movementController.Position.Clone();
        this.animation.Play(true);
        this.goldDrop = Math.floor(Math.random()*10);
    }

    Move() {
        var xSide: number = this.movementController.Position.X - this.targetedPlayer.movementController.Position.X;
        var ySide: number = this.movementController.Position.Y - this.targetedPlayer.movementController.Position.Y;
        var rotation: number = Math.atan2(xSide, ySide);
        this.movementController.Rotation = -rotation;
        this.movementController.Position.X -= this.speed * Math.sin(rotation);
        this.movementController.Position.Y -= this.speed * Math.cos(rotation);
        if (!this.animation.IsPlaying())
            this.animation.Play(true);
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

    AppyKnockback(distance: number) {
        var angle = -this.movementController.Rotation;
        var hypotenuse = distance;
        var newPosition = new eg.Vector2d(Math.sin(angle) * hypotenuse, Math.cos(angle) * hypotenuse);

        this.movementController.Position = this.movementController.Position.Add(newPosition);

    }

    TakeDamage(amount: number, knockback: number) {
        this.health -= amount;
        console.log(this.health);
        this.AppyKnockback(knockback);
        if (this.health < 1) {
            this.Die();
        }
    }

    Die() {
        this.Dispose();
        this.DropGold();
    }

    DropGold() {
        this.items.push(new Gold(this.movementController.Position.X, this.movementController.Position.Y, this.goldDrop, this.scene, this.collisionManager, this.items));
        
    }

    Dispose() {
        this.sprite.Dispose();
        super.Dispose();
        this.range.Dispose();
        this.enemies.splice(this.enemies.indexOf(this, 0), 1);
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
            this.attacking = true;

        }
    }


    Update(gameTime: eg.GameTime, players: Player[]) {
        this.movementController.Update(gameTime);

        for (var i in players) {
            if (this.range.IsCollidingWith(players[i]))
                this.TargetPlayer(players[i]);
        }

        this.attackTimer += gameTime.Elapsed.Seconds;
        if (this.attacking && this.attackTimer > .5 / this.attackspeed) {
            this.targetedPlayer.TakeDamage(this.damage);
            this.attackTimer = 0;
        }
       



        this.animation.Update(gameTime);
    }
}
// I like trains
