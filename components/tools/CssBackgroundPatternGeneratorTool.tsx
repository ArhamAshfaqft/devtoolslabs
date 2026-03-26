"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Types ---
type EffectType = 'particles' | 'gradient-mesh' | 'waves' | 'geometric' | 'aurora' | 'flow-field' | 'matrix' | 'constellation';

interface EffectConfig {
  // Shared
  colorA: string;
  colorB: string;
  colorC: string;
  bgColor: string;
  speed: number;
  density: number;
  // Particles
  lineOpacity: number;
  // Waves
  layers: number;
  // Geometric
  cellSize: number;
}

// --- Utility Functions ---
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const lerpColor = (a: string, b: string, t: number) => {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  return `rgb(${r},${g},${bl})`;
};

// --- Color Palette Presets ---
const PALETTES = [
  { name: 'Ocean', colors: ['#0f0c29', '#302b63', '#24243e'] },
  { name: 'Sunset', colors: ['#ee9ca7', '#ffdde1', '#fc5c7d'] },
  { name: 'Forest', colors: ['#134e5e', '#71b280', '#0b8457'] },
  { name: 'Neon', colors: ['#0f0f23', '#ff006e', '#8338ec'] },
  { name: 'Arctic', colors: ['#e0eafc', '#cfdef3', '#a1c4fd'] },
  { name: 'Lava', colors: ['#f12711', '#f5af19', '#200122'] },
  { name: 'Midnight', colors: ['#0f2027', '#203a43', '#2c5364'] },
  { name: 'Candy', colors: ['#f093fb', '#f5576c', '#4facfe'] },
];

// --- Effect Descriptions ---
const EFFECT_INFO: Record<EffectType, { label: string; desc: string }> = {
  'particles': { label: 'Particles', desc: 'Interactive connected nodes' },
  'flow-field': { label: 'Flow Field', desc: 'Mouse-reactive particle streams' },
  'constellation': { label: 'Constellation', desc: 'Stars connect near cursor' },
  'matrix': { label: 'Matrix Rain', desc: 'Falling code with mouse glow' },
  'gradient-mesh': { label: 'Gradient Mesh', desc: 'Animated blob gradients' },
  'waves': { label: 'Waves', desc: 'Layered SVG wave shapes' },
  'geometric': { label: 'Geometric', desc: 'Triangulated polygon mesh' },
  'aurora': { label: 'Aurora', desc: 'Smooth flowing light bands' },
};

