class Sword extends MeleeWeapon {
    
    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, items: Item[]) {
        
        super(x, y, 25, 10, "Sword", scene, new eg.Graphics.ImageSource("../../../Resources/Images/Items/Weapons/Sword.png", 64, 64), collisionManager, items);

    }





}