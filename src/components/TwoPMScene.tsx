import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { DunceModel } from "./DunceModel";
import { TwoPMText } from "./TwoPMText";
import { TwoPMTextMobile } from "./TwoPMTextMobile";

interface ITwoPMSceneProps {
  width: number;
}

export const TwoPMScene = ({ width }: ITwoPMSceneProps) => {
  return (
    <Canvas dpr={[1, 2]} color="white">
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.7} />
      <Suspense fallback={"Loading"}>
        <DunceModel width={width} />
      </Suspense>
      {width > 800 ? <TwoPMText /> : <TwoPMTextMobile />}
      <EffectComposer>
        {/* Noise adds the grainy effect */}
        <Noise opacity={0.2} />

        {/* Vignette adds a darkening effect on the edges, enhancing the distressed look */}
      </EffectComposer>
    </Canvas>
  );
};
