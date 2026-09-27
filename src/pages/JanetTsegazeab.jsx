import { useState } from "react";

import flower1 from "../assets/janet/flower1.png";
import flower2 from "../assets/janet/flower2.png";
import flower3 from "../assets/janet/flower3.png";
import flower4 from "../assets/janet/flower4.png";
import flower5 from "../assets/janet/flower5.png";

import cloud1 from "../assets/janet/Clouds/cloud1.png";
import cloud2 from "../assets/janet/Clouds/cloud2.png";
import cloud3 from "../assets/janet/Clouds/cloud3.png";
import cloud4 from "../assets/janet/Clouds/cloud4.png";
import cloud5 from "../assets/janet/Clouds/cloud5.png";
import cloud6 from "../assets/janet/Clouds/cloud6.png";
import cloud7 from "../assets/janet/Clouds/cloud7.png";

import Stars from "../components/Stars";
import Rain from "../components/Rain";

function JanetTsegazeab() {
    const [rainingCloud, setRainingCloud] = useState(null);
    const skyColours = [
        "#171d48",
        "#314faf",
        "#4578df",
        "#6aa5dc",
        "#8cbedf"
    ];

    const skyGradients = [
        `linear-gradient(to bottom, ${skyColours[0]}, ${skyColours[1]})`,
        `linear-gradient(to bottom, ${skyColours[1]}, ${skyColours[2]})`,
        `linear-gradient(to bottom, ${skyColours[2]}, ${skyColours[3]})`,
        `linear-gradient(to bottom, ${skyColours[3]}, ${skyColours[4]})`,
        `linear-gradient(to bottom, ${skyColours[4]}, #ffffff)`
    ];

  const flowers = [flower1, flower2, flower3, flower4, flower5];

  const clouds = [ cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7];

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

  function handleCloudClick(cloudIndex) {
    // Don't allow another cloud to trigger while raining
    if (rainingCloud !== null) {
        return;
    }
    setRainingCloud(cloudIndex);

    setTimeout(() => {
        setRainingCloud(null);
    }, 3000);
}

  return (
    <div
        className="relative flex flex-col min-h-screen items-center justify-end pb-1 overflow-hidden"
        style={{
            backgroundImage: skyGradients[stage]
        }}
    >
    
        {/* Clouds */}
        <div className="absolute top-0 left-0 w-full z-10">
            {/* First row - 4 clouds */}
            <div className="grid grid-cols-4 gap-6 items-center cloud-row-one">
                {clouds.slice(0, 4).map((cloud, index) => (
                    <button
                        key={index}
                        className="cursor-pointer"
                        onClick={() => handleCloudClick(index)}
                        disabled={rainingCloud !== null}
                    >
                    <img
                        src={cloud}
                        alt={`Cloud ${index + 1}`}
                        className={`
                            w-full
                            transition-opacity
                            duration-900
                            ${rainingCloud === index
                                ? "opacity-0"
                                : "opacity-100"
                            }
                        `}
                    />
                    </button>
                ))}
            </div>

            {/* Second row - 3 clouds */}
            <div className="grid grid-cols-3 gap-10 items-center -mt-26 cloud-row-two">
                {clouds.slice(4, 7).map((cloud, index) => {
                    const cloudIndex = index + 4;
                    return (
                        <button
                            key={cloudIndex}
                            className="cursor-pointer"
                            onClick={() => handleCloudClick(cloudIndex)}
                            disabled={rainingCloud !== null}
                        >
                            <img
                                src={cloud}
                                alt={`Cloud ${cloudIndex + 1}`}
                                className={`
                                    w-full
                                    transition-opacity
                                    duration-900
                                    ${rainingCloud === cloudIndex
                                    ? "opacity-0"
                                    : "opacity-100"
                                    }
                                `}
                            />
                        </button>
                    );
                })}
            </div>
        </div>

        {/* Stars in the background */}
        {stage < 3 && <Stars stage={stage} />}

        {rainingCloud !== null && <Rain />}

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