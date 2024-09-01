import React from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./Model";
import { MattyText } from "./MattyText";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

interface ISceneProps {
  isPooing: boolean;
}

export const Scene = ({ isPooing }: ISceneProps) => {
  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={"Loading"}>
        <Model isPooing={isPooing} />
      </Suspense>
      {/* <MattyText /> */}
    </Canvas>
  );
};
