class Player extends eg.Collision.Collidable implements eg.IUpdateable {
    speed: number;
    inputController: eg.InputControllers.DirectionalInputController;
    movementController: eg.MovementControllers.LinearMovementController;
    sprite: eg.Graphics.Sprite2d;
    lastCollision: eg.Collision.Collidable;
    scene: eg.Rendering.Scene2d;
    health: number;
    damage: number;

    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.KeyboardHandler, scene: eg.Rendering.Scene2d) {
        this.scene = scene;
        this.speed = 200;
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
    }

    DamageTaken() {
        
    }

    Attack() {
        
    }

    Collision(data: eg.Collision.CollisionData) {

    }

    Update(gameTime: eg.GameTime) {
        this.movementController.Update(gameTime);
        this.scene.Camera.Position = this.movementController.Position.Clone();
    }
} 