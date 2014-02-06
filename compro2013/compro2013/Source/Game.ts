interface properties extends eg.MapLoaders.IPropertyHooks {

}
class Game extends eg.Game {
    player: Player;
    mapHandler: MapHandler;



    constructor() {
        super();

        this.mapHandler = new MapHandler(this.Scene);
        this.mapHandler.load("/Source/Map/Maps/TestMap.json", this.mapHandler.loadComplete);
        

    }

    Update(gameTime: eg.GameTime) {
       
    }


} 