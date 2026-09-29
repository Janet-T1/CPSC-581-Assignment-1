import { useState } from "react";
import { useNavigate } from "react-router-dom";

import flower1 from "../assets/janet/Flowers/flower1.png";
import flower2 from "../assets/janet/Flowers/flower2.png";
import flower3 from "../assets/janet/Flowers/flower3.png";
import flower4 from "../assets/janet/Flowers/flower4.png";
import flower5 from "../assets/janet/Flowers/flower5.png";

import flowerRain1 from "../assets/janet/FlowerRain/flowerRain1.png";
import flowerRain2 from "../assets/janet/FlowerRain/flowerRain2.png";
import flowerRain3 from "../assets/janet/FlowerRain/flowerRain3.png";
import flowerRain4 from "../assets/janet/FlowerRain/flowerRain4.png";
import flowerRain5 from "../assets/janet/FlowerRain/flowerRain5.png";

import cloud1 from "../assets/janet/Clouds/Cloud1.png";
import cloud2 from "../assets/janet/Clouds/Cloud2.png";
import cloud3 from "../assets/janet/Clouds/Cloud3.png";
import cloud4 from "../assets/janet/Clouds/Cloud4.png";
import cloud5 from "../assets/janet/Clouds/Cloud5.png";
import cloud6 from "../assets/janet/Clouds/Cloud6.png";
import cloud7 from "../assets/janet/Clouds/Cloud7.png";

import mountains from "../assets/janet/mountains.png";
import moon from "../assets/janet/moon.png";
import sun from "../assets/janet/sun.png";

import Stars from "../components/Stars";
import Rain from "../components/Rain";

function JanetTsegazeab() {
    const navigate = useNavigate();

    function handleBack() {
        navigate("/");
    }

    function handleRefresh() {
        window.location.reload();
    }

    const [rainingCloud, setRainingCloud] = useState(null);
    const skyColours = [ "#171d48", "#314faf", "#4578df", "#6aa5dc", "#8cbedf"];
    const skyGradients = [
        `linear-gradient(to bottom, ${skyColours[0]}, ${skyColours[1]})`,
        `linear-gradient(to bottom, ${skyColours[1]}, ${skyColours[2]})`,
        `linear-gradient(to bottom, ${skyColours[2]}, ${skyColours[3]})`,
        `linear-gradient(to bottom, ${skyColours[3]}, ${skyColours[4]})`,
        `linear-gradient(to bottom, ${skyColours[4]}, #ffffff)`
    ];
    const flowers = [flower1, flower2, flower3, flower4, flower5];
    const rainFlowers = [flowerRain1, flowerRain2, flowerRain3, flowerRain4, flowerRain5];

    const clouds = [ cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7];

    const [stage, setStage] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [previousSky, setPreviousSky] = useState(null);
    const [isHopping, setIsHopping] = useState(false);

    function handleFlowerClick() {
        // Prevent clicking while the flower is transitioning
        // or once flower 5 has been reached.
        if (isFading || rainingCloud !== null || stage >= flowers.length - 1) {
            return;
        }
        // Begin fading the current flower out.
        setIsFading(true);

        // Wait until the fade-out finishes.
        setTimeout(() => {
            advanceStage();
            setIsFading(false);
        }, 500);
    }

    function handleCloudClick(cloudIndex) {
        if (rainingCloud !== null || isFading) {
            return;
        }
        setIsFading(true);

        setTimeout(() => {
            // Start rain and show drooping flower.
            setRainingCloud(cloudIndex);

            // Fade drooping flower in.
            setIsFading(false);

            // Rain for 3 seconds.
            setTimeout(() => {

                // Fade drooping flower out.
                setIsFading(true);

                setTimeout(() => {

                    // Stop rain.
                    setRainingCloud(null);

                    // Advance flower, stars AND sky.
                    advanceStage();

                    // Fade next flower in.
                    setIsFading(false);

                }, 500);

            }, 3000);

        }, 500);
    }

    function advanceStage() {

        if (stage >= flowers.length - 1) {
            return;
        }

        const currentStage = stage;
        const nextStage = stage + 1;

        // Save old sky.
        setPreviousSky(skyGradients[currentStage]);

        // Switch underneath to the new sky.
        setStage(nextStage);

        // Remove old sky after its fade finishes.
        setTimeout(() => {
            setPreviousSky(null);
        }, 1000);
    }

    function handleLightClick() {
        if (isHopping) {
            return;
        }

        setIsHopping(true);

        setTimeout(() => {
            setIsHopping(false);
        }, 800);
    }

  return (
    <div
        className="relative flex flex-col min-h-screen items-center justify-end pb-0 overflow-hidden"
        style={{
            backgroundImage: skyGradients[stage]
        }}
    >
        {/* Back Button */}
        <button
            onClick={handleBack}
            className=" absolute top-5 left-5 z-50 px-5 py-3 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer transition-all duration-300 hover:scale-105"
        >
            ← Back
        </button>

        {/* Refresh Button */}
        <button
            onClick={handleRefresh}
            className="absolute top-5 right-5 z-50 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md cursor-pointer transition-all
                duration-300
                hover:scale-105
                flex
                items-center
                justify-center
                text-2xl
            "
            aria-label="Refresh"
        >
            ↻
        </button>
        {/* Previous sky - fades away when the stage changes */}
        {previousSky && (
            <div
                className="absolute inset-0 z-0 pointer-events-none sky-fade-out"
                style={{
                    backgroundImage: previousSky
                }}
            />
        )}

        {/* Mountains */}
        <img
            src={mountains}
            alt=""
            className="absolute inset-0 w-full h-full object-cover translate-y-60 z-[5] pointer-events-none"
        />
        
        {/* Moon / Sun */}
        <button
            onClick={handleLightClick}
            className="absolute top-28 right-28 z-[15] w-40 h-40 cursor-pointer transition-transform duration-300 -translate-y-20 hover:scale-105"
        >
            {/* Warm white glow */}
            <div className="absolute inset-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff8e7]/40 blur-2xl pointer-events-none"></div>

            {/* Moon - stages 1, 2, 3 */}
            <img
                src={moon}
                alt="Moon"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${stage < 3 ? "opacity-100" : "opacity-0"}`}
            />

            {/* Sun - stages 4, 5 */}
            <img
                src={sun}
                alt="Sun"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${stage < 3 ? "opacity-0" : "opacity-100"}`}
            />
        </button>

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
        <div className="flex items-center w-2/9 z-10 translate-y-10">
            {/* Hop animation wrapper */}
            <div className={isHopping ? "flower-hop" : ""}>
                <button
                    onClick={handleFlowerClick}
                    disabled={
                        stage === flowers.length - 1 ||
                        isFading ||
                        rainingCloud !== null
                    }
                >
                    <img
                        src={
                            rainingCloud !== null
                                ? rainFlowers[stage]
                                : flowers[stage]
                        }
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
    </div>
);
}

export default JanetTsegazeab;