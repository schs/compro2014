class HealthPotion extends Item {
    name: string;
    using: boolean;
    potionStrength: number;

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items:Item[]) {
        this.name = name;
        this.potionStrength = 15;
        this.using = false;
        super(x, y, "HealthPotion", scene, new eg.Graphics.ImageSource("../../../Resources/Images/Items/Potions/healthboost.png", 64, 64), collisionManager,items);
    }

    generatePrice(setPrice?: number) {
        if (!setPrice)
            this.cost = this.potionStrength * 2;
        super.generatePrice(setPrice);
    }

    Equip() {
        super.Equip();
    }

    UnEquip() {
        super.UnEquip();
    }

    DrinkPotion(): number {
        this.Dispose();
        return this.potionStrength;
        
    }


    Update(gameTime: eg.GameTime, handLocation: eg.Vector2d, playerRotation: number) {
        this.sprite.Position = handLocation.Add(new eg.Vector2d(this.sprite.Size.HalfWidth, 0)).RotateAround(handLocation, playerRotation);
        this.sprite.Rotation = playerRotation;
    }
    

}