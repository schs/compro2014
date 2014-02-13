class Item extends eg.Collision.Collidable {
    type: String;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;

    constructor(type: String, scene: eg.Rendering.Scene2d, sprite: eg.Graphics.Sprite2d) {
        this.type = type;
        this.scene = scene;
        this.sprite = sprite; 
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
    }


    collision() {


    }

    Update(gameTime: eg.GameTime) {

    }

} 