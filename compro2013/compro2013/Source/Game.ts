class Game extends eg.Game {
    static DEBUG: boolean = false;
    fps: eg.Graphics.Text2d;

    
    loadingScreen: LoadingScreen;
    mapHandler: MapHandler;
   

    constructor() {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("Content");
        super(canvas);
        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager, this.Input);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json");
        this.Scene.DrawArea.height = 720;
        this.Scene.DrawArea.width = 1280;
        

       
    }

    Update(gameTime: eg.GameTime) {
        this.mapHandler.Update(gameTime);
        this.updateCanvasSize();
    }

    public updateCanvasSize() {
        var canvas: JQuery = $("#Content");
        canvas.width(window.innerWidth);
        canvas.height(window.innerWidth / 1.777777777777778);

        //if (this.Scene.DrawArea.width !== window.innerWidth) {
        //    var resizeAmmount = (window.innerWidth - this.Scene.DrawArea.width) / 2;
        //    this.Scene.DrawArea.width = window.innerWidth;
        //}
        //if (this.Scene.DrawArea.height !== window.innerHeight) {
        //    var resizeAmmount = (window.innerHeight - this.Scene.DrawArea.height) / 2;
        //    this.Scene.DrawArea.height = window.innerHeight;
        //}

        
    }
} 