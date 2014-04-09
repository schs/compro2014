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
        _super.call(this, new eg.Bounds.BoundingRectangle(position, size));
        this.collisionManager.Monitor(this);
    }
    Attack.prototype.Execute = function () {
        this.attacking = true;
    };

    Attack.prototype.Collided = function (data) {
        var collider = data.With;
        if (collider.collisionType == CollisionType.Enemy && this.attacking) {
            (collider).TakeDamage(this.damage);
        }
    };

    Attack.prototype.Update = function (gameTime, position) {
        this.Bounds.Position = position.Clone();
    };
    return Attack;
})(eg.Collision.Collidable);
//# sourceMappingURL=Attack.js.map
