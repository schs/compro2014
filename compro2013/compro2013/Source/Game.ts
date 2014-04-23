class Game extends eg.Game {
    static DEBUG: boolean = false;
    fps: eg.Graphics.Text2d;
    items: Item[];
    players: Player[];
    
    loadingScreen: LoadingScreen;
    mapHandler: MapHandler;
   

    constructor() {
        super();
        
        this.players = [];
        this.items = [];
        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json");
        this.players.push(new Player(100, 100, ["Up", "W"], ["Down", "S"], ["Left", "A"], ["Right", "D"], this.Input, this.Scene, this.CollisionManager));

           
        for (var i = 0; i < 50; i++) {
            this.items.push(new Axe((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }
        for (var i = 0; i < 50; i++) {
            this.items.push(new Sword((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }
        for (var i = 0; i < 50; i++) {
            this.items.push(new Crossbow((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }
        for (var i = 0; i < 50; i++) {
            this.items.push(new BattleAxe((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }
        for (var i = 0; i < 50; i++) {
            this.items.push(new Lightsaber((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }

       
    }

    Update(gameTime: eg.GameTime) {

        for (var i in this.players) {
            this.players[i].Update(gameTime);
        }
        if(this.mapHandler.loadingScreen.loading = true){
                for (var i in this.mapHandler.enemies) {
                this.mapHandler.enemies[i].Update(gameTime, this.players);
            }
        }   
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