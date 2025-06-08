import { Vector } from "./Vector.js";

export class PolarVector {
    private readonly _speed: number;
    private readonly _angle: number; // in radians

    constructor(speed: number, angle: number) {
        this._speed = speed;
        this._angle = angle;
    }

    get speed(): number {
        return this._speed;
    }
    get angle(): number {
        return this._angle;
    }
    add(other: PolarVector): PolarVector {
        const x1 = this.speed * Math.cos(this.angle);
        const y1 = this.speed * Math.sin(this.angle);
        const x2 = other.speed * Math.cos(other.angle);
        const y2 = other.speed * Math.sin(other.angle); 
        const newX = x1 + x2;
        const newY = y1 + y2;
        const newSpeed = Math.hypot(newX, newY);
        const newAngle = Math.atan2(newY, newX);
        return new PolarVector(newSpeed, newAngle);
    }
    toVector(): Vector {
        return new Vector(
             this.speed * Math.cos(this.angle), 
             this.speed * Math.sin(this.angle)
        );
    }

    dotProduct(other: PolarVector): number {
        return this.speed * other.speed * Math.cos(this.angle - other.angle);
    }
    
    withSpeed(speed: number): PolarVector {
        return new PolarVector(speed, this.angle);
    }
    
    withAngle(angle: number): PolarVector {
        return new PolarVector(this.speed, angle);
    }
}