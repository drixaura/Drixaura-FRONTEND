import React, { useEffect, useRef } from 'react';

export default function NeonBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const tunnelLength = 1200;
    const isLight = true;
    
    // Core parameters for visual density
    const maxBlocks = 60;        // More blocks on the walls
    const maxDustParticles = 140; // Dense 3D floating space particles
    const baseSpeed = 11.0;       // Fast base speed
    
    // Arrays for elements
    let blocks = [];
    let dustParticles = [];
    let portalRings = []; // Large frames that camera flies through

    // Camera state
    const camera = {
      x: 0,
      y: 0,
      roll: 0,
      targetRoll: 0,
      time: 0,
      speedSurge: 1.0
    };

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helper: Create a 3D block
    const createBlock = (z, isInitial = false) => {
      const side = Math.floor(Math.random() * 4); // 0: left, 1: right, 2: bottom, 3: top
      let x = 0;
      let y = 0;
      
      // Structural cluster sizes (blocks and plates)
      const isPlate = Math.random() > 0.6;
      const w = isPlate ? (Math.random() * 80 + 30) : (Math.random() * 30 + 15);
      const h = isPlate ? (Math.random() * 15 + 10) : (Math.random() * 30 + 15);
      const d = Math.random() * 90 + 30;

      if (side === 0) { // Left Wall
        x = -170 - Math.random() * 60;
        y = (Math.random() - 0.5) * 260;
      } else if (side === 1) { // Right Wall
        x = 170 + Math.random() * 60;
        y = (Math.random() - 0.5) * 260;
      } else if (side === 2) { // Floor
        x = (Math.random() - 0.5) * 340;
        y = 135 + Math.random() * 35;
      } else { // Ceiling
        x = (Math.random() - 0.5) * 340;
        y = -135 - Math.random() * 35;
      }

      // Alternate color palettes: Cyan (#66FCF1) and Magenta (#bd00ff)
      const isCyan = Math.random() > 0.45;
      const colorRGB = isCyan ? '102, 252, 241' : '189, 0, 255';
      const colorCore = isCyan ? '#f2ffff' : '#fff2ff';

      return {
        x,
        y,
        z: isInitial ? z : tunnelLength,
        w,
        h,
        d,
        colorRGB,
        colorCore
      };
    };

    // Helper: Create 3D Dust Particle
    const createDust = (z, isInitial = false) => {
      return {
        x: (Math.random() - 0.5) * 450,
        y: (Math.random() - 0.5) * 350,
        z: isInitial ? z : tunnelLength,
        size: Math.random() * 1.5 + 0.8,
        colorRGB: Math.random() > 0.5 ? '102, 252, 241' : '189, 0, 255'
      };
    };

    // Initialize blocks & dust
    for (let i = 0; i < maxBlocks; i++) {
      blocks.push(createBlock((i / maxBlocks) * tunnelLength + 50, true));
    }
    for (let i = 0; i < maxDustParticles; i++) {
      dustParticles.push(createDust((i / maxDustParticles) * tunnelLength, true));
    }

    // Initialize large portal rings spaced along Z-axis
    const numRings = 5;
    for (let i = 0; i < numRings; i++) {
      portalRings.push({
        z: (i / numRings) * tunnelLength + 100,
        colorRGB: i % 2 === 0 ? '102, 252, 241' : '189, 0, 255'
      });
    }

    // Mouse events
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.2;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.2;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseRef.current.targetX = (touch.clientX - window.innerWidth / 2) * 0.2;
        mouseRef.current.targetY = (touch.clientY - window.innerHeight / 2) * 0.2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // 3D Perspective Projection
    const project = (x, y, z, width, height) => {
      // 1. Offset relative to camera
      const dx = x - camera.x;
      const dy = y - camera.y;

      // 2. Roll Rotation (camera bank)
      const cosR = Math.cos(camera.roll);
      const sinR = Math.sin(camera.roll);
      const rx = dx * cosR - dy * sinR;
      const ry = dx * sinR + dy * cosR;

      // 3. Perspective Division
      const focalLength = 330;
      if (z <= 1) return null;
      const scale = focalLength / z;

      return {
        x: rx * scale + width / 2,
        y: ry * scale + height / 2,
        scale: scale
      };
    };

    // Draw single glowing neon line (3-pass drawing for high quality)
    const drawNeonLine = (p1, p2, colorRGB, blockZ, intensity = 1.0) => {
      if (!p1 || !p2) return;

      // Adjust color RGB values for light mode readability (make them darker and saturated)
      let adjustedRGB = colorRGB;
      if (isLight) {
        if (colorRGB === '102, 252, 241') {
          adjustedRGB = '0, 128, 128'; // Teal
        } else if (colorRGB === '189, 0, 255') {
          adjustedRGB = '138, 0, 179'; // Purple
        }
      }

      const alpha = Math.max(0, Math.min(0.85, 1 - (blockZ / tunnelLength))) * intensity;
      if (alpha <= 0.02) return;

      const glowWidth = 5.5 * p1.scale;
      const coreWidth = 1.1 * p1.scale;

      // Pass 1: Outer glow bloom
      ctx.strokeStyle = isLight 
        ? `rgba(${adjustedRGB}, ${alpha * 0.18})` 
        : `rgba(${adjustedRGB}, ${alpha * 0.25})`;
      ctx.lineWidth = Math.min(12, glowWidth);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Pass 2: White core (dark mode) or solid saturated core (light mode)
      ctx.strokeStyle = isLight 
        ? `rgba(${adjustedRGB}, ${alpha * 0.85})` 
        : `rgba(255, 255, 255, ${alpha * 0.95})`;
      ctx.lineWidth = Math.max(0.5, Math.min(2.5, coreWidth));
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    // Main Loop
    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      camera.time += 0.008;

      // Surge speed (speeds up and slows down slightly for dynamic acceleration)
      camera.speedSurge = 1.0 + Math.sin(camera.time * 2.0) * 0.22;
      const currentSpeed = baseSpeed * camera.speedSurge;

      // 1. Draw Void and Fog Glow
      ctx.fillStyle = isLight ? '#f8f9fa' : '#030305';
      ctx.fillRect(0, 0, width, height);

      // Radial fog glow in center
      const coreLight = ctx.createRadialGradient(
        width / 2, height / 2, 5, 
        width / 2, height / 2, Math.max(120, width * 0.5)
      );
      if (isLight) {
        coreLight.addColorStop(0, 'rgba(138, 0, 179, 0.06)'); // soft purple
        coreLight.addColorStop(0.35, 'rgba(0, 128, 128, 0.04)'); // teal overlay
        coreLight.addColorStop(1, 'rgba(248, 249, 250, 0)');
      } else {
        coreLight.addColorStop(0, 'rgba(189, 0, 255, 0.18)'); // soft magenta light source
        coreLight.addColorStop(0.35, 'rgba(102, 252, 241, 0.08)'); // cyan overlay
        coreLight.addColorStop(1, 'rgba(3, 3, 5, 0)');
      }
      ctx.fillStyle = coreLight;
      ctx.fillRect(0, 0, width, height);

      // 2. Interpolate Camera motion
      camera.x += (mouseRef.current.targetX - camera.x) * 0.07;
      camera.y += (mouseRef.current.targetY - camera.y) * 0.07;
      
      // Floating wobble
      camera.x += Math.sin(camera.time * 1.8) * 1.8;
      camera.y += Math.cos(camera.time * 1.4) * 1.8;

      camera.targetRoll = Math.sin(camera.time * 0.6) * 0.15;
      camera.roll += (camera.targetRoll - camera.roll) * 0.06;

      // 3. Update Elements
      // Blocks Z shift
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].z -= currentSpeed;
        if (blocks[i].z < 10) {
          blocks[i] = createBlock(tunnelLength, false);
        }
      }

      // Dust Z shift
      for (let i = 0; i < dustParticles.length; i++) {
        dustParticles[i].z -= currentSpeed * 1.3; // Particles fly by slightly faster
        if (dustParticles[i].z < 10) {
          dustParticles[i] = createDust(tunnelLength, false);
        }
      }

      // Portal Rings Z shift
      for (let i = 0; i < portalRings.length; i++) {
        portalRings[i].z -= currentSpeed;
        if (portalRings[i].z < 10) {
          portalRings[i].z = tunnelLength;
        }
      }

      // 4. Draw Laser corner lines along tunnel edges
      // We render horizontal guide cables
      const corners = [
        { x: -180, y: -135 }, // Top-Left
        { x: 180, y: -135 },  // Top-Right
        { x: 180, y: 135 },   // Bottom-Right
        { x: -180, y: 135 }   // Bottom-Left
      ];

      // Draw horizontal cables in segments to support fog fading
      const segmentLen = 150;
      for (let zSeg = 50; zSeg < tunnelLength; zSeg += segmentLen) {
        corners.forEach((c, idx) => {
          const p1 = project(c.x, c.y, zSeg, width, height);
          const p2 = project(c.x, c.y, zSeg + segmentLen, width, height);
          const rgb = idx % 2 === 0 ? '102, 252, 241' : '189, 0, 255';
          drawNeonLine(p1, p2, rgb, zSeg, 0.45); // lower intensity lines
        });
      }

      // 5. Draw Portal Rings (large rectangular structural arches)
      portalRings.forEach((ring) => {
        const rCorners = [
          { x: -180, y: -135, z: ring.z },
          { x: 180, y: -135, z: ring.z },
          { x: 180, y: 135, z: ring.z },
          { x: -180, y: 135, z: ring.z }
        ];

        const projectedCorners = rCorners.map(rc => project(rc.x, rc.y, rc.z, width, height));

        if (projectedCorners.some(pc => pc === null)) return;

        // Draw the ring lines
        drawNeonLine(projectedCorners[0], projectedCorners[1], ring.colorRGB, ring.z, 1.3);
        drawNeonLine(projectedCorners[1], projectedCorners[2], ring.colorRGB, ring.z, 1.3);
        drawNeonLine(projectedCorners[2], projectedCorners[3], ring.colorRGB, ring.z, 1.3);
        drawNeonLine(projectedCorners[3], projectedCorners[0], ring.colorRGB, ring.z, 1.3);
      });

      // 6. Draw structural blocks (painter's sort Z desc)
      const sortedBlocks = [...blocks].sort((a, b) => b.z - a.z);

      sortedBlocks.forEach((block) => {
        const halfW = block.w / 2;
        const halfH = block.h / 2;
        const halfD = block.d / 2;

        const vertices = [
          // Back face
          { x: block.x - halfW, y: block.y - halfH, z: block.z + halfD },
          { x: block.x + halfW, y: block.y - halfH, z: block.z + halfD },
          { x: block.x + halfW, y: block.y + halfH, z: block.z + halfD },
          { x: block.x - halfW, y: block.y + halfH, z: block.z + halfD },
          // Front face
          { x: block.x - halfW, y: block.y - halfH, z: block.z - halfD },
          { x: block.x + halfW, y: block.y - halfH, z: block.z - halfD },
          { x: block.x + halfW, y: block.y + halfH, z: block.z - halfD },
          { x: block.x - halfW, y: block.y + halfH, z: block.z - halfD }
        ];

        const projected = vertices.map(v => project(v.x, v.y, v.z, width, height));

        if (projected.some(p => p === null)) return;

        // Draw structural edges
        // Back
        drawNeonLine(projected[0], projected[1], block.colorRGB, block.z);
        drawNeonLine(projected[1], projected[2], block.colorRGB, block.z);
        drawNeonLine(projected[2], projected[3], block.colorRGB, block.z);
        drawNeonLine(projected[3], projected[0], block.colorRGB, block.z);
        // Front
        drawNeonLine(projected[4], projected[5], block.colorRGB, block.z);
        drawNeonLine(projected[5], projected[6], block.colorRGB, block.z);
        drawNeonLine(projected[6], projected[7], block.colorRGB, block.z);
        drawNeonLine(projected[7], projected[4], block.colorRGB, block.z);
        // Connections
        drawNeonLine(projected[0], projected[4], block.colorRGB, block.z);
        drawNeonLine(projected[1], projected[5], block.colorRGB, block.z);
        drawNeonLine(projected[2], projected[6], block.colorRGB, block.z);
        drawNeonLine(projected[3], projected[7], block.colorRGB, block.z);
      });

      // 7. Draw 3D Space Dust Particles (flying past camera)
      dustParticles.forEach((d) => {
        const proj = project(d.x, d.y, d.z, width, height);
        if (!proj) return;

        const depthAlpha = Math.max(0, Math.min(0.9, 1 - (d.z / tunnelLength)));
        const finalSize = d.size * proj.scale;

        if (finalSize <= 0.1 || depthAlpha <= 0.05) return;

        // Adjust color for light mode
        let adjustedRGB = d.colorRGB;
        if (isLight) {
          if (d.colorRGB === '102, 252, 241') {
            adjustedRGB = '0, 128, 128';
          } else if (d.colorRGB === '189, 0, 255') {
            adjustedRGB = '138, 0, 179';
          }
        }

        ctx.fillStyle = `rgba(${adjustedRGB}, ${depthAlpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.min(6, finalSize), 0, Math.PI * 2);
        ctx.fill();

        // Core white shine for close dust particles
        if (proj.scale > 1.2) {
          ctx.fillStyle = isLight 
            ? `rgba(${adjustedRGB}, ${depthAlpha * 0.95})` 
            : `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.min(2, finalSize * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-canvas" />;
}
