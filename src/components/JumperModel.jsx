import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ sleeve, showPocket }) {
  const gltf = useGLTF('/models/jumper_mvp_v2.glb')
  const scene = gltf.scene

  useEffect(() => {
    if (!scene) return


  scene.traverse((child) => {
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


  return <primitive object={scene} />
}

 }, [scene, sleeve, showPocket])

  return <primitive object={scene} />
}
