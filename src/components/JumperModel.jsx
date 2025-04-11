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

  scene.traverse((child) => {
  if (child.isMesh) {
    console.log('Меш:', child.name)
    console.log('→ позиция:', child.position)
    console.log('→ масштаб:', child.scale)
    console.log('→ материал:', child.material)
    child.visible = true
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
