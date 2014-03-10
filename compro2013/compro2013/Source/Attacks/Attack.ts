class Attack extends eg.Collision.Collidable implements eg.IUpdateable {
    sprite: eg.Graphics.Sprite2d;
    speed: number;
    timer: number;
    attacking: boolean;

        

    constructor(position: eg.Vector2d, size: eg.Size2d) {

        super(new eg.Bounds.BoundingRectangle(position, size))
        



    }   

    Excute () {
        this.attacking = true;


    }
           


    Update (gameTime: eg.GameTime) {
        

    }


}