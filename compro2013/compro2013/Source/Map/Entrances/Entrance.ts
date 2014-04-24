class Entrance extends eg.Collision.Collidable implements ICollidableTyped {
    
    mapHandler: MapHandler;
    collisionType: CollisionType;
    loading: boolean;
    mapPath: string;

    constructor(position: eg.Vector2d, mapPath: string, mapHandler: MapHandler, collisionManager: eg.Collision.CollisionManager) {
        this.mapHandler = mapHandler;
        this.mapPath = mapPath;
        this.collisionType = CollisionType.Entrance;
        
        super(new eg.Bounds.BoundingRectangle(position, new eg.Size2d(64)));
        (<eg.Bounds.BoundingRectangle>this.Bounds).Size.Subtract(1);

        this.loading = false;

        collisionManager.Monitor(this, true);
    }

    Collided(data: eg.Collision.CollisionData) {
        var collider: ICollidableTyped = <ICollidableTyped>data.With;

        if (collider.collisionType == CollisionType.Player && !this.loading) {
            this.loading = true;
            this.mapHandler.loadNewMap(this.mapPath);

        }
    }
}