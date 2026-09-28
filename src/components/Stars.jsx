import { useEffect } from "react";
import {
  initializeParticles,
  tsParticles
} from "./particlesEngine";

function Stars({ stage }) {

  const starCounts = [
    100, // stage 0 - lots of stars
    50,  // stage 1 - fewer stars
    15,  // stage 2 - very few stars
    0,   // stage 3 - no stars
    0    // stage 4 - no stars
  ];

  useEffect(() => {

    let container;

    async function loadStars() {

      // Load the tsParticles features
      await initializeParticles();

      // Create the star particles
      container = await tsParticles.load({
        id: "janet-stars",

        options: {

          fullScreen: {
            enable: false
          },

          particles: {

            number: {
              value: starCounts[stage]
            },

            color: {
              value: "#ffffff"
            },

            shape: {
              type: "star"
            },

            size: {
              value: {
                min: 1,
                max: 3
              }
            },

            opacity: {
              value: {
                min: 0.2,
                max: 0.9
              },

              animation: {
                enable: true,
                speed: 1
              }
            },

            move: {
              enable: false
            }
          }
        }
      });
    }

    loadStars();

    // When the stage changes, remove the old stars
    // before creating the new ones.
    return () => {
      if (container) {
        container.destroy();
      }
    };

  }, [stage]);

  return (
    <div
      id="janet-stars"
      className="absolute inset-0 pointer-events-none"
    />
  );
}

export default Stars;