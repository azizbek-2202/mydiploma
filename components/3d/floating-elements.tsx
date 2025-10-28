"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus } from "@react-three/drei"
import type * as THREE from "three"

function FloatingShape({ position, shape }: { position: [number, number, number]; shape: "box" | "sphere" | "torus" }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  const material = <meshStandardMaterial color="#f9c500" metalness={0.8} roughness={0.2} transparent opacity={0.6} />

  return (
    <>
      {shape === "box" && (
        <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
          {material}
        </Box>
      )}
      {shape === "sphere" && (
        <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
          {material}
        </Sphere>
      )}
      {shape === "torus" && (
        <Torus ref={meshRef} position={position} args={[0.3, 0.1, 16, 32]}>
          {material}
        </Torus>
      )}
    </>
  )
}

export function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingShape position={[-3, 2, 0]} shape="box" />
        <FloatingShape position={[3, -1, 0]} shape="sphere" />
        <FloatingShape position={[0, 3, -2]} shape="torus" />
        <FloatingShape position={[-2, -2, 1]} shape="sphere" />
        <FloatingShape position={[2, 1, -1]} shape="box" />
      </Canvas>
    </div>
  )
}
