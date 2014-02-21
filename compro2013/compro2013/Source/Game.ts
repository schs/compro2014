class Game extends eg.Game {
    static DEBUG: boolean = true;
    fps: eg.Graphics.Text2d;
    items: Item[];
    player: Player;
    testEnemy: Enemy;

    mapHandler: MapHandler;
   

    constructor() {
        super();
        this.Scene.DrawArea.style.backgroundColor = "black";
        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        this.player = new Player(100, 100, ["Up"], ["Down"], ["Left"], ["Right"], this.Input.Keyboard, this.Scene, this.CollisionManager);
        this.testEnemy = new BrownSmear(50, 50, this.Scene, this.CollisionManager); 

    }

    Update(gameTime: eg.GameTime) {
        this.player.Update(gameTime);
    }

} 