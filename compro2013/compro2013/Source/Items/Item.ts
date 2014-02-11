class Item extends eg.Collision.Collidable {
    name: String;
    size: number;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;

    constructor(scene: eg.Rendering.Scene2d) {
        this.scene = scene;
        this.sprite //set the sprite here
        this.scene.Add(this.sprite);
        super(this.sprite.GetDrawBounds());
    }


    collision() {


    }
    Update(gameTime: eg.GameTime) {

    }

} 