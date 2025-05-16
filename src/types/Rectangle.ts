import { Point } from "./Point";
import { Size } from "./Size";

export interface Rectangle{
    position:Point;
    size:Size;

}

export function union(rect1:Rectangle, rect2:Rectangle):Rectangle{
    let tx2 = rect1.size.width;
    let ty2 = rect1.size.height;
    if ((tx2 | ty2) < 0) {
        // This rectangle has negative dimensions...
        // If r has non-negative dimensions then it is the answer.
        // If r is non-existant (has a negative dimension), then both
        // are non-existant and we can return any non-existant rectangle
        // as an answer.  Thus, returning r meets that criterion.
        // Either way, r is our answer.
        return rect2;
    }
    let rx2 = rect2.size.width;
    let ry2 = rect2.size.height;
    if ((rx2 | ry2) < 0) {
        return rect1;
    }
    let tx1 = rect1.position.x;
    let ty1 = rect1.position.y;
    tx2 += tx1;
    ty2 += ty1;
    const rx1 = rect2.position.x;
    const ry1 = rect2.position.y;
    rx2 += rx1;
    ry2 += ry1;
    if (tx1 > rx1) tx1 = rx1;
    if (ty1 > ry1) ty1 = ry1;
    if (tx2 < rx2) tx2 = rx2;
    if (ty2 < ry2) ty2 = ry2;
    tx2 -= tx1;
    ty2 -= ty1;
    return { position:{x:tx1, y:ty1},size:{width:tx2, height:ty2}};

}

export function intersects(rect1:Rectangle, rect2:Rectangle):boolean{

    let tw = rect1.size.width;
    let th = rect1.size.height;
    let rw = rect2.size.width;
    let rh = rect2.size.height;
    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
        return false;
    }
    const tx = rect1.position.x;
    const ty = rect1.position.y;
    const rx = rect2.position.x;
    const ry = rect2.position.y;
    rw += rx;
    rh += ry;
    tw += tx;
    th += ty;
    //      overflow || intersect
    return ((rw < rx || rw > tx) &&
            (rh < ry || rh > ty) &&
            (tw < tx || tw > rx) &&
            (th < ty || th > ry));
}

export function pointInRect(point:Point, rect:Rectangle):boolean{
    return point.x >= rect.position.x && point.x < rect.position.x + rect.size.width
        && point.y >= rect.position.y && point.y < rect.position.y + rect.size.height;
}


export function centerPosition(rect:Rectangle): Point{
    return {x: rect.position.x + rect.size.width/2, y: rect.position.y + rect.size.height/2};
}

export function centerPositionAsInt(rect:Rectangle): Point{
    return {x: Math.round(rect.position.x + rect.size.width/2), y: Math.round(rect.position.y + rect.size.height/2)};
}