class HealthPotion extends Item {
    name: string;
    using: boolean;

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.name = name;

        this.using = false;
        super(x, y, "HealthPotion", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/Potions/healthboost.png", 64, 64), collisionManager);
    }
    Equip() {
        super.Equip();
    }

    UnEquip() {
        super.UnEquip();
    }
    DrinkPotion() {
        //abstract method
    }

    EndPotion() {
        //abstract method
    }

    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        this.sprite.Position = handLocation.Add(new eg.Vector2d(this.sprite.Size.HalfWidth, 0)).RotateAround(handLocation, playerRotation);
        this.sprite.Rotation = playerRotation;
    }
    

}