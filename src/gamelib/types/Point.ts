export interface Point{
    x:number;
    y:number;
}

export function pointAsInt(point:Point): Point{
    return {x:Math.round(point.x), y:Math.round(point.y)};
}

export function calcDistance(a:Point, b:Point):number{
        const xDist = Math.abs(a.x - b.x);
        const yDist = Math.abs(a.y - b.y);
        return Math.hypot(xDist, yDist);
}