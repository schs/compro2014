class Entrance extends eg.Collision.Collidable {
    sprite: eg.Graphics.Sprite2d;
    imageSource: eg.Graphics.ImageSource;
    mapHandler: MapHandler;
    constructor(mapHandler: MapHandler) {
        mapHandler: MapHandler;
        this.imageSource = new eg.Graphics.ImageSource("/images/Shop.png", 64, 64);
        this.sprite = new eg.Graphics.Sprite2d(64, 64, this.imageSource);
        super(this.sprite.GetDrawBounds());


    }

    Collided(data: eg.Collision.CollisionData) {
        this.mapHandler.load("/Source/Map/Maps/OverWorld.json", this.mapLoaded.bind(this));


    }

    mapLoaded() {

    }



}