// ========== PARTICLE ENGINE ==========
function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: EffectConfig,
  isActive: boolean
) {
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const count = Math.floor(config.density * 1.5);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.speed * 0.5,
      vy: (Math.random() - 0.5) * config.speed * 0.5,
      r: Math.random() * 2 + 1,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Background
      const bgRgb = hexToRgb(config.bgColor);
      ctx.fillStyle = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const maxDist = 120;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }

        // Draw dot
        const colorA = hexToRgb(config.colorA);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorA.r},${colorA.g},${colorA.b},0.8)`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < maxDist) {
            const colorB = hexToRgb(config.colorB);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${colorB.r},${colorB.g},${colorB.b},${(1 - d / maxDist) * config.lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive, config, canvasRef]);
}

// ========== GEOMETRIC MESH ENGINE ==========
function useGeometricCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: EffectConfig,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cellSize = config.cellSize;

    // Background
    const bgRgb = hexToRgb(config.bgColor);
    ctx.fillStyle = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
    ctx.fillRect(0, 0, w, h);

    // Generate jittered grid points
    const points: [number, number][] = [];
    for (let x = -cellSize; x < w + cellSize * 2; x += cellSize) {
      for (let y = -cellSize; y < h + cellSize * 2; y += cellSize) {
        const jx = x + (Math.random() - 0.5) * cellSize * 0.8;
        const jy = y + (Math.random() - 0.5) * cellSize * 0.8;
        points.push([jx, jy]);
      }
    }

    // Simple Delaunay-like triangulation via nearest neighbors
    // We'll use a grid-based approach for simplicity
    const cols = Math.ceil(w / cellSize) + 3;
    const rows = Math.ceil(h / cellSize) + 3;

    for (let i = 0; i < cols - 1; i++) {
      for (let j = 0; j < rows - 1; j++) {
        const idx = i * rows + j;
        const a = points[idx];
        const b = points[idx + 1];
        const c = points[idx + rows];
        const d = points[idx + rows + 1];

        if (a && b && c && d) {
          // Triangle 1
          const t1 = ((a[0] + b[0] + c[0]) / 3) / w;
          const color1 = lerpColor(config.colorA, config.colorB, t1 + Math.random() * 0.15);
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.lineTo(c[0], c[1]);
          ctx.closePath();
          ctx.fillStyle = color1;
          ctx.fill();
          ctx.strokeStyle = color1;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Triangle 2
          const t2 = ((b[0] + c[0] + d[0]) / 3) / w;
          const color2 = lerpColor(config.colorB, config.colorC, t2 + Math.random() * 0.15);
          ctx.beginPath();
          ctx.moveTo(b[0], b[1]);
          ctx.lineTo(c[0], c[1]);
          ctx.lineTo(d[0], d[1]);
          ctx.closePath();
          ctx.fillStyle = color2;
          ctx.fill();
          ctx.strokeStyle = color2;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }, [isActive, config, canvasRef]);
}

// ========== FLOW FIELD ENGINE ==========
function useFlowFieldCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: EffectConfig,
  isActive: boolean
) {
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = 2;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Simple noise function
    const noise = (x: number, y: number, t: number) => {
      return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t) + Math.sin((x + y) * 0.005 + t * 0.5);
    };

    const count = Math.floor(config.density * 3);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      life: Math.random() * 100,
    }));

    let time = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const bgRgb = hexToRgb(config.bgColor);

    const draw = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},0.05)`;
      ctx.fillRect(0, 0, w, h);

      time += 0.01 * config.speed;
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Mouse influence
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < 150 ? (1 - dist / 150) * 3 : 0;

        const angle = noise(p.x, p.y, time) * Math.PI * 2 + (mouseInfluence > 0 ? Math.atan2(dy, dx) * mouseInfluence : 0);
        const speed = config.speed * 0.8;

        p.x += Math.cos(angle) * speed;
        p.y += Math.sin(angle) * speed;
        p.life -= 0.3;

        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life <= 0) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.life = 80 + Math.random() * 40;
        }

        const t = (p.x / w + p.y / h) / 2;
        const color = lerpColor(config.colorA, config.colorB, t);
        const rgb = hexToRgb(color.replace('rgb(', '#').replace(')', ''));
        const alpha = Math.min(p.life / 40, 1) * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb?.r || 100},${rgb?.g || 100},${rgb?.b || 255},${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Initial fill
    ctx.fillStyle = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
    ctx.fillRect(0, 0, w, h);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive, config, canvasRef]);
}

// ========== MATRIX RAIN ENGINE ==========
function useMatrixCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: EffectConfig,
  isActive: boolean
) {
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const fontSize = 14;
    const cols = Math.ceil(w / fontSize);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -100);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|/<>~`';

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const colorRgb = hexToRgb(config.colorA);
    const glowRgb = hexToRgb(config.colorB);
    const bgRgb = hexToRgb(config.bgColor);

    const draw = () => {
      ctx.fillStyle = `rgba(${bgRgb.r},${bgRgb.g},${bgRgb.b},0.06)`;
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const char = chars[Math.floor(Math.random() * chars.length)];

        // Mouse glow effect
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glowFactor = dist < 120 ? (1 - dist / 120) : 0;

        if (glowFactor > 0.1) {
          ctx.font = `bold ${fontSize + 2}px monospace`;
          ctx.fillStyle = `rgba(${glowRgb.r},${glowRgb.g},${glowRgb.b},${0.8 + glowFactor * 0.2})`;
          ctx.shadowBlur = 15 * glowFactor;
          ctx.shadowColor = config.colorB;
        } else {
          ctx.font = `${fontSize}px monospace`;
          ctx.fillStyle = `rgba(${colorRgb.r},${colorRgb.g},${colorRgb.b},${0.6 + Math.random() * 0.3})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += config.speed * 0.5;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    ctx.fillStyle = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
    ctx.fillRect(0, 0, w, h);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive, config, canvasRef]);
}

