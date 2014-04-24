var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Attack = (function (_super) {
    __extends(Attack, _super);
    function Attack(position, size, damage, knockback, collisionManager) {
        this.knockback = knockback;
        this.damage = damage;
        this.collisionManager = collisionManager;
        this.shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height, new eg.Graphics.Color(10, 10, 10, .3));
        _super.call(this, new eg.Bounds.BoundingRectangle(position, size));
        this.collisionManager.Monitor(this);
        this.shape.ZIndex = 10;
        this.attackRotation = 0;
        this.attackPosition = new eg.Vector2d(0, 0);
    }
    Attack.prototype.Execute = function (weapon) {
        this.attacking = true;
        this.attackRotation = -1.5;
    };

    Attack.prototype.Collided = function (data) {
        var collider = data.With;
        if (collider.collisionType == 2 /* Enemy */ && this.attacking) {
            collider.TakeDamage(this.damage, this.knockback);
        }
    };

    Attack.prototype.Update = function (gameTime, position, rotation, sprite) {
        if (this.attacking) {
            this.attackRotation += .55;
        } else {
            this.attackRotation = 0;
        }
        this.Bounds.Position = position;
        this.Bounds.Rotation = rotation;
        this.shape.Position = this.Bounds.Position;
        this.shape.Rotation = this.Bounds.Rotation;
    };
    return Attack;
})(eg.Collision.Collidable);
//# sourceMappingURL=Attack.js.map
