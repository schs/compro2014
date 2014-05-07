class Gold extends Item {

    constructor(x: number, y: number, goldAmount: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
      
        super(x, y, "Gold", scene, new eg.Graphics.ImageSource("/Resources/Images/Items/GoldPile.png", 64, 64), collisionManager, items, -goldAmount)


    }

    PickUp() {
        this.Dispose();
    }
}