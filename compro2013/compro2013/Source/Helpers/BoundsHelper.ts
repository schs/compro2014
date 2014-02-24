class BoundsHelper {
    public static GetIntersectionDepth(boundsA: eg.Bounds.Bounds2d, boundsB: eg.Bounds.Bounds2d): eg.Vector2d {
        // Calcualte half sizes
        if (boundsA._type == "BoundingRectangle" && boundsB._type == "BoundingRectangle") {
            var halfA: eg.Vector2d = new eg.Vector2d((<eg.Bounds.BoundingRectangle>boundsA).Size.HalfWidth, (<eg.Bounds.BoundingRectangle>boundsA).Size.HalfHeight);
            var halfB: eg.Vector2d = new eg.Vector2d((<eg.Bounds.BoundingRectangle>boundsB).Size.HalfWidth, (<eg.Bounds.BoundingRectangle>boundsB).Size.HalfHeight);

            // Calculate centers

            var centA: eg.Vector2d = boundsA.Position.Clone();
            var centB: eg.Vector2d = boundsB.Position.Clone();

                // Calculate current and minimum-non-intersecting distances between centers
            var interDisX: number = centA.X - centB.X;
            var interDisY: number = centA.Y - centB.Y;
            var minNonIntDisX: number = halfA.X + halfB.X;
            var minNonIntDisY: number = halfA.Y + halfB.Y;


            // If we are not intersecting at all, return (0, 0)
            if (Math.abs(interDisX) >= minNonIntDisX || Math.abs(interDisY) >= minNonIntDisY) {
                return new eg.Vector2d(0,0);
            }


                //Calculate and return interection depths
            
            var depthX: number = interDisX > 0 ? minNonIntDisX - interDisX : -minNonIntDisX - interDisX;
            var depthY: number = interDisY > 0 ? minNonIntDisY - interDisY : -minNonIntDisY - interDisY;
            return new eg.Vector2d(depthX, depthY);
        }
    }

    public static PythagoreanTheorem(X: number, Y: number): number {
        var absX: number = Math.abs(X);
        var absY: number = Math.abs(Y);
        var left = (absX * absX) + (absY * absY);
        return Math.sqrt(left);
    }
} 