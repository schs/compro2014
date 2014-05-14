class Item extends eg.Collision.Collidable implements ICollidableTyped {
    type: String;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    items: Item[];
    cost: number;
    costText: eg.Graphics.Text2d;

    sprite: eg.Graphics.Sprite2d;
    collisionType: CollisionType;
    collisionManager: eg.Collision.CollisionManager;

    constructor(x: number, y: number, type: String, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager, items: Item[], cost?: number) {
        if (cost)
            this.cost = cost;
        else
            this.cost = 0;
    
        this.collisionType = CollisionType.Item;
        this.type = type;
        this.items = items;
        this.scene = scene;
        this.sprite = new eg.Graphics.Sprite2d(x, y, spriteImage) 
        this.sprite.ZIndex = ZIndexing.Item;
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
        this.Bounds.Position = this.sprite.Position;
        this.collisionManager = collisionManager;
        this.collisionManager.Monitor(this, true);
    }

    generatePrice(setPrice?: number) {
        if (setPrice)
            this.cost = setPrice;

        if (this.cost > 0) {
            this.costText = new eg.Graphics.Text2d(this.sprite.Position.X, (this.sprite.Position.Y - this.sprite.Size.HalfHeight) - 10, "$" + this.cost);
            this.costText.Scale(3);
            this.costText.Color = eg.Graphics.Color.White;
            this.costText.Shadow(-1,1,eg.Graphics.Color.Black,.5);
            this.costText.ZIndex = ZIndexing.Item;
            this.scene.Add(this.costText);
        }
    }

    Dispose() {
        this.sprite.Dispose();
        if (this.costText) {
            this.costText.Dispose();
            this.costText = null;
        }
        super.Dispose();
        this.items.splice(this.items.indexOf(this, 0), 1);

    }

    PickUp() {
        this.collisionManager.Unmonitor(this);
        this.items.splice(this.items.indexOf(this, 0), 1);
        if (this.costText) {
            this.costText.Dispose();
            this.costText = null;
        }
    }

    Equip() {
        this.sprite.ZIndex = ZIndexing.Item;
    }

    UnEquip() {
        this.sprite.Rotation = 0;
        this.sprite.ZIndex = ZIndexing.HUD;
    }

    Collided(data: eg.Collision.CollisionData) {

    }
} 