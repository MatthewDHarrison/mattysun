import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './Model'
import { Environment } from '@react-three/drei'
import { Box, Container, Typography } from '@mui/material'
import { MattyText } from './MattyText'
import * as THREE from 'three'

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
