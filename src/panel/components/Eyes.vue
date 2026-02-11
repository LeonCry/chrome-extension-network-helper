<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

const { x, y } = useMouse();
const leftEyeRef = ref<HTMLElement | null>(null);
const rightEyeRef = ref<HTMLElement | null>(null);

const leftPupilStyle = ref({});
const rightPupilStyle = ref({});

function updatePupils() {
  const updateEye = (eye: HTMLElement | null) => {
    if (!eye) return {};
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = x.value - centerX;
    const dy = y.value - centerY;
    const angle = Math.atan2(dy, dx);

    // Eye radius (approx 15px) - Pupil radius (approx 4px) - border/padding (2px)
    const maxDist = (rect.width / 2) - 6;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);

    const px = Math.cos(angle) * dist;
    const py = Math.sin(angle) * dist;

    return { transform: `translate(${px}px, ${py}px)` };
  };

  leftPupilStyle.value = updateEye(leftEyeRef.value);
  rightPupilStyle.value = updateEye(rightEyeRef.value);
}

watchEffect(() => {
  updatePupils();
});
</script>

<template>
  <div
    class="eyes-container"
  >
    <div ref="leftEyeRef" class="eye">
      <div class="pupil" :style="leftPupilStyle" />
    </div>
    <div ref="rightEyeRef" class="eye">
      <div class="pupil" :style="rightPupilStyle" />
    </div>
  </div>
</template>

<style scoped>
.eyes-container {
  display: flex;
  gap: 8px;
  padding: 4px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.eye {
  width: 24px;
  height: 24px;
  background: #f0f0f0;
  border: 2px solid #333;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.pupil {
  width: 10px;
  height: 10px;
  background: #333;
  border-radius: 50%;
  will-change: transform;
}
</style>
