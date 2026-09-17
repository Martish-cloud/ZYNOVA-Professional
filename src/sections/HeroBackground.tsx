import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  z: number;
}

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Mouse interactive coordinates
    const mouse = {
      x: width * 0.75,
      y: height * 0.5,
      targetX: width * 0.75,
      targetY: height * 0.5
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- 3D Geometric Crystal Structure (Inspired by High-End Luxury Obsidian & Gold Prism Facets) ---
    // Defined relative to crystal origin
    const baseVertices: Point3D[] = [
      // Central apex & primary specular ridges
      { x: 0, y: 0, z: 160 },           // 0: Main central crystal peak
      { x: -80, y: -60, z: 120 },       // 1: Upper-left golden facet peak
      { x: -140, y: 70, z: 100 },       // 2: Mid-left front point
      { x: 30, y: 90, z: 130 },         // 3: Lower-front point
      { x: 120, y: -20, z: 110 },       // 4: Right front point

      // Outer perimeter points
      { x: -70, y: -240, z: 50 },       // 5: Top-left high apex
      { x: 90, y: -220, z: 60 },        // 6: Top-right high apex
      { x: 230, y: -90, z: 50 },        // 7: Far-right upper point
      { x: 240, y: 110, z: 40 },        // 8: Far-right lower point
      { x: 80, y: 270, z: 45 },         // 9: Bottom-right point
      { x: -110, y: 250, z: 30 },       // 10: Bottom-left point
      { x: -260, y: 130, z: 35 },       // 11: Far-left lower point
      { x: -280, y: -80, z: 40 },       // 12: Far-left upper point
      { x: -190, y: -200, z: 20 },      // 13: Top-left outer flank

      // Background depth points (deep shadows & rim light)
      { x: -150, y: -300, z: -70 },     // 14
      { x: 160, y: -290, z: -80 },      // 15
      { x: 310, y: 0, z: -90 },         // 16
      { x: 200, y: 310, z: -85 },       // 17
      { x: -180, y: 320, z: -75 },      // 18
      { x: -340, y: 0, z: -90 }         // 19
    ];

    // Triangular facets forming the crystal mesh
    const faces: number[][] = [
      // Central prominent facets
      [0, 1, 4],
      [1, 2, 0],
      [0, 2, 3],
      [0, 3, 4],
      
      // Upper crown
      [1, 5, 6],
      [1, 6, 4],
      [5, 1, 13],
      [13, 1, 12],
      [12, 1, 2],

      // Right flank
      [4, 6, 7],
      [4, 7, 8],
      [4, 8, 3],
      [3, 8, 9],

      // Lower base
      [3, 9, 10],
      [2, 3, 10],
      [2, 10, 11],
      [12, 2, 11],

      // Background depth facets (obsidian crystal body)
      [5, 14, 15],
      [5, 15, 6],
      [6, 15, 16],
      [6, 16, 7],
      [7, 16, 8],
      [8, 16, 17],
      [8, 17, 9],
      [9, 17, 18],
      [9, 18, 10],
      [10, 18, 11],
      [11, 18, 19],
      [11, 19, 12],
      [12, 19, 13],
      [13, 19, 14],
      [13, 14, 5]
    ];

    // Floating golden dust particles / embers
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() * 0.7 + 0.3) * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? "#D4AF37" : "#F4E4BC"
    }));

    // Rotation angles with damping
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    let time = 0;

    const render = () => {
      time += 0.015;

      // Clear with dark obsidian base (#0B0B0F)
      ctx.fillStyle = "#0B0B0F";
      ctx.fillRect(0, 0, width, height);

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Subtle dynamic crystal origin (right side of the hero on desktop, centered on mobile)
      const isMobile = width < 768;
      const crystalCenterX = isMobile ? width * 0.5 : width * 0.78;
      const crystalCenterY = isMobile ? height * 0.35 : height * 0.48;

      // Mouse parallax tilt angles
      const normalizedMouseX = (mouse.x - width * 0.5) / (width * 0.5);
      const normalizedMouseY = (mouse.y - height * 0.5) / (height * 0.5);

      targetRotY = normalizedMouseX * 0.22 + Math.sin(time * 0.5) * 0.04;
      targetRotX = -normalizedMouseY * 0.18 + Math.cos(time * 0.4) * 0.03;

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // --- 1. Ambient Volumetric Golden Backlights ---
      // Large radiant golden bloom centered behind crystal structure
      const bloomRadius = Math.min(width, height) * 0.75;
      const coreLightGrad = ctx.createRadialGradient(
        crystalCenterX,
        crystalCenterY - 30,
        10,
        crystalCenterX,
        crystalCenterY - 30,
        bloomRadius
      );
      coreLightGrad.addColorStop(0, "rgba(255, 243, 204, 0.25)");
      coreLightGrad.addColorStop(0.18, "rgba(212, 175, 55, 0.18)");
      coreLightGrad.addColorStop(0.42, "rgba(180, 130, 25, 0.07)");
      coreLightGrad.addColorStop(0.75, "rgba(20, 20, 25, 0.03)");
      coreLightGrad.addColorStop(1, "rgba(11, 11, 15, 0)");

      ctx.fillStyle = coreLightGrad;
      ctx.fillRect(0, 0, width, height);

      // Light caustic rays fanning out
      ctx.save();
      ctx.translate(crystalCenterX, crystalCenterY - 30);
      const rayCount = 8;
      for (let r = 0; r < rayCount; r++) {
        const rayAngle = (r / rayCount) * Math.PI * 2 + time * 0.05;
        const rayLen = bloomRadius * 0.9;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(rayAngle - 0.15) * rayLen,
          Math.sin(rayAngle - 0.15) * rayLen
        );
        ctx.lineTo(
          Math.cos(rayAngle + 0.15) * rayLen,
          Math.sin(rayAngle + 0.15) * rayLen
        );
        ctx.closePath();
        const rayGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, rayLen);
        rayGrad.addColorStop(0, "rgba(244, 228, 188, 0.06)");
        rayGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.02)");
        rayGrad.addColorStop(1, "rgba(11, 11, 15, 0)");
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // --- 2. 3D Crystal Projection & Rotation ---
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Dynamic scale factor based on screen width
      const crystalScale = isMobile ? Math.min(width, height) * 0.0016 : Math.min(width, height) * 0.0022;

      // Project vertices
      const projected: ProjectedPoint[] = baseVertices.map((v) => {
        // Rotate around Y
        const x1 = v.x * crystalScale * cosY - v.z * crystalScale * sinY;
        const z1 = v.x * crystalScale * sinY + v.z * crystalScale * cosY;

        // Rotate around X
        const y2 = v.y * crystalScale * cosX - z1 * sinX;
        const z2 = v.y * crystalScale * sinX + z1 * cosX;

        // Perspective projection
        const fov = 750;
        const scale = fov / (fov + z2);

        return {
          x: crystalCenterX + x1 * scale,
          y: crystalCenterY + y2 * scale,
          scale,
          z: z2
        };
      });

      // --- 3. Render Polygonal Facets (Sorted by Average Z Depth) ---
      const sortedFaces = faces
        .map((faceIndices) => {
          const p0 = projected[faceIndices[0]];
          const p1 = projected[faceIndices[1]];
          const p2 = projected[faceIndices[2]];
          const avgZ = (p0.z + p1.z + p2.z) / 3;
          return { indices: faceIndices, avgZ };
        })
        .sort((a, b) => a.avgZ - b.avgZ);

      // Light source vector relative to crystal
      const lightVec = { x: -0.5, y: -0.6, z: 0.65 };
      const lightMag = Math.sqrt(lightVec.x * lightVec.x + lightVec.y * lightVec.y + lightVec.z * lightVec.z);
      lightVec.x /= lightMag;
      lightVec.y /= lightMag;
      lightVec.z /= lightMag;

      sortedFaces.forEach(({ indices }) => {
        const p0 = projected[indices[0]];
        const p1 = projected[indices[1]];
        const p2 = projected[indices[2]];

        // Cross product for 2D screen winding (cull backfaces)
        const vAx = p1.x - p0.x;
        const vAy = p1.y - p0.y;
        const vBx = p2.x - p0.x;
        const vBy = p2.y - p0.y;
        const cross2D = vAx * vBy - vAy * vBx;

        // Draw facet path
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();

        // 3D normal vector
        const orig0 = baseVertices[indices[0]];
        const orig1 = baseVertices[indices[1]];
        const orig2 = baseVertices[indices[2]];

        const d1x = orig1.x - orig0.x;
        const d1y = orig1.y - orig0.y;
        const d1z = orig1.z - orig0.z;

        const d2x = orig2.x - orig0.x;
        const d2y = orig2.y - orig0.y;
        const d2z = orig2.z - orig0.z;

        let nx = d1y * d2z - d1z * d2y;
        let ny = d1z * d2x - d1x * d2z;
        let nz = d1x * d2y - d1y * d2x;
        const nMag = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        nx /= nMag;
        ny /= nMag;
        nz /= nMag;

        // Dot product with light
        const dot = Math.max(0, nx * lightVec.x + ny * lightVec.y + nz * lightVec.z);

        // Linear gradient across facet from obsidian to gold specular
        const facetGrad = ctx.createLinearGradient(p0.x, p0.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

        if (dot > 0.45) {
          // Intense golden illuminated facet
          const intensity = (dot - 0.45) / 0.55;
          facetGrad.addColorStop(0, `rgba(255, 240, 185, ${0.45 + intensity * 0.4})`);
          facetGrad.addColorStop(0.35, `rgba(212, 175, 55, ${0.35 + intensity * 0.3})`);
          facetGrad.addColorStop(0.7, "rgba(90, 65, 15, 0.4)");
          facetGrad.addColorStop(1, "rgba(18, 19, 26, 0.85)");
        } else if (dot > 0.15) {
          // Mid-tone obsidian with rich golden warm reflection
          const intensity = (dot - 0.15) / 0.3;
          facetGrad.addColorStop(0, `rgba(180, 140, 45, ${0.25 + intensity * 0.2})`);
          facetGrad.addColorStop(0.4, "rgba(35, 30, 20, 0.6)");
          facetGrad.addColorStop(1, "rgba(15, 16, 22, 0.92)");
        } else {
          // Deep obsidian facet with subtle gold rim ambient
          facetGrad.addColorStop(0, "rgba(32, 33, 42, 0.92)");
          facetGrad.addColorStop(0.5, "rgba(20, 21, 28, 0.95)");
          facetGrad.addColorStop(1, "rgba(12, 13, 18, 0.98)");
        }

        ctx.fillStyle = facetGrad;
        ctx.fill();

        // --- Razor-Sharp Glowing Golden Edge Lines ---
        ctx.lineWidth = cross2D > 0 ? 1.4 : 0.8;
        ctx.strokeStyle = dot > 0.3 
          ? "rgba(244, 228, 188, 0.85)" 
          : "rgba(212, 175, 55, 0.45)";
        
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = dot > 0.3 ? 12 : 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // --- 4. Extra Radiant Specular Glow Along Central Ridges ---
      const keyEdgePairs = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 5], [1, 6], [4, 6], [4, 7], [3, 9]
      ];

      ctx.save();
      ctx.shadowColor = "#FFE599";
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2.2;

      keyEdgePairs.forEach(([iA, iB]) => {
        const pA = projected[iA];
        const pB = projected[iB];
        const edgeGrad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
        edgeGrad.addColorStop(0, "rgba(255, 248, 220, 0.95)");
        edgeGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.9)");
        edgeGrad.addColorStop(1, "rgba(244, 228, 188, 0.7)");

        ctx.strokeStyle = edgeGrad;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
      });
      ctx.restore();

      // --- 5. Floating Ambient Golden Dust & Light Motes ---
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        // Wrap around screen bounds
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const dynamicAlpha = Math.max(0, p.alpha + Math.sin(p.pulse) * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      // --- 6. Subtle Vignette & Bottom Section Blending ---
      const bottomFade = ctx.createLinearGradient(0, height - 140, 0, height);
      bottomFade.addColorStop(0, "rgba(11, 11, 15, 0)");
      bottomFade.addColorStop(1, "#0B0B0F");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height - 140, width, 140);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Translucent Obsidian Tint */}
      <div className="absolute inset-0 bg-[#050609]/20" />

      {/* Subtle fine geometric noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Interactive 3D Gold & Obsidian Crystal Prism Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Soft vignette gradient for headline contrast */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#050609]/70 via-[#050609]/30 to-transparent pointer-events-none" />
    </div>
  );
};
