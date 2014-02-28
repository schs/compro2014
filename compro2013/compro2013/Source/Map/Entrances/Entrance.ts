class Entrance extends eg.Collision.Collidable {
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    
    constructor() {
        
        this.imageSource = new eg.Graphics.ImageSource("/images/Shop.png", 64, 64);
        this.sprite = new eg.Graphics.Sprite2d(64, 64, this.imageSource);
        super(this.sprite.GetDrawBounds());


    }

    Collided(data: eg.Collision.CollisionData) {
       


    }



}