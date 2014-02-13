class Game extends eg.Game {
    static DEBUG: boolean = true;

    player: Player;
    mapHandler: MapHandler;

    constructor() {
        super();

        this.mapHandler = new MapHandler(this.Scene, this.CollisionManager);
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapHandler.loadComplete);
        

    }

    Update(gameTime: eg.GameTime) {
       
    }


} 