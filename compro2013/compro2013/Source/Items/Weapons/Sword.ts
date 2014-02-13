class Sword extends MeleeWeapon {
    
    constructor(scene: eg.Rendering.Scene2d) {
        //Added melee weapon class, set the damage for this weapon through the super call to the MeleeWeapon class.
        this.sprite // new eg.spite Thien making art
        super("Sword", scene, this.sprite, 10);
        this.scene.Add(this.sprite);
    }

    collision() {

    }

    Update(gameTime: eg.GameTime) {

    }








}