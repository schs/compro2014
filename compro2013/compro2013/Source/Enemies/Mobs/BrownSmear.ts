class BrownSmear extends Enemies implements eg.IUpdateable {

    

    constructor(x: number, y: number, scene: eg.Rendering.Scene2d) {



        super(100, 100, 100, 1, 1, new eg.Graphics.ImageSource("/images/BrownSmear.png", 100, 100), scene)

    }


} 