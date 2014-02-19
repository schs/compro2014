class BrownSmear extends Enemies implements eg.IUpdateable {

    

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d) {
        super(100, 100, 100, x, y, new eg.Graphics.ImageSource("/Resources/Images/Enemies/BrownSmear.png", 64, 64), scene)

    }


} 