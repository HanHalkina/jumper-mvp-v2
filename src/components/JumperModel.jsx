import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const gltf = useGLTF('/models/jumper_mvp_v2.glb')

  if (!gltf || !gltf.scene) {
    console.warn('GLB model not loaded yet.')
    return null
  }

  const scene = gltf.scene
scene.scale.set(0.01, 0.01, 0.01)
scene.position.set(0, -1.2, 0)


  scene.traverse((child) => {
  if (child.isMesh) {
    console.log('Меш:', child.name)
    
    child.visible = true
    child.material.color.set('hotpink')

  }
})


  return <primitive object={scene} />
}

export default function JumperModel({ sleeve, showPocket }) {
  return (
    <Canvas camera={{ position: [0, 1.2, 3] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model sleeve={sleeve} showPocket={showPocket} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
