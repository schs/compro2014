class SwingAttack extends Attack {
    


    constructor(damage: number, knockback: number) {

        super(new eg.Vector2d(27, 27), new eg.Size2d(64, 25), damage, knockback);

    }


}