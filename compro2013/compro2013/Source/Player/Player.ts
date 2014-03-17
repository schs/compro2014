class Player extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    collisions: number;
    wallCollision: boolean;
    speed: number;
    score: number;
    hud: HUD;
    inventory: Item[];
    leftHand: MeleeWeapon;
    //rightHand: RangedWeapon;
    inputController: eg.InputControllers.DirectionalInputController;
    movementController: eg.MovementControllers.LinearMovementController;
    sprite: eg.Graphics.Sprite2d;
    animation: eg.Graphics.SpriteAnimation;
    lastCollision: eg.Collision.Collidable;
    scene: eg.Rendering.Scene2d;
    collisionManager: eg.Collision.CollisionManager;
    health: number;
    damage: number;
    gold: number;
    currentAttack: Attack;

    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.InputManager, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.inventory = [];
        this.scene
        this.collisionType = CollisionType.Player;
        this.scene = scene;
        this.collisions = 0;
        this.collisionManager = collisionManager;
        this.speed = 200;
        this.score = 0;
        this.sprite = new eg.Graphics.Sprite2d(x, y, new eg.Graphics.ImageSource("/Resources/Images/Player/Player.png", 768, 64), 64, 64);
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, 12, new eg.Size2d(64), 12);
        this.sprite.ZIndex = ZIndexing.Player;
        super(this.sprite.GetDrawBounds());
        this.scene.Add(this.sprite);
        this.health = 100;
        this.damage = 20;
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite), this.speed, true);
        this.inputController = new eg.InputControllers.DirectionalInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
            this.movementController.Move(direction, startMoving);
        }, upKeys, rightKeys, downKeys, leftKeys);
        input.Mouse.OnClick.Bind(this.Attack.bind(this));
        this.collisionManager.Monitor(this);
        this.hud = new HUD(this.scene);
        this.animation.Play(true);
        this.inventory.push(new Sword(0, 0, scene, collisionManager));
        this.EquipLeftHand(0);
        this.inventory.push(new Axe(0, 0, scene, collisionManager));
    }

    TakeDamage(amount: number) {
        this.health -= amount;
    }

    Attack() {
        if (this.leftHand)
            this.leftHand.Attack();


    }

    EquipLeftHand(inventoryindex: number) {
        this.leftHand = <Sword>this.inventory[inventoryindex];
        this.inventory[inventoryindex] = null;
        this.sprite.AddChild(this.leftHand.sprite);
        this.leftHand.sprite.Rotation = .8;

    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Wall) {
            var tempPosition = this.movementController.Position.Clone();
            var depth: eg.Vector2d = BoundsHelper.GetIntersectionDepth(this.Bounds, collider.Bounds);
            if (Math.abs(depth.Y) < Math.abs(depth.X)) {
                this.movementController.Position = new eg.Vector2d(this.movementController.Position.X, tempPosition.Y + depth.Y);
            }
            else {
                this.movementController.Position = new eg.Vector2d(tempPosition.X + depth.X, this.movementController.Position.Y);

            }
        }

        
    

        super.Collided(data);
    }

    Update(gameTime: eg.GameTime) {
        this.movementController.Update(gameTime);
        if (this.movementController.IsMoving() && !this.animation.IsPlaying())
            this.animation.Play(true);
        else if (!this.movementController.IsMoving())
            this.animation.Stop(true);
        this.animation.Update(gameTime);
        if (this.leftHand)
            this.leftHand.Update(gameTime, this.movementController.Position);
        this.scene.Camera.Position = this.movementController.Position.Clone();
        this.hud.Update(gameTime, this.score, this.health, this.gold, this.inventory);
    }
} 