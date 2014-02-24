class Item extends eg.Collision.Collidable implements ICollidableTyped {
    type: String;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    collisionType: CollisionType;

    constructor(type: String, scene: eg.Rendering.Scene2d, sprite: eg.Graphics.Sprite2d) {
        this.collisionType = CollisionType.Item;
        this.type = type;
        this.scene = scene;
        this.sprite = sprite; 
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
    }


    Collided(data: eg.Collision.CollisionData) {
        if (this.lastCollision !== data.With) {

        }

    }

    Update(gameTime: eg.GameTime) {

    }

} 