import { Point } from "./Point.js";
import { Size } from "./Size.js";

export interface Rectangle extends Point, Size{
    x:number;
    y:number; 
    width:number;
    height:number;
}

export function union(rect1:Rectangle, rect2:Rectangle):Rectangle{
    let tx2 = rect1.width;
    let ty2 = rect1.height;
    if ((tx2 | ty2) < 0) {
        // This rectangle has negative dimensions...
        // If r has non-negative dimensions then it is the answer.
        // If r is non-existant (has a negative dimension), then both
        // are non-existant and we can return any non-existant rectangle
        // as an answer.  Thus, returning r meets that criterion.
        // Either way, r is our answer.
        return rect2;
    }
    let rx2 = rect2.width;
    let ry2 = rect2.height;
    if ((rx2 | ry2) < 0) {
        return rect1;
    }
    let tx1 = rect1.x;
    let ty1 = rect1.y;
    tx2 += tx1;
    ty2 += ty1;
    const rx1 = rect2.x;
    const ry1 = rect2.y;
    rx2 += rx1;
    ry2 += ry1;
    if (tx1 > rx1) tx1 = rx1;
    if (ty1 > ry1) ty1 = ry1;
    if (tx2 < rx2) tx2 = rx2;
    if (ty2 < ry2) ty2 = ry2;
    tx2 -= tx1;
    ty2 -= ty1;
    return {x:tx1, y:ty1, width:tx2, height:ty2};

}

export function intersects(rect1:Rectangle, rect2:Rectangle):boolean{

    let tw = rect1.width;
    let th = rect1.height;
    let rw = rect2.width;
    let rh = rect2.height;
    if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
        return false;
    }
    const tx = rect1.x;
    const ty = rect1.y;
    const rx = rect2.x;
    const ry = rect2.y;
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
    return point.x >= rect.x && point.x < rect.x + rect.width
        && point.y >= rect.y && point.y < rect.y + rect.height;
}


export function centerPosition(rect:Rectangle): Point{
    return {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
}

export function centerPositionAsInt(rect:Rectangle): Point{
    return {x: Math.round(rect.x + rect.width/2), y: Math.round(rect.y + rect.height/2)};
}