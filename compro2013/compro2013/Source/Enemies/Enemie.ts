class Enemies extends eg.Collision.Collidable implements eg.IUpdateable {

    circle: eg.Graphics.Circle;
    health: number;
    damage: number;
    attackspeed: number;
    lastCollision: eg.Collision.Collidable;
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    scene: eg.Rendering.Scene2d;

    constructor(health: number, damage: number, attackspeed: number, x: number, y: number, imageSource: eg.Graphics.ImageSource, scene: eg.Rendering.Scene2d) {


        this.imageSource = imageSource;
        this.sprite = new eg.Graphics.Sprite2d(x, y, this.imageSource);
        this.scene = scene;
        this.health;
        this.damage;
        this.attackspeed;
       

        super(this.circle.GetDrawBounds());

    }



    Update() {

    }


}

