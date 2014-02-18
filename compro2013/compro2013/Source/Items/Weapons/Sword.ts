class Sword extends MeleeWeapon {
    
    constructor(scene: eg.Rendering.Scene2d, damage: number) {
        this.damage= 50;
        this.sprite= new eg.Graphics.Sprite2d(25,25, new eg.Graphics.ImageSource("/Images/Weapons/Sword Again2.png", 50 ,50)); 
        super("Sword", scene, this.sprite, 10);
        this.scene.Add(this.sprite);
    }

    collision(data: eg.Collision.CollisionData) {
        if (this.lastCollision !== data.With) {
        }
    }

    Update(gameTime: eg.GameTime) {

    }








}