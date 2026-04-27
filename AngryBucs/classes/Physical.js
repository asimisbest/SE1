import { Vector2 } from "./Vector2.js";

export class Physical {
  constructor() {
    this.velocity = new Vector2(0, 0);
    this.forces = new Vector2(0, 0);
    this.mass = 1;
    this.restitution = 0.3;
    this.friction = 1.0;
    this.angularVelocity = 0;
    this.sleepFrames = 0;
    this.isSleeping = false;
  }

  applyForce(force) {
    this.forces = this.forces.add(force);
  }

  calculatePosition(currentPosition, dt) {
    const acceleration = this.forces.scale(1 / this.mass);
    this.velocity = this.velocity.add(acceleration.scale(dt));
    // Framerate-independent drag: only apply light air resistance
    const dragFactor = Math.pow(this.friction, dt);
    this.velocity = this.velocity.scale(dragFactor);

    // Damping: zero out very small velocities to prevent jittering
    if (Math.abs(this.velocity.x) < 2) this.velocity.x = 0;
    if (Math.abs(this.velocity.y) < 2) this.velocity.y = 0;

    // Sleep detection
    if (this.velocity.magnitude() < 3) {
      this.sleepFrames++;
      if (this.sleepFrames > 30) {
        this.isSleeping = true;
        this.velocity = new Vector2(0, 0);
      }
    } else {
      this.sleepFrames = 0;
      this.isSleeping = false;
    }

    const newPosition = currentPosition.add(this.velocity.scale(dt));
    this.forces = new Vector2(0, 0);
    return newPosition;
  }

  wake() {
    this.isSleeping = false;
    this.sleepFrames = 0;
  }

  calculateForces(gravityY, dt) {
    if (this.isSleeping) return 0;
    this.applyForce(new Vector2(0, gravityY * this.mass));
    return this.forces.magnitude();
  }

  calculateRotation(currentRotation, dt) {
    if (Math.abs(this.angularVelocity) > 0.001) {
      this.angularVelocity *= Math.pow(0.2, dt);
      return currentRotation + this.angularVelocity * dt;
    }
    // Only rotate with velocity when actually moving fast enough
    if (this.velocity.magnitude() > 15) {
      return Math.atan2(this.velocity.y, this.velocity.x);
    }
    return currentRotation;
  }

  calculateProperties(canvasPos, canvasBody, addForces) {
    if (addForces) {
      this.applyForce(addForces);
    }
    return {
      position: canvasPos,
      body: canvasBody,
      velocity: this.velocity.clone(),
      speed: this.velocity.magnitude(),
    };
  }

  checkIfMoving() {
    return this.velocity.magnitude() > 0.5;
  }
}