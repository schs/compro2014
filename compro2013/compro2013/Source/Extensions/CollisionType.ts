class CollisionType {
    private static types = {
        wall: true,
        item: true,
        enemy: true,
        player: true,
        projectile: true                        
    }

    public static Wall(): CollisionType {
        return this.types.wall;
    }
    public static Item(): CollisionType {
        return this.types.item;
    }
    public static Enemy(): CollisionType {
        return this.types.enemy;
    }
    public static Player(): CollisionType {
        return this.types.player;
    }
    public static Projectile(): CollisionType {
        return this.types.projectile;
    }
} 