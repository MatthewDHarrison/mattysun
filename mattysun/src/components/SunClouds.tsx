import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './Model'
import { MattyText } from './MattyText'

export const SunClouds = () => {
  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={0.7} />
      <Suspense fallback={'Loading'}>
        <Model />
      </Suspense>
      <MattyText />
    </Canvas>
  )
}
