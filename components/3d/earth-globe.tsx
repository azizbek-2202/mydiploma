"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useTheme } from "@/contexts/theme-context"
import { useRef, useMemo } from "react"
import * as THREE from "three"

// Procedural Earth material
function ProceduralEarth() {
  const meshRef = useRef<THREE.Mesh>(null!)

  // Generate procedural colors for continents and oceans
  const material = useMemo(() => {
    const mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x1e90ff), // Ocean base
      shininess: 10,
      emissive: new THREE.Color(0x001144),
    })

    return mat
  }, [])

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[2, 128, 128]} />
    </mesh>
  )
}

// Procedural clouds layer
function ProceduralClouds() {
  const cloudRef = useRef<THREE.Mesh>(null!)

  return (
    <mesh ref={cloudRef} scale={1.02}>
      <sphereGeometry args={[2, 128, 128]} />
      <meshPhongMaterial
        color={0xffffff}
        transparent
        opacity={0.15}
        shininess={0}
        specular={0x444444}
      />
    </mesh>
  )
}

// Procedural atmosphere glow
function Atmosphere() {
  return (
    <mesh scale={1.08}>
      <sphereGeometry args={[2, 128, 128]} />
      <meshBasicMaterial
        color={0x3b82f6}
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export function EarthGlobe() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} gl={{ antialias: true }}>
        <Stars radius={100} depth={50} count={2000} factor={4} fade />
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight
          position={[5, 3, 5]}
          intensity={isDark ? 1 : 0.9}
          color={isDark ? "#93c5fd" : "#facc15"}
        />
        <pointLight
          position={[-5, -3, -5]}
          intensity={isDark ? 0.4 : 0.2}
          color={isDark ? "#a855f7" : "#60a5fa"}
        />

        <ProceduralEarth />
        <ProceduralClouds />
        <Atmosphere />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
