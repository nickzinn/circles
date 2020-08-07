import { Point } from "./Point";

export interface Vector{
    speed:number;
    angle:number;
}

export function vectorToXYSpeed(vector:Vector): Point{
    if(vector.speed !== undefined && vector.angle !== undefined)
        return {x: vector.speed * Math.cos(vector.angle), y: vector.speed * Math.sin(vector.angle)};
    else return {x:0,y:0};
}

export function xySpeedToVector(xy:Point):Vector{
    return {angle:Math.atan2(xy.y, xy.x), speed:Math.hypot(xy.x, xy.y)};
}

export function addVectors(vector1:Vector, vector2:Vector): Vector{
    const speed1 = vectorToXYSpeed(vector1);
    const speed2 = vectorToXYSpeed(vector2);
    return xySpeedToVector({x: speed1.x + speed2.x, y: speed1.y + speed2.y});
}