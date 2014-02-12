class Sword extends Item {
    
    size: number;
    scene: eg.Rendering.Scene2d;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;

    constructor(scene: eg.Rendering.Scene2d) {
        name = "Sword";
        this.sprite // new eg.spite Thien making art
        super(name, scene, this.sprite);
        this.scene.Add(this.sprite);
      
    }


    collision() {

    }

    Update(gameTime: eg.GameTime) {

    }








}