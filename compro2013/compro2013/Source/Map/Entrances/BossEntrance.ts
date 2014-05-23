class BossEntrance extends Entrance {
    sprite: eg.Graphics.Sprite2d;
    //hat: Fancy;

    constructor(position: eg.Vector2d, mapHandler: MapHandler, collisionManager: eg.Collision.CollisionManager, scene: eg.Rendering.Scene2d) {

        this.sprite = new eg.Graphics.Sprite2d(position.X, position.Y, new eg.Graphics.ImageSource("../../../Resources/Images/Locations/teleporter.png", 64, 64), 64,64);
        this.sprite.ZIndex = ZIndexing.Entrance;
        scene.Add(this.sprite);

        super(position, "Source/Map/Maps/OverWorld.json", mapHandler, collisionManager);
        

    }

    Dispose() {
        this.sprite.Dispose();
        super.Dispose();



    }




}