class Sword extends MeleeWeapon {
    
    constructor(x: number, y: number, scene: eg.Rendering.Scene2d, damage: number, sprite: eg.Graphics.ImageSource) {
        
        super(x,y,50,"Sword", scene, new eg.Graphics.ImageSource("/Images/Items/Weapons/Sword.png", 64, 64));

    }
}