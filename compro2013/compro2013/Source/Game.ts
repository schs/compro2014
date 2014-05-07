class Game extends eg.Game {
    static DEBUG: boolean = false;
    fps: eg.Graphics.Text2d;

    
    loadingScreen: LoadingScreen;
    mapHandler: MapHandler;
   

    constructor() {
        super();
        

        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager, this.Input);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json");
        

       
    }

    Update(gameTime: eg.GameTime) {

        if(!this.mapHandler.loadingScreen.loading)
            this.updateCanvasSize();
        this.mapHandler.Update(gameTime);
      
    }

    public updateCanvasSize() {
        if (this.Scene.DrawArea.width !== window.innerWidth) {
            var resizeAmmount = (window.innerWidth - this.Scene.DrawArea.width) / 2;
            this.Scene.DrawArea.width = window.innerWidth;
        }
        if (this.Scene.DrawArea.height !== window.innerHeight) {
            var resizeAmmount = (window.innerHeight - this.Scene.DrawArea.height) / 2;
            this.Scene.DrawArea.height = window.innerHeight;
        }
    }
} 