
export interface Point{
    x:number;
    y:number;
}

export function pointAsInt(point:Point): Point{
    return {x:Math.round(point.x), y:Math.round(point.y)};
}