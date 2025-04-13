import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const { scene } = useGLTF('/models/jumper_mvp_v2.glb')
  const sceneRef = useRef()

  const [clonedScene, setClonedScene] = useState()

  useEffect(() => {
    if (!scene) return
    const clone = scene.clone(true)

    clone.traverse((child) => {
      if (child.isMesh) {
        // Управление мешами
        if (child.name === 'Sleeve_Short') {
          child.visible = sleeve === 'short'
        }
        if (child.name === 'Sleeve_Long') {
          child.visible = sleeve === 'long'
        }
        if (child.name === 'Pocket_Patch') {
          child.visible = showPocket
        }

        // Материалы
        if (child.material) {
          child.material.transparent = false
          child.material.opacity = 1
          child.material.depthWrite = true
          child.material.needsUpdate = true
          console.log(`Рукав: ${sleeve}, Карман: ${showPocket}`)

child.traverse((child) => {
  if (child.isMesh) {
    console.log(`→ ${child.name}, visible = ${child.visible}`)

    // отладка условий:
    if (child.name === 'Sleeve_Short') console.log('=> Это короткий рукав')
    if (child.name === 'Sleeve_Long') console.log('=> Это длинный рукав')
    if (child.name === 'Pocket_Patch') console.log('=> Это карман')
  }
})

        }
      }
    })

    // Устанавливаем масштаб и позицию
    clone.scale.set(0.01, 0.01, 0.01)
    clone.position.set(0, -1.2, 0)

    setClonedScene(clone)
  }, [scene, sleeve, showPocket])

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


