class Gold extends Item {
    amount: number;

    constructor(x: number, y: number, GoldAmount: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        this.amount = GoldAmount;
        super(x, y, "Gold", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/GoldPile.png", 64, 64), collisionManager, items)


    }

    PickUp() {
        this.Dispose();
    }
}