// ========== CONSTELLATION ENGINE ==========
function useConstellationCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: EffectConfig,
  isActive: boolean
) {
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = 2;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const count = Math.floor(config.density * 2);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * config.speed * 0.15,
      vy: (Math.random() - 0.5) * config.speed * 0.15,
      brightness: Math.random(),
      pulseSpeed: 0.005 + Math.random() * 0.02,
      pulsePhase: Math.random() * Math.PI * 2,
      size: 0.5 + Math.random() * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    let frame = 0;
    const draw = () => {
      frame++;
      const bgRgb = hexToRgb(config.bgColor);
      ctx.fillStyle = `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`;
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const connRadius = 180; // Connection radius near mouse
      const starColor = hexToRgb(config.colorA);
      const lineColor = hexToRgb(config.colorB);
      const glowColor = hexToRgb(config.colorC);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > w) s.vx *= -1;
        if (s.y < 0 || s.y > h) s.vy *= -1;
        s.brightness = 0.4 + Math.sin(frame * s.pulseSpeed + s.pulsePhase) * 0.3;
      }

      // Draw connections near mouse
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        const dxa = a.x - mouse.x;
        const dya = a.y - mouse.y;
        const distA = Math.sqrt(dxa * dxa + dya * dya);

        if (distA < connRadius) {
          for (let j = i + 1; j < stars.length; j++) {
            const b = stars[j];
            const dxb = b.x - mouse.x;
            const dyb = b.y - mouse.y;
            const distB = Math.sqrt(dxb * dxb + dyb * dyb);

            if (distB < connRadius) {
              const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
              if (d < connRadius * 0.8) {
                const alpha = (1 - d / (connRadius * 0.8)) * (1 - Math.max(distA, distB) / connRadius) * 0.6;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(${lineColor.r},${lineColor.g},${lineColor.b},${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw stars
      for (const s of stars) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = dist < connRadius;
        const nearFactor = isNearMouse ? (1 - dist / connRadius) : 0;

        // Glow when near mouse
        if (nearFactor > 0.1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3 + nearFactor * 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${glowColor.r},${glowColor.g},${glowColor.b},${nearFactor * 0.15})`;
          ctx.fill();
        }

        // Star dot
        const alpha = s.brightness + nearFactor * 0.4;
        const size = s.size + nearFactor * 1.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor.r},${starColor.g},${starColor.b},${Math.min(alpha, 1)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [isActive, config, canvasRef]);
}

// ========== MAIN COMPONENT ==========
export default function CssBackgroundPatternGeneratorTool() {
  const [effect, setEffect] = useState<EffectType>('particles');
  const [config, setConfig] = useState<EffectConfig>({
    colorA: '#302b63',
    colorB: '#24243e',
    colorC: '#0f0c29',
    bgColor: '#0f0c29',
    speed: 1,
    density: 60,
    lineOpacity: 0.4,
    layers: 5,
    cellSize: 50,
  });
  const [downloading, setDownloading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Canvas effects
  useParticleCanvas(canvasRef, config, effect === 'particles');
  useGeometricCanvas(canvasRef, config, effect === 'geometric');
  useFlowFieldCanvas(canvasRef, config, effect === 'flow-field');
  useMatrixCanvas(canvasRef, config, effect === 'matrix');
  useConstellationCanvas(canvasRef, config, effect === 'constellation');

  // Regenerate geometric on button click
  const [geoKey, setGeoKey] = useState(0);
  const regenerate = () => setGeoKey(k => k + 1);

  // Force re-render geometric
  useEffect(() => {
    if (effect === 'geometric' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Trigger re-draw
        const event = new Event('resize');
        window.dispatchEvent(event);
      }
    }
  }, [geoKey, effect]);

  // Download as PNG
  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      if (['particles', 'geometric', 'flow-field', 'matrix', 'constellation'].includes(effect)) {
        if (canvasRef.current) {
          const link = document.createElement('a');
          link.download = `background-${effect}.png`;
          link.href = canvasRef.current.toDataURL('image/png');
          link.click();
        }
      } else {
        // For CSS/SVG based effects, use html2canvas approach (or just copy CSS)
        // We'll provide CSS copy instead
      }
    } finally {
      setDownloading(false);
    }
  }, [effect]);

  // Generate CSS for CSS-based effects
  const generateCSS = useCallback(() => {
    if (effect === 'gradient-mesh') {
      return `background-color: ${config.bgColor};
background-image:
  radial-gradient(at 40% 20%, ${config.colorA} 0px, transparent 50%),
  radial-gradient(at 80% 0%, ${config.colorB} 0px, transparent 50%),
  radial-gradient(at 0% 50%, ${config.colorC} 0px, transparent 50%),
  radial-gradient(at 80% 50%, ${config.colorA} 0px, transparent 50%),
  radial-gradient(at 0% 100%, ${config.colorB} 0px, transparent 50%),
  radial-gradient(at 80% 100%, ${config.colorC} 0px, transparent 50%),
  radial-gradient(at 0% 0%, ${config.colorA} 0px, transparent 50%);`;
    }
    if (effect === 'aurora') {
      return `background: ${config.bgColor};
background-image:
  linear-gradient(135deg, ${config.colorA}33 0%, transparent 40%),
  linear-gradient(225deg, ${config.colorB}33 0%, transparent 40%),
  linear-gradient(315deg, ${config.colorC}33 0%, transparent 40%),
  linear-gradient(45deg, ${config.colorA}55 0%, transparent 50%);
filter: blur(40px);`;
    }
    return '';
  }, [effect, config]);

  const [copied, setCopied] = useState(false);
  const cssOutput = generateCSS();

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Apply palette
  const applyPalette = (p: typeof PALETTES[0]) => {
    setConfig(c => ({ ...c, colorA: p.colors[0], colorB: p.colors[1], colorC: p.colors[2], bgColor: p.colors[0] }));
  };

  // Generate SVG waves
  const generateWaveSVG = () => {
    const layerCount = config.layers;
    const layers = [];
    for (let i = 0; i < layerCount; i++) {
      const t = i / (layerCount - 1 || 1);
      const color = lerpColor(config.colorA, config.colorC, t);
      const yBase = 30 + t * 55;
      const amp = 8 + Math.random() * 12;
      const freq = 1 + Math.random() * 2;
      const phase = Math.random() * Math.PI * 2;

      let path = `M 0 100 `;
      path += `L 0 ${yBase} `;
      for (let x = 0; x <= 100; x += 2) {
        const y = yBase + Math.sin((x / 100) * Math.PI * freq + phase) * amp;
        path += `L ${x} ${y} `;
      }
      path += `L 100 100 Z`;

      layers.push(
        <path key={i} d={path} fill={color} opacity={0.7 + t * 0.3} />
      );
    }
    return layers;
  };

  // Gradient mesh animation style
  const meshStyle: React.CSSProperties = effect === 'gradient-mesh' ? {
    background: config.bgColor,
    backgroundImage: [
      `radial-gradient(at 40% 20%, ${config.colorA} 0px, transparent 50%)`,
      `radial-gradient(at 80% 0%, ${config.colorB} 0px, transparent 50%)`,
      `radial-gradient(at 0% 50%, ${config.colorC} 0px, transparent 50%)`,
      `radial-gradient(at 80% 50%, ${config.colorA} 0px, transparent 50%)`,
      `radial-gradient(at 0% 100%, ${config.colorB} 0px, transparent 50%)`,
      `radial-gradient(at 80% 100%, ${config.colorC} 0px, transparent 50%)`,
      `radial-gradient(at 0% 0%, ${config.colorA} 0px, transparent 50%)`,
    ].join(','),
  } : {};

  // Aurora style
  const auroraStyle: React.CSSProperties = effect === 'aurora' ? {
    background: config.bgColor,
    backgroundImage: [
      `linear-gradient(135deg, ${config.colorA}33 0%, transparent 40%)`,
      `linear-gradient(225deg, ${config.colorB}33 0%, transparent 40%)`,
      `linear-gradient(315deg, ${config.colorC}33 0%, transparent 40%)`,
      `linear-gradient(45deg, ${config.colorA}55 0%, transparent 50%)`,
    ].join(','),
  } : {};

  const isCanvasEffect = ['particles', 'geometric', 'flow-field', 'matrix', 'constellation'].includes(effect);
  const isInteractiveEffect = ['particles', 'flow-field', 'matrix', 'constellation'].includes(effect);

  return (
    <div className="flex flex-col gap-6">
      {/* ===== LIVE PREVIEW ===== */}
      <div
        ref={previewRef}
        className="w-full h-80 md:h-[480px] rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden"
        style={effect === 'gradient-mesh' ? meshStyle : effect === 'aurora' ? auroraStyle : effect === 'waves' ? { backgroundColor: config.bgColor } : {}}
      >
        {/* Canvas for Particles & Geometric */}
        {isCanvasEffect && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />
        )}

        {/* SVG Waves */}
        {effect === 'waves' && (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {generateWaveSVG()}
          </svg>
        )}

        {/* Aurora animated blobs */}
        {effect === 'aurora' && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[80px]"
              style={{
                background: `radial-gradient(circle, ${config.colorA}, transparent 70%)`,
                top: '-20%', left: '10%',
                animation: 'auroraFloat1 8s ease-in-out infinite alternate',
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[80px]"
              style={{
                background: `radial-gradient(circle, ${config.colorB}, transparent 70%)`,
                top: '30%', right: '5%',
                animation: 'auroraFloat2 10s ease-in-out infinite alternate',
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[60px]"
              style={{
                background: `radial-gradient(circle, ${config.colorC}, transparent 70%)`,
                bottom: '-10%', left: '30%',
                animation: 'auroraFloat3 12s ease-in-out infinite alternate',
              }}
            />
          </div>
        )}

        {/* Gradient Mesh animated blobs */}
        {effect === 'gradient-mesh' && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-[50%] h-[50%] rounded-full opacity-60 blur-[60px]"
              style={{
                background: config.colorB,
                top: '10%', left: '60%',
                animation: 'meshBlob1 7s ease-in-out infinite alternate',
              }}
            />
            <div
              className="absolute w-[40%] h-[40%] rounded-full opacity-50 blur-[50px]"
              style={{
                background: config.colorC,
                bottom: '10%', left: '20%',
                animation: 'meshBlob2 9s ease-in-out infinite alternate',
              }}
            />
          </div>
        )}

        {/* Interactive hint overlay */}
        {isInteractiveEffect && (
          <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-white/70 text-xs font-medium">Move your mouse to interact</span>
          </div>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes auroraFloat1 { from { transform: translate(0, 0) scale(1); } to { transform: translate(60px, 40px) scale(1.2); } }
        @keyframes auroraFloat2 { from { transform: translate(0, 0) scale(1); } to { transform: translate(-50px, -30px) scale(1.15); } }
        @keyframes auroraFloat3 { from { transform: translate(0, 0) scale(1); } to { transform: translate(40px, -50px) scale(1.3); } }
        @keyframes meshBlob1 { from { transform: translate(0, 0) scale(1); } to { transform: translate(-80px, 50px) scale(1.4); } }
        @keyframes meshBlob2 { from { transform: translate(0, 0) scale(1); } to { transform: translate(60px, -40px) scale(1.3); } }
      `}</style>

      {/* ===== CONTROLS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Effect Selector + Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Effect Type Buttons */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Background Effect</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(EFFECT_INFO) as EffectType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setEffect(key)}
                  className={`px-3 py-3 rounded-xl border-2 transition-all text-center ${
                    effect === key
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-semibold block">{EFFECT_INFO[key].label}</span>
                  <span className={`text-[10px] block mt-0.5 ${effect === key ? 'text-gray-300' : 'text-gray-400'}`}>{EFFECT_INFO[key].desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette Quick Select */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Color Palettes</h2>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PALETTES.map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => applyPalette(palette)}
                  className="group flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title={palette.name}
                >
                  <div className="flex gap-0.5">
                    {palette.colors.map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium group-hover:text-gray-700">{palette.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fine-Grained Controls */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Fine Controls</h2>
            <div className="space-y-5">
              {/* Colors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Color A', key: 'colorA' as const },
                  { label: 'Color B', key: 'colorB' as const },
                  { label: 'Color C', key: 'colorC' as const },
                  { label: 'Background', key: 'bgColor' as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={config[key]}
                        onChange={(e) => setConfig(c => ({ ...c, [key]: e.target.value }))}
                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config[key]}
                        onChange={(e) => setConfig(c => ({ ...c, [key]: e.target.value }))}
                        className="flex-1 px-2 py-1.5 border border-gray-200 rounded-lg text-xs font-mono uppercase focus:ring-2 focus:ring-black focus:border-black outline-none w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Effect-specific sliders */}
              {effect === 'particles' && (
                <>
                  <SliderControl label="Particle Count" value={config.density} min={10} max={150} step={1} suffix="" onChange={(v) => setConfig(c => ({ ...c, density: v }))} />
                  <SliderControl label="Speed" value={config.speed} min={0.1} max={3} step={0.1} suffix="x" onChange={(v) => setConfig(c => ({ ...c, speed: v }))} />
                  <SliderControl label="Line Opacity" value={config.lineOpacity} min={0} max={1} step={0.05} suffix="%" displayMultiplier={100} onChange={(v) => setConfig(c => ({ ...c, lineOpacity: v }))} />
                </>
              )}
              {effect === 'waves' && (
                <SliderControl label="Wave Layers" value={config.layers} min={2} max={10} step={1} suffix="" onChange={(v) => setConfig(c => ({ ...c, layers: v }))} />
              )}
              {effect === 'geometric' && (
                <>
                  <SliderControl label="Cell Size" value={config.cellSize} min={20} max={120} step={5} suffix="px" onChange={(v) => setConfig(c => ({ ...c, cellSize: v }))} />
                  <button
                    onClick={regenerate}
                    className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                  >
                    Regenerate Pattern
                  </button>
                </>
              )}
              {effect === 'flow-field' && (
                <>
                  <SliderControl label="Particle Density" value={config.density} min={20} max={150} step={5} suffix="" onChange={(v) => setConfig(c => ({ ...c, density: v }))} />
                  <SliderControl label="Flow Speed" value={config.speed} min={0.2} max={3} step={0.1} suffix="x" onChange={(v) => setConfig(c => ({ ...c, speed: v }))} />
                </>
              )}
              {effect === 'matrix' && (
                <SliderControl label="Fall Speed" value={config.speed} min={0.2} max={3} step={0.1} suffix="x" onChange={(v) => setConfig(c => ({ ...c, speed: v }))} />
              )}
              {effect === 'constellation' && (
                <>
                  <SliderControl label="Star Count" value={config.density} min={20} max={150} step={5} suffix="" onChange={(v) => setConfig(c => ({ ...c, density: v }))} />
                  <SliderControl label="Drift Speed" value={config.speed} min={0.1} max={3} step={0.1} suffix="x" onChange={(v) => setConfig(c => ({ ...c, speed: v }))} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Output Panel */}
        <div className="space-y-5">
          {/* Download / Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Export</h2>
            {isCanvasEffect && (
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {downloading ? 'Exporting...' : 'Download PNG'}
              </button>
            )}
            {!isCanvasEffect && cssOutput && (
              <button
                onClick={handleCopy}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            )}
          </div>

          {/* CSS Output */}
          {!isCanvasEffect && cssOutput && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-2">Generated CSS</h2>
              <pre className="bg-gray-900 text-gray-100 font-mono text-xs p-4 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-60">
                {cssOutput}
              </pre>
            </div>
          )}

          {/* Current Palette Display */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Active Colors</h2>
            <div className="flex gap-2">
              {[config.colorA, config.colorB, config.colorC].map((c, i) => (
                <div key={i} className="flex-1 h-12 rounded-lg shadow-inner border border-gray-100" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-mono text-center">
              {config.colorA} · {config.colorB} · {config.colorC}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Reusable Slider Component =====
function SliderControl({ label, value, min, max, step, suffix, onChange, displayMultiplier }: {
  label: string; value: number; min: number; max: number; step: number; suffix: string;
  onChange: (v: number) => void; displayMultiplier?: number;
}) {
  const display = displayMultiplier ? Math.round(value * displayMultiplier) : value;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <span className="text-xs font-mono font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{display}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
      />
    </div>
  );
}
