class Game extends eg.Game {
    static DEBUG: boolean = true;

    player: Player;
    mapHandler: MapHandler;

    constructor() {
        super();

        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        this.player = new Player(0,0 , ["Up"], ["Down"], ["Left"], ["Right"], this.Input.Keyboard, this.Scene);

    }

    Update(gameTime: eg.GameTime) {
        if (this.player.movementController)
        this.Scene.Camera.Position = this.player.movementController.Position.Clone();
    }


} 