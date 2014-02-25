class Game extends eg.Game {
    static DEBUG: boolean = false;
    fps: eg.Graphics.Text2d;
    items: Item[];
    players: Player[];
    enemies: Enemy[];

    mapHandler: MapHandler;
   

    constructor() {
        super();
        this.enemies = [];
        this.players = [];
        this.items = [];
        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        this.players.push(new Player(100, 100, ["Up"], ["Down"], ["Left"], ["Right"], this.Input.Keyboard, this.Scene, this.CollisionManager));
        for (var i = 0; i < 50; i++) {
            this.items.push(new Sword((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));
        }
        for (var i = 0; i < 50; i++) {
            this.enemies.push(new BrownSmear((Math.random() * 3000) - 1500, (Math.random() * 3000) - 1500, this.Scene, this.CollisionManager));

        } 
    }

    Update(gameTime: eg.GameTime) {
        for (var i in this.players) {
            this.players[i].Update(gameTime);
        }
        for (var i in this.enemies) {
            this.enemies[i].Update(gameTime, this.players);
        }
        this.updateCanvasSize();
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