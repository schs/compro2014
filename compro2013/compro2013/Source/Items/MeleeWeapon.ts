class MeleeWeapon extends Item {
    name: string;
    
    public attack: Attack;
  



    constructor(x: number, y: number, attack: Attack, name: string, scene: eg.Rendering.Scene2d, spriteImage: eg.Graphics.ImageSource, collisionManager: eg.Collision.CollisionManager) {
       
        this.name = name;


        super(x, y, "MeleeWeapon", scene, spriteImage, collisionManager);
    }

    Update(gameTime: eg.GameTime, position: eg.Vector2d) {
        this.attack.Update(gameTime, position);

    }


}