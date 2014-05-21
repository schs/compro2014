class Player extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    collisionType: CollisionType;
    collisions: number;
    wallCollision: boolean;
    speed: number;
    score: number;
    pet: Pet;
    hud: HUD;
    items: Item[];
    inventory: Item[];
    projectiles: Projectile[];
    handLocation: eg.Vector2d;
    hand: Weapon;
    boundingShape: eg.Graphics.Rectangle;
    inputController: eg.InputControllers.DirectionalInputController;
    movementController: eg.MovementControllers.LinearMovementController;
    sprite: eg.Graphics.Sprite2d;
    animation: eg.Graphics.SpriteAnimation;
    lastCollision: eg.Collision.Collidable;
    scene: eg.Rendering.Scene2d;
    collisionManager: eg.Collision.CollisionManager;
    health: number;
    gold: number;
    pickingUp: boolean;
    attackRotation: number;
    attacking: boolean;
    pickUpItem: boolean;

    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.InputManager, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        this.inventory = [];
        this.items = items;
        this.projectiles = [];
        this.collisionType = CollisionType.Player;
        this.scene = scene;
        this.collisions = 0;
        this.handLocation = new eg.Vector2d(x, y);
        this.collisionManager = collisionManager;
        this.speed = 200;
        this.score = 0;
        this.pickingUp = false;
        this.boundingShape = new eg.Graphics.Rectangle(x, y, 64, 64, eg.Graphics.Color.Transparent);
        this.boundingShape.ZIndex = ZIndexing.Player;
        this.sprite = new eg.Graphics.Sprite2d(0, 0, new eg.Graphics.ImageSource("/Resources/Images/Player/Player.png", 768, 64), 64, 64);
        this.sprite.ZIndex = ZIndexing.Player;
        this.animation = new eg.Graphics.SpriteAnimation(this.sprite.Image, 12, new eg.Size2d(64), 12);
        
        super(this.boundingShape.GetDrawBounds());
        this.scene.Add(this.boundingShape);
        this.boundingShape.AddChild(this.sprite);
        this.health = 100;
        this.gold = 0;
        this.inventory.push(new FrostTome(0, 0, scene, collisionManager, this.items));
        this.EquipItem(0);
        this.attackRotation = 0;

        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.boundingShape), this.speed, true);
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

         if (this.hand.type == "RangedWeapon")
            this.hand.ExecuteAttack(this.projectiles);
        else
            this.hand.ExecuteAttack();
        this.attacking = true;

    }



    pickUpItems(item: Item) {
        if (item.type == "Gold") {
            this.gold -= item.cost;
            item.PickUp();
        }
        else if (this.inventory.length < 10) { 
            if (item.cost < this.gold) {
                item.PickUp();
                this.gold -= item.cost;
                this.inventory.push(item);
            }
        }

    }



    EquipItem(inventoryindex: number) {
        if (this.inventory.length > inventoryindex) {
            var tempItem = <Item>this.inventory.splice(inventoryindex, 1)[0];
            if (tempItem.type == "HealthPotion") {
                this.health+=(<HealthPotion>tempItem).DrinkPotion();
            }
            else {
                if (this.hand) {
                    this.hand.UnEquip();
                    this.inventory.push(this.hand);
                }
                this.hand = (<Weapon>tempItem);
                this.hand.Equip();
            }
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
        this.handLocation = new eg.Vector2d(this.movementController.Position.X, this.movementController.Position.Y + 20).RotateAround(this.movementController.Position, this.movementController.Rotation)
        if (this.movementController.IsMoving() && !this.animation.IsPlaying())
            this.animation.Play(true);
        else if (!this.movementController.IsMoving())
            this.animation.Stop(true);
        this.animation.Update(gameTime);
        // if (this.leftHand)
        this.pet.Update(gameTime);
        this.scene.Camera.Position = this.movementController.Position.Clone();
        this.hud.Update(gameTime, this.score, this.health, this.gold, this.inventory);
        //if (this.attacking)
        //    this.leftHand.sprite.Rotation.
        if (this.hand) {
            this.hand.Update(gameTime, this.handLocation, this.movementController.Rotation);
        }
        for (var projectile in this.projectiles) {
            this.projectiles[projectile].Update(gameTime);
        }
    }

    BindInputs(upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.InputManager) {
        this.inputController = new eg.InputControllers.DirectionalInputController(input.Keyboard, (direction: string, startMoving: boolean) => {
            this.movementController.Move(direction, startMoving);
        }, upKeys, rightKeys, downKeys, leftKeys);

        input.Mouse.OnClick.Bind(this.Attack.bind(this));
        input.Keyboard.OnCommandUp("Space", this.Attack.bind(this));

        input.Keyboard.OnCommandDown("e", () => {
            this.pickingUp = true;
        });
        input.Keyboard.OnCommandUp("e", () => {
            this.pickingUp = false;
        });

        input.Keyboard.OnCommandUp("1", () => {
            this.EquipItem(0);
        }); input.Keyboard.OnCommandUp("2", () => {
            this.EquipItem(1);
        }); input.Keyboard.OnCommandUp("3", () => {
            this.EquipItem(2);
        }); input.Keyboard.OnCommandUp("4", () => {
            this.EquipItem(3);
        }); input.Keyboard.OnCommandUp("5", () => {
            this.EquipItem(4);
        }); input.Keyboard.OnCommandUp("6", () => {
            this.EquipItem(5);
        }); input.Keyboard.OnCommandUp("7", () => {
            this.EquipItem(6);
        }); input.Keyboard.OnCommandUp("8", () => {
            this.EquipItem(7);
        }); input.Keyboard.OnCommandUp("9", () => {
            this.EquipItem(8);
        }); input.Keyboard.OnCommandUp("0", () => {
            this.EquipItem(9);
        });
    }
} 