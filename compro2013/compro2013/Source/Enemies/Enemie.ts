class Enemies extends eg.Collision.Collidable implements eg.IUpdateable {

    circle: eg.Graphics.Circle;
    health: number;
    damage: number;
    attackspeed: number;
    lastCollision: eg.Collision.Collidable;
    

    constructor() {
        
        this.health;
        this.damage;
        this.attackspeed;

        super(this.circle.GetDrawBounds());

    }



    Update() {

    }


}

