class MapHandler {
    private mapLayers: eg.Graphics.SquareTileMap[];
    private Scene: eg.Rendering.Scene2d
    private collisionManager: eg.Collision.CollisionManager;
    private propertyHooks: eg.MapLoaders.IPropertyHooks;
    enemies: Enemy[];
    loadingScreen: LoadingScreen;
    zone: string;
    players: Player[];
    items: Item[];
    public entrances: Entrance[];
    public walls: Wall[];
    input: eg.Input.InputManager;

    

    constructor(Scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager, input: eg.Input.InputManager) {
        this.mapLayers = new Array<eg.Graphics.SquareTileMap>();
        this.Scene = Scene;
        this.collisionManager = collisionManager;
        this.enemies = [];
        this.players = [];
        this.items = [];
        this.walls = new Array();
        this.entrances = new Array();
        this.input = input;
        this.propertyHooks = {
            ResourceTileHooks: { "entrance": this.createEntrance.bind(this), "spawn": this.spawn.bind(this)  },
            ResourceSheetHooks: { "impassable": this.createCollisionMap.bind(this)  },
            LayerHooks: {}
        };
        
        this.loadingScreen = new LoadingScreen(this.Scene);

    }

    public mapLoadTick(percent: number) {
        this.loadingScreen.tick(percent);
    }
    
    public load(url: string): void {
        
        $.getJSON(url, (mapJson) => {
            var preloadInfo = eg.MapLoaders.JSONLoader.Load(mapJson,
                (result: eg.MapLoaders.IMapLoadedResult) => {
                    this.loadLayers((<eg.Graphics.SquareTileMap[]>result.Layers))
                    this.loadComplete();
                }, this.propertyHooks);
            preloadInfo.OnPercentLoaded.Bind(this.mapLoadTick.bind(this));
        }).fail((d, textStatus, error) => {
                console.error("getJSON failed, status: " + textStatus + ", error: " + error)
        });
    }

    public loadComplete() {
        this.loadingScreen.clearScreen();
    }

    public loadNewMap(url: string) {
        this.loadingScreen.StartLoad();
        this.unloadMap();
        this.load(url);;
    }

    public unloadMap() {
        for (var i in this.walls) {
            this.walls[i].Dispose();
        }
        for (var i in this.entrances) {
            this.entrances[i].Dispose;
        }
        for (var i in this.mapLayers) {
            this.mapLayers[i].Dispose();
        }
        while (this.enemies.length > 0) {
            this.enemies[this.enemies.length-1].Dispose();
        }
        while (this.items.length > 0) {
            this.items[this.items.length - 1].Dispose();
        }

        this.enemies = [];
        this.walls = [];
        this.entrances = [];
        this.mapLayers = [];
        this.items = [];
        
    }

    private loadLayers(layers: eg.Graphics.SquareTileMap[]): void {
        // Clear all existing layers (so we can click more than once)
        for (var i = 0; i < this.mapLayers.length; i++) {
            this.Scene.Remove(this.mapLayers[i]);
        }

        if (layers) {
            this.mapLayers = layers;
        }

        // Add all of the layers to the scenery (so they're drawn)
        for (var i = 0; i < this.mapLayers.length; i++) {
            this.Scene.Add(this.mapLayers[i]);
        }

        // Update the camera to be in the middle of the map
        if (this.mapLayers.length > 0) {
            this.Scene.Camera.Position = this.mapLayers[0].Position;
        }
    }

    private createCollisionMap(details: eg.Graphics.Assets.ITileDetails, propertyValue: string){
        var tile: eg.Graphics.Sprite2d = details.Tile;
        //create collision boxes for tiles that are not passable
        this.walls.push(new Wall(tile.Position, tile.Size.Subtract(1), this.Scene, this.collisionManager));
    }
    private createEntrance(details: eg.Graphics.Assets.ITileDetails, propertyValue: string) {
        var tile: eg.Graphics.Sprite2d = details.Tile;
        if (propertyValue == "Store") {
            this.entrances.push(new Entrance(tile.Position, "/Source/Map/Maps/Store.json", this, this.collisionManager));
        }
        if (propertyValue == "OverWorld") {
            this.entrances.push(new Entrance(tile.Position, "/Source/Map/Maps/OverWorld.json", this, this.collisionManager));
        }
        if (propertyValue == "Dungeon01") {
            this.entrances.push(new Entrance(tile.Position, "/Source/Map/Maps/Dungeon01.json", this, this.collisionManager));
        }
        if (propertyValue == "Dungeon03") {
            this.entrances.push(new Entrance(tile.Position, "/Source/Map/Maps/Dungeon04.json", this, this.collisionManager));
        }

    }

    private spawn(details: eg.Graphics.Assets.ITileDetails, propertyValue: string) {
        var tile: eg.Graphics.Sprite2d = details.Tile;
        if (propertyValue == "BrownSmear") {
            if(Math.random() > .95)
            this.enemies.push(new BrownSmear(tile.Position.X, tile.Position.Y, this.Scene, this.collisionManager, this.enemies, this.items));
        }
        if (propertyValue == "Landipus") {
            if (Math.random() > .95)
                this.enemies.push(new Landipus(tile.Position.X, tile.Position.Y, this.Scene, this.collisionManager, this.enemies, this.items));
        }
        if (propertyValue == "CarlTheSnake") {
            if (Math.random() > .95)
                this.enemies.push(new CarlTheSnake(tile.Position.X, tile.Position.Y, this.Scene, this.collisionManager, this.enemies, this.items));
        }
        if (propertyValue == "Slug") {
            if (Math.random() > .95)
                this.enemies.push(new Slug(tile.Position.X, tile.Position.Y, this.Scene, this.collisionManager, this.enemies, this.items));
        }
        if(propertyValue == "Player") {
            if (this.players.length > 0) {
                this.players[0].movementController.Position = tile.Position.Clone();
            }
            else {
                this.players.push(new Player(tile.Position.X, tile.Position.Y, ["Up", "W"], ["Down", "S"], ["Left", "A"], ["Right", "D"], this.input, this.Scene, this.collisionManager, this.items));

            }

        }
    }

    public Update(gameTime: eg.GameTime) {
        
        this.loadingScreen.Update(gameTime);
        
        if (!this.loadingScreen.loading) {

            for (var index in this.players) {
                this.players[index].Update(gameTime);
            }

            for (var i in this.enemies) {
                this.enemies[i].Update(gameTime, this.players);



            }
        } 



        
    }


}