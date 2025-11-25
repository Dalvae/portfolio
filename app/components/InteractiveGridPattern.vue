<template>
  <svg
    ref="svgRef"
    class="w-full h-full"
    :class="className"
    :style="{ transform: `skewY(${skewAngle}deg)` }"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
      >
        <rect
          :width="width"
          :height="height"
          fill="transparent"
          class="stroke-zinc-700/30"
          stroke-width="1"
        />
      </pattern>
    </defs>
    
    <!-- Grid pattern background -->
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
    
    <!-- Interactive squares -->
    <rect
      v-for="square in activeSquares"
      :key="square.id"
      :x="square.x"
      :y="square.y"
      :width="width - 1"
      :height="height - 1"
      :class="squaresClassName"
      class="fill-teal-400/30 transition-opacity duration-700"
      :style="{ opacity: square.opacity }"
    />
  </svg>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, type HTMLAttributes } from "vue";

interface InteractiveGridPatternProps {
  className?: HTMLAttributes["class"];
  squaresClassName?: HTMLAttributes["class"];
  width?: number;
  height?: number;
  skewAngle?: number;
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  width: 30,
  height: 30,
  skewAngle: -12,
});

const patternId = `grid-pattern-${Math.random().toString(36).slice(2, 9)}`;
const svgRef = ref<SVGSVGElement | null>(null);

interface ActiveSquare {
  id: string;
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

const activeSquares = ref<ActiveSquare[]>([]);
const mousePos = ref({ x: 0, y: 0 });

function handleMouseMove(e: MouseEvent) {
  if (!svgRef.value) return;
  
  const rect = svgRef.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  // Para skewY, la transformación CSS es: y' = y + x * tan(angle)
  // Entonces para invertir: y = y' - x * tan(angle)
  // Pero también el bounding box cambia, necesitamos usar la matriz de transformación real
  
  const svgPoint = svgRef.value.createSVGPoint();
  svgPoint.x = e.clientX;
  svgPoint.y = e.clientY;
  
  // Obtener la matriz de transformación inversa
  const ctm = svgRef.value.getScreenCTM();
  if (!ctm) return;
  
  const inverseCTM = ctm.inverse();
  const transformedPoint = svgPoint.matrixTransform(inverseCTM);
  
  const gridX = Math.floor(transformedPoint.x / props.width) * props.width;
  const gridY = Math.floor(transformedPoint.y / props.height) * props.height;
  
  const id = `${gridX}-${gridY}`;
  
  // Check if square already exists
  const existing = activeSquares.value.find(s => s.id === id);
  if (!existing) {
    activeSquares.value.push({
      id,
      x: gridX,
      y: gridY,
      opacity: 0.8,
      timestamp: Date.now(),
    });
  } else {
    existing.opacity = 0.8;
    existing.timestamp = Date.now();
  }
  
  mousePos.value = { x: mouseX, y: mouseY };
}

let animationFrame: number;
let cleanupInterval: ReturnType<typeof setInterval>;

function animate() {
  const now = Date.now();
  
  activeSquares.value = activeSquares.value
    .map(square => ({
      ...square,
      opacity: Math.max(0, 0.8 - (now - square.timestamp) / 600),
    }))
    .filter(square => square.opacity > 0.01);
  
  animationFrame = requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  animate();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  cancelAnimationFrame(animationFrame);
  if (cleanupInterval) clearInterval(cleanupInterval);
});
</script>
