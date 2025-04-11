import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const { scene } = useGLTF('/models/jumper_mvp_v2.glb')

 
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
              child.visible = true

          if (child.name === 'Sleeve_Short') {
          child.visible = sleeve === 'short'
        }
        if (child.name === 'Sleeve_Long') {
          child.visible = sleeve === 'long'
        }
        if (child.name === 'Pocket_Patch') {
          child.visible = showPocket
        }

        if (child.material) {
          child.material.transparent = false
          child.material.opacity = 1
          child.material.depthWrite = true
          child.material.needsUpdate = true
        }
      }
    })
    return clone
  }, [scene, sleeve, showPocket])

  return <primitive object={clonedScene} />
}
