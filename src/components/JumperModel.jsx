import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const { scene } = useGLTF('/models/jumper_mvp_v2.glb')
  scene.traverse((r) => {
  if (r.isMesh) {
    // Управление видимостью
    if (r.name === 'Sleeve_Short') {
      r.visible = sleeve === 'short'
    } else if (r.name === 'Sleeve_Long') {
      r.visible = sleeve === 'long'
    } else if (r.name === 'Pocket_Patch') {
      r.visible = showPocket
    } else {
      r.visible = true
    }

    // Защита от прозрачности
    if (r.material) {
      r.material.transparent = false
      r.material.opacity = 1
      r.material.depthWrite = true
      r.material.needsUpdate = true
    }
  }
})

  return clonedScene ? <primitive object={clonedScene} ref={sceneRef} /> : null
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

useGLTF.preload('/models/jumper_mvp_v2.glb')


