import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

let initializationPromise = null;

export function initializeParticles() {
  if (!initializationPromise) {
    initializationPromise = loadSlim(tsParticles);
  }

  return initializationPromise;
}

export { tsParticles };