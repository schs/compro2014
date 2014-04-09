class Player extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    collisions: number;
    wallCollision: boolean;
    speed: number;
    score: number;
    pet: Pet;
    hud: HUD;
    inventory: Item[];
    leftHand: MeleeWeapon;
    boundingShape: eg.Graphics.Rectangle;
    rightHand: RangedWeapon;
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
    pickingUp: boolean;
    attack: Attack;
    pickUpItem: boolean;

    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.InputManager, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.inventory = [];
        this.collisionType = CollisionType.Player;
        this.scene = scene;
        this.collisions = 0;
        this.collisionManager = collisionManager;
        this.speed = 200;
        this.score = 0;
        this.pickingUp = false;
        this.boundingShape = new eg.Graphics.Rectangle(x, y, 64, 64, eg.Graphics.Color.Transparent);
        this.boundingShape.ZIndex = ZIndexing.Player;
        this.sprite = new eg.Graphics.Sprite2d(0, 0, new eg.Graphics.ImageSource("/Resources/Images/Player/Player.png", 768, 64), 64, 64);
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, 12, new eg.Size2d(64), 12);
        this.sprite.ZIndex = ZIndexing.Player;
        super(this.boundingShape.GetDrawBounds());
        this.scene.Add(this.boundingShape);
        this.boundingShape.AddChild(this.sprite);
        this.health = 100;
        this.damage = 20;
        this.inventory.push(new Sword(0, 0, scene, collisionManager));
        this.EquipLeftHand(0);
        this.attack = new Attack(new eg.Vector2d(x, y), new eg.Size2d(32, 64), this.leftHand.damage, this.leftHand.knockback, collisionManager);
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.boundingShape, this.attack.Bounds), this.speed, true);
        this.BindInputs(upKeys, downKeys, leftKeys, rightKeys, input);
        
        this.collisionManager.Monitor(this);
        this.hud = new HUD(this.scene);
        this.animation.Play(true);
        
        this.pet = new Dennis(x, y, this, scene, collisionManager);
    }

    TakeDamage(amount: number) {
        this.health -= amount;
    }

    Attack() {
        this.leftHand.attack.Execute();


    }

    pickUpItems(item: Item) {
        if (this.inventory.length < 10) { 
            item.sprite.ZIndex = ZIndexing.HUD;
            this.inventory.push(item);
        }
    }



    EquipLeftHand(inventoryindex: number) {
        if (this.inventory.length > inventoryindex) {
            var tempItem = <MeleeWeapon>this.inventory.splice(inventoryindex, 1)[0];
            if (this.leftHand) {
                this.boundingShape.RemoveChild(this.leftHand.sprite);
                this.leftHand.sprite.ZIndex = ZIndexing.HUD;
                this.inventory.push(this.leftHand);
            }
            this.leftHand = tempItem;
            this.boundingShape.AddChild(this.leftHand.sprite);
            this.leftHand.sprite.Position.X = 27;
            this.leftHand.sprite.Position.Y = 20;
            this.leftHand.sprite.Rotation = 1.5;
            this.leftHand.sprite.ZIndex = ZIndexing.Item;
        }
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


        if (collider.collisionType == CollisionType.Item) {
            if (this.pickingUp) {
                this.pickUpItems(<Item>collider);
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
        // if (this.leftHand)
        this.pet.Update(gameTime);
        this.scene.Camera.Position = this.movementController.Position.Clone();
        this.hud.Update(gameTime, this.score, this.health, this.gold, this.inventory);
        if (this.leftHand)
            this.attack.Update(gameTime);
    }

    BindInputs(upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.InputManager) {
        this.inputController = new eg.InputControllers.DirectionalInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
            this.movementController.Move(direction, startMoving);
        }, upKeys, rightKeys, downKeys, leftKeys);

        input.Mouse.OnClick.Bind(this.Attack.bind(this));

        input.Keyboard.OnCommandDown("e", () => {
            this.pickingUp = true;
        });
        input.Keyboard.OnCommandUp("e", () => {
            this.pickingUp = false;
        });

        input.Keyboard.OnCommandUp("1", () => {
            this.EquipLeftHand(0);
        }); input.Keyboard.OnCommandUp("2", () => {
            this.EquipLeftHand(1);
        }); input.Keyboard.OnCommandUp("3", () => {
            this.EquipLeftHand(2);
        }); input.Keyboard.OnCommandUp("4", () => {
            this.EquipLeftHand(3);
        }); input.Keyboard.OnCommandUp("5", () => {
            this.EquipLeftHand(4);
        }); input.Keyboard.OnCommandUp("6", () => {
            this.EquipLeftHand(5);
        }); input.Keyboard.OnCommandUp("7", () => {
            this.EquipLeftHand(6);
        }); input.Keyboard.OnCommandUp("8", () => {
            this.EquipLeftHand(7);
        }); input.Keyboard.OnCommandUp("9", () => {
            this.EquipLeftHand(8);
        }); input.Keyboard.OnCommandUp("0", () => {
            this.EquipLeftHand(9);
        });
    }
} 