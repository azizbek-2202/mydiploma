"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei"
import type * as THREE from "three"
import { useTheme } from "@/contexts/theme-context"

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
        <MeshDistortMaterial
          color="#0066ff"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#0066ff"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>

      {/* Inner Ring */}
      <mesh rotation={[-Math.PI / 4, 0, Math.PI / 2]}>
        <torusGeometry args={[2.8, 0.03, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export function FloatingGlobe() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.8 : 1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? "#8b5cf6" : "#0066ff"} />
        <pointLight position={[10, -10, -5]} intensity={0.3} color="#06b6d4" />

        {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

        <AnimatedGlobe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}
