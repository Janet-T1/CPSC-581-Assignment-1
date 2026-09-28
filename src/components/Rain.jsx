import { useEffect } from "react";

import {
  initializeParticles,
  tsParticles
} from "./particlesEngine";

function Rain() {

  useEffect(() => {

    let container;
    let cancelled = false;

    async function loadRain() {

      await initializeParticles();

      const loadedContainer = await tsParticles.load({
        id: "janet-rain",

        options: {

          fullScreen: {
            enable: false
          },

          particles: {

            number: {
              value: 100
            },

            color: {
              value: "#9ed8ff"
            },

            shape: {
              type: "circle"
            },

            opacity: {
              value: {
                min: 0.3,
                max: 0.7
              }
            },

            size: {
              value: 2
            },

            move: {
              enable: true,
              direction: "bottom",
              speed: 15,
              straight: true,

              outModes: {
                default: "out"
              }
            }
          }
        }
      });

      if (cancelled) {
        loadedContainer?.destroy();
        return;
      }

      container = loadedContainer;
    }

    loadRain();

    return () => {
      cancelled = true;
      container?.destroy();
    };

  }, []);


  return (
    <div
      id="janet-rain"
      className="
        absolute
        inset-0
        w-full
        h-full
        pointer-events-none
        z-20
      "
    />
  );
}

export default Rain;