import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const gltf = useGLTF('/models/jumper_mvp_v2.glb')
  const sceneRef = useRef()

  useFrame(() => {
    if (!sceneRef.current) return

    sceneRef.current.traverse((child) => {
      if (child.isMesh) {
        if (child.name === 'Sleeve_Short') {
          child.visible = sleeve === 'short'
        }
        if (child.name === 'Sleeve_Long') {
          child.visible = sleeve === 'long'
        }
        if (child.name === 'Pocket_Patch') {
          child.visible = showPocket
        }

        // Фикс прозрачности
        if (child.material) {
          child.material.transparent = false
          child.material.opacity = 1
          child.material.depthWrite = true
          child.material.needsUpdate = true
        }
      }
    })
  })

  return <primitive object={gltf.scene} ref={sceneRef} />
}
