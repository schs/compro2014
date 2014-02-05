class Item extends eg.Collision.Collidable {
    name: String;
    size: number;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;

    constructor() {
        this.scene = scene;
        this.sprite = eg.Graphics.Sprite2d;
        this.scene.Add(this.sprite);
        super();
    }


    collision() {


    }
    Update(gameTime: eg.GameTime) {

    }

} 