import { PolarVector } from "./PolarVector";

export class Vector {
  // Private readonly properties for immutability
  private readonly _x: number;
  private readonly _y: number;

  /**
   * Creates a new Vector instance
   * @param x - The x coordinate
   * @param y - The y coordinate
   */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  // Getters for accessing coordinates
  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  /**
   * Adds this vector with another vector
   * @param other - The vector to add
   * @returns A new Vector representing the sum
   */
  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtracts another vector from this vector
   * @param other - The vector to subtract
   * @returns A new Vector representing the difference
   */
  subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  /**
   * Calculates the dot product with another vector
   * @param other - The vector to calculate dot product with
   * @returns The dot product value
   */
  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Scales this vector by a factor
   * @param scalar - The scaling factor
   * @returns A new scaled Vector
   */
  scale(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  /**
   * Calculates the magnitude (length) of this vector
   * @returns The magnitude value
   */
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Creates a normalized version of this vector (unit vector)
   * @returns A new normalized Vector
   * @throws Error if vector has zero magnitude
   */
  normalize(): Vector {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize a zero vector");
    }
    return new Vector(this.x / mag, this.y / mag);
  }

    /**
     * Converts this vector to a PolarVector representation
     * @returns A new PolarVector instance
     */ 
    toPolar(): PolarVector {
        return new PolarVector(this.magnitude(), Math.atan2(this.y, this.x));
    }
  
  rotate(theta:number):Vector {
    return new Vector(
        this.x * Math.cos(theta) - this.y * Math.sin(theta), 
        this.x * Math.sin(theta) + this.y * Math.cos(theta)
    );
  }

  /**
   * Creates a string representation of the vector
   * @returns String in format "Vector(x, y)"
   */
  toString(): string {
    return `Vector(${this.x}, ${this.y})`;
  }
}