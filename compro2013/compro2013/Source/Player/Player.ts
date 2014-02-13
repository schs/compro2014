class Player extends eg.Collision.Collidable implements eg.IUpdateable, ICollidableTyped {
    CollisionType: CollisionType;
    speed: number;
    inputController: eg.InputControllers.DirectionalInputController;
    movementController: eg.MovementControllers.LinearMovementController;
    sprite: eg.Graphics.Sprite2d;
    lastCollision: eg.Collision.Collidable;
    scene: eg.Rendering.Scene2d;
    
    constructor(x: number, y: number, upKeys: string[], downKeys: string[], leftKeys: string[], rightKeys: string[], input: eg.Input.KeyboardHandler, scene: eg.Rendering.Scene2d) {
        this.scene = scene;
        this.CollisionType = CollisionType.Player;
        //add the sprite here
        super(this.sprite.GetDrawBounds());
        this.speed = 200;
        this.movementController = new eg.MovementControllers.LinearMovementController(new Array<eg.IMoveable>(this.Bounds, this.sprite), this.speed, false);
        this.inputController = new eg.InputControllers.DirectionalInputController(input, (direction: string, startMoving: boolean) => {
            this.movementController.Move(direction, startMoving);
        }, upKeys, rightKeys, downKeys, leftKeys);
    }

    Attack() {

    }

    Collision() {

    }

    Update(gameTime: eg.GameTime) {

    }
} 