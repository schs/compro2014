class Player extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    collisions: number;
    wallCollision: boolean;
    speed: number;
    score: number;
    hud: HUD;
    inputController: eg.InputControllers.DirectionalInputController;
    movementController: eg.MovementControllers.LinearMovementController;
    sprite: eg.Graphics.Sprite2d;
    lastCollision: eg.Collision.Collidable;
    scene: eg.Rendering.Scene2d;
    collisionManager: eg.Collision.CollisionManager;
    health: number;
    damage: number;
    gold: number;

    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.KeyboardHandler, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.collisionType = CollisionType.Player;
        this.scene = scene;
        this.collisions = 0;
        this.collisionManager = collisionManager;
        this.speed = 200;
        this.score = 0;
        this.sprite = new eg.Graphics.Sprite2d(x, y, new eg.Graphics.ImageSource("/Resources/Images/Player/Player.png", 64, 64));
        this.sprite.ZIndex = ZIndexing.Player;
        super(this.sprite.GetDrawBounds());
        this.scene.Add(this.sprite);
        this.health = 100;
        this.damage = 20;
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite), this.speed, true);
        this.inputController = new eg.InputControllers.DirectionalInputController(input, (direction: string, startMoving: boolean) => {
            this.movementController.Move(direction, startMoving);
        }, upKeys, rightKeys, downKeys, leftKeys);
        this.collisionManager.Monitor(this);
        this.hud = new HUD(this.scene);
    }

    DamageTaken() {
        
    }

    Attack() {
        
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

        super.Collided(data);
    }

    Update(gameTime: eg.GameTime) {
        
        this.movementController.Update(gameTime);
        this.scene.Camera.Position = this.movementController.Position.Clone();
        this.hud.Update(gameTime, this.score, this.health, this.gold);
    }
} 