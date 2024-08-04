import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './Model'
import { Environment } from '@react-three/drei'
import { Box, Container, Typography } from '@mui/material'

export const SunClouds = () => {




  return (
    <Canvas dpr={[1, 2]}>
      {/* <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} /> */}
      <Model />

    </Canvas>
  )
}
