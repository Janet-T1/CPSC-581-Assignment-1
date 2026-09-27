import { useState } from "react";

import flower1 from "../assets/janet/flower1.png";
import flower2 from "../assets/janet/flower2.png";
import flower3 from "../assets/janet/flower3.png";
import flower4 from "../assets/janet/flower4.png";
import flower5 from "../assets/janet/flower5.png";

import Stars from "../components/Stars";

function JanetTsegazeab() {
  const skyColours = [
    "#1D245C",
    "#2a4087",
    "#3462be",
    "#4d87bd",
    "#8cbedf"
  ];

  const flowers = [
    flower1,
    flower2,
    flower3,
    flower4,
    flower5
  ];

  const [stage, setStage] = useState(0);
  const [isFading, setIsFading] = useState(false);

  function handleFlowerClick() {

    // Prevent clicking while the flower is transitioning
    // or once flower 5 has been reached.
    if (isFading || stage >= flowers.length - 1) {
      return;
    }

    // Begin fading the current flower out.
    setIsFading(true);

    // Wait until the fade-out finishes.
    setTimeout(() => {

      // Move to the next flower / sky / star stage.
      setStage((currentStage) => currentStage + 1);

      // Fade the new flower back in.
      setIsFading(false);

    }, 500);
  }

  return (
    <div
      className="relative flex flex-col min-h-screen items-center justify-end pb-3 overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: skyColours[stage]
      }}
    >

      {/* Stars in the background */}
      {stage < 3 && <Stars stage={stage} />}

      {/* Flower */}
      <div className="flex items-center w-1/5 z-10">

        <button
          onClick={handleFlowerClick}
          disabled={
            stage === flowers.length - 1 ||
            isFading
          }
        >
          <img
            src={flowers[stage]}
            alt="Janet Tsegazeab flower"
            className={`
              cursor-pointer
              flower-sway
              transition-opacity
              duration-500
              ${isFading ? "opacity-0" : "opacity-100"}
            `}
          />
        </button>

      </div>

    </div>
  );
}

export default JanetTsegazeab;