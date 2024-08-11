import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./Model";
import { MattyText } from "./MattyText";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export const SunClouds = () => {
  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <Suspense fallback={"Loading"}>
        <Model />
      </Suspense>
      <MattyText />
      <EffectComposer>
        {/* Noise adds the grainy effect */}
        <Noise opacity={0.2} />

        {/* Vignette adds a darkening effect on the edges, enhancing the distressed look */}
      </EffectComposer>
    </Canvas>
  );
};
