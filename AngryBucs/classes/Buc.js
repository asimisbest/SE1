import { Entity } from "./Entity.js";

export class Buc extends Entity {
  constructor(options = {}) {
    super({
      width: 36,
      height: 36,
      health: 999,
      ...options,
    });
    this.ability = options.ability || null;
    this.hasBeenShot = false;
    this._fallbackColor = "#041e42";
    this.physical.mass = 4;
    this.physical.restitution = 0.35;
    this.facingRight = true;
    this.isSplitFragment = false; // true for split projectiles
  }

  useAbility() {
    if (!this.ability || this.ability.used || !this.hasBeenShot) return;
    this.ability.use(this);
  }

  launch(velocity) {
    this.hasBeenShot = true;
    this.physical.velocity = velocity.clone();
    this.facingRight = velocity.x >= 0;
    this.physical.wake();
  }

  update(dt) {
    if (!this.hasBeenShot) return;
    // Update facing direction based on velocity
    if (Math.abs(this.physical.velocity.x) > 5) {
      this.facingRight = this.physical.velocity.x >= 0;
    }
    super.update(dt);
  }

  draw(ctx) {
    const r = this.size.x / 2;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    // Flip horizontally if facing left
    if (!this.facingRight) {
      ctx.scale(-1, 1);
    }

    // Determine colors
    const isYellowBody = this._bodyColor === "#facc15";
    const isRedBody = this._bodyColor === "#dc2626";
    const isBlueBody = this._bodyColor === "#2563eb";
    const bodyColor = this._bodyColor || "#041e42";
    const contrastColor = isYellowBody ? "#041e42" : isRedBody ? "#fff" : isBlueBody ? "#fff" : "#ffc72c";

    // --- Gold/Navy outer glow ring ---
    ctx.beginPath();
    ctx.arc(0, 0, r + 2, 0, Math.PI * 2);
    ctx.strokeStyle = isYellowBody ? "rgba(4,30,66,0.3)" : isRedBody ? "rgba(255,100,0,0.35)" : isBlueBody ? "rgba(100,150,255,0.35)" : "rgba(255,199,44,0.35)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // --- Body ---
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const bodyGrad = ctx.createRadialGradient(-r*0.2, -r*0.2, r*0.1, 0, 0, r);
    if (isRedBody) {
      bodyGrad.addColorStop(0, "#ef4444");
      bodyGrad.addColorStop(1, "#dc2626");
    } else if (isBlueBody) {
      bodyGrad.addColorStop(0, "#3b82f6");
      bodyGrad.addColorStop(1, "#2563eb");
    } else if (isYellowBody) {
      bodyGrad.addColorStop(0, "#fce44d");
      bodyGrad.addColorStop(1, bodyColor);
    } else {
      bodyGrad.addColorStop(0, "#0a2d5c");
      bodyGrad.addColorStop(1, bodyColor);
    }
    ctx.fillStyle = bodyGrad;
    ctx.fill();
    ctx.strokeStyle = contrastColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // --- Pirate Hat ---
    // Hat brim
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.4, r * 1.3, r * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hat dome
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, -r * 0.45);
    ctx.quadraticCurveTo(-r * 0.5, -r * 1.6, 0, -r * 1.5);
    ctx.quadraticCurveTo(r * 0.5, -r * 1.6, r * 0.8, -r * 0.45);
    ctx.fillStyle = "#111";
    ctx.fill();
    
    // Gold hat trim
    ctx.strokeStyle = "#ffc72c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-r * 0.8, -r * 0.45);
    ctx.quadraticCurveTo(0, -r * 0.6, r * 0.8, -r * 0.45);
    ctx.stroke();

    // --- Right Eye (visible) ---
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(r * 0.3, -r * 0.05, r * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(r * 0.35, -r * 0.05, r * 0.11, 0, Math.PI * 2);
    ctx.fill();
    // Glint
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(r * 0.38, -r * 0.08, r * 0.04, 0, Math.PI * 2);
    ctx.fill();

    // --- Left Eye (Eyepatch) ---
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.ellipse(-r * 0.3, -r * 0.05, r * 0.25, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Eyepatch strap
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, -r * 0.15);
    ctx.lineTo(-r * 0.95, -r * 0.35);
    ctx.moveTo(r * 0.1, 0);
    ctx.lineTo(r * 0.9, -r * 0.25);
    ctx.stroke();

    // --- Angry Brow (right eye) ---
    ctx.strokeStyle = contrastColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.3);
    ctx.lineTo(r * 0.55, -r * 0.22);
    ctx.stroke();

    // --- "ETSU" text on body ---
    // Make it prominent and clearly legible
    ctx.fillStyle = contrastColor;
    ctx.strokeStyle = isYellowBody ? "#fff" : "#000";
    ctx.lineWidth = 2;
    ctx.font = `900 ${Math.round(r * 0.6)}px "Impact", "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Adding slight curve or just straight bold text
    ctx.strokeText("ETSU", 0, r * 0.45);
    ctx.fillText("ETSU", 0, r * 0.45);

    ctx.restore();
  }
}