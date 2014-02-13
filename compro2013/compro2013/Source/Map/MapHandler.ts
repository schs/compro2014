class MapHandler {
    private mapLayers: eg.Graphics.SquareTileMap[];
    private Scene: eg.Rendering.Scene2d
    private collisionManager: eg.Collision.CollisionManager;
    private propertyHooks: eg.MapLoaders.IPropertyHooks;

    private walls: Wall[];

    constructor(Scene: eg.Rendering.Scene2d, collisionManager: eg.Collision.CollisionManager) {
        this.mapLayers = new Array<eg.Graphics.SquareTileMap>();
        this.Scene = Scene;
        this.collisionManager = collisionManager;
        this.walls = new Array();

        this.propertyHooks = {
            ResourceTileHooks: {},
            ResourceSheetHooks: { "impassable": this.createCollisionMap.bind(this)  },
            LayerHooks: {}
        };

    }

    public load(url: string, loadComplete: () => void): void {
        $.getJSON(url, (mapJson) => {
            var preloadInfo = eg.MapLoaders.JSONLoader.Load(mapJson,
                (result: eg.MapLoaders.IMapLoadedResult) => {
                    this.loadLayers((<eg.Graphics.SquareTileMap[]>result.Layers))
                    loadComplete();
                }, this.propertyHooks);
        }).fail((d, textStatus, error) => {
                console.error("getJSON failed, status: " + textStatus + ", error: " + error)
        });
    }

    public loadComplete() {
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

    private createCollisionMap(details){
        var tile: eg.Graphics.Sprite2d = details.Tile;
        //create collision boxes for tiles that are not passable
        this.walls.push(new Wall(tile.Position, tile.Size.Subtract(1), this.Scene, this.collisionManager));
    }

}