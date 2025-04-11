import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const { scene } = useGLTF('/models/jumper_mvp_v2.glb')
  const clonedScene = useRef()

  useEffect(() => {
    clonedScene.current = scene.clone(true)

    clonedScene.current.traverse((child) => {
      if (child.isMesh) {
        // Включаем всё
        child.visible = true

        // Переключение видимости
        if (child.name === 'Sleeve_Short') {
          child.visible = sleeve === 'short'
        }
        if (child.name === 'Sleeve_Long') {
          child.visible = sleeve === 'long'
        }
        if (child.name === 'Pocket_Patch') {
          child.visible = showPocket
        }

        // Исправляем прозрачность
        if (child.material) {
          child.material.transparent = false
          child.material.opacity = 1
          child.material.depthWrite = true
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene, sleeve, showPocket])

  return clonedScene.current ? <primitive object={clonedScene.current} /> : null
}
useGLTF.preload('/models/jumper_mvp_v2.glb')

