import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* Colors match site: accent-green (menu), accent-cyan (titles), text-dim (sections) */
function WireframeTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
        <torusKnotGeometry args={[0.6, 0.2, 48, 12]} />
        <meshBasicMaterial
          color="#3fb950"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  )
}

function WireframeIcosahedron() {
  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh position={[1.2, 0.3, -1]} rotation={[0.3, 0.5, 0]}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial
          color="#e6edf3"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

function WireframeCube() {
  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
      <mesh position={[-1, -0.2, -0.8]} rotation={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial
          color="#58a6ff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <WireframeTorus />
        <WireframeIcosahedron />
        <WireframeCube />
      </Canvas>
    </div>
  )
}
