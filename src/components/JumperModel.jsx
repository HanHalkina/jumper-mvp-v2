import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const { scene } = useGLTF('/models/jumper_mvp_v2.glb')
  const [cloned, setCloned] = useState()

  useEffect(() => {
    if (!scene) return
    const clone = scene.clone(true)

    clone.traverse((r) => {
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

        // Материал — защита от прозрачности
        if (r.material) {
          r.material.transparent = false
          r.material.opacity = 1
          r.material.depthWrite = true
          r.material.needsUpdate = true
        }
      }
    })

    // Масштаб и позиция модели
    clone.scale.set(0.01, 0.01, 0.01)
    clone.position.set(0, -1.2, 0)

    setCloned(clone)
  }, [scene, sleeve, showPocket])

  return cloned ? <primitive object={cloned} /> : null
}


useGLTF.preload('/models/jumper_mvp_v2.glb')


