class Entrance extends eg.Collision.Collidable implements ICollidableTyped {
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    mapHandler: MapHandler;
    collisionType: CollisionType;
    loading: boolean;

    constructor(position: eg.Vector2d, mapHandler: MapHandler, collisionManager: eg.Collision.CollisionManager) {
        mapHandler: MapHandler;
        this.collisionType = CollisionType.Entrance;
        this.imageSource = new eg.Graphics.ImageSource("/images/Shop.png", 64, 64);
        this.sprite = new eg.Graphics.Sprite2d(position.X, position.Y, this.imageSource);
        super(this.sprite.GetDrawBounds());
        (<eg.Bounds.BoundingRectangle>this.Bounds).Size.Subtract(1);
        this.sprite.ZIndex = ZIndexing.Entrance;
        this.loading = false;

        collisionManager.Monitor(this, true);
    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Player && !this.loading) {
            this.loading = true;

            this.mapHandler.walls = [];
            this.mapHandler.entrances = [];
            this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete.bind(this.mapHandler));

        }
    }
}