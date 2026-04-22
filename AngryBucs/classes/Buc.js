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
  }

  useAbility() {
    if (!this.ability || this.ability.used || !this.hasBeenShot) return;
    this.ability.use(this);
  }

  launch(velocity) {
    this.hasBeenShot = true;
    this.physical.velocity = velocity.clone();
  }

  update(dt) {
    if (!this.hasBeenShot) return;
    super.update(dt);
  }

  draw(ctx) {
    const r = this.size.x / 2;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    // --- "BUCKY" label above (doesn't rotate) ---
    ctx.save();
    ctx.fillStyle = "#ffc72c";
    ctx.strokeStyle = "#041e42";
    ctx.lineWidth = 3;
    ctx.font = `bold ${Math.round(r * 0.55)}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.strokeText("BUCKY", 0, -r - r * 0.8);
    ctx.fillText("BUCKY", 0, -r - r * 0.8);
    ctx.restore();

    ctx.rotate(this.rotation);

    // Determine colors
    const isYellowBody = this._bodyColor === "#facc15";
    const bodyColor = this._bodyColor || "#041e42";
    const contrastColor = isYellowBody ? "#041e42" : "#ffc72c"; // Navy text for yellow buc, Gold for navy buc

    // --- Gold/Navy outer glow ring ---
    ctx.beginPath();
    ctx.arc(0, 0, r + 2, 0, Math.PI * 2);
    ctx.strokeStyle = isYellowBody ? "rgba(4,30,66,0.3)" : "rgba(255,199,44,0.35)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // --- Body ---
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    const bodyGrad = ctx.createRadialGradient(-r*0.2, -r*0.2, r*0.1, 0, 0, r);
    bodyGrad.addColorStop(0, isYellowBody ? "#fce44d" : "#0a2d5c");
    bodyGrad.addColorStop(1, bodyColor);
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