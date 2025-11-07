"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import { useTheme } from "@/contexts/theme-context"

function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  )
}

export function EnhancedBackground() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={isDark ? 0.3 : 0.5} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.6 : 1} />
        <pointLight position={[-10, -10, -5]} intensity={isDark ? 0.4 : 0.5} />

        <AnimatedSphere position={[-4, 2, -5]} color={isDark ? "#ffffff" : "#0066FF"} />
        <AnimatedSphere position={[4, -2, -5]} color={isDark ? "#e0e0ff" : "#8B5CF6"} />
        <AnimatedSphere position={[0, 3, -8]} color={isDark ? "#ffffff" : "#06B6D4"} />
        <AnimatedSphere position={[-3, -3, -6]} color={isDark ? "#f0f0ff" : "#FF6B6B"} />
        <AnimatedSphere position={[3, 1, -7]} color={isDark ? "#e8f8f5" : "#10B981"} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
