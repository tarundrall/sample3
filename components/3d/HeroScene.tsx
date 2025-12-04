import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} {...props}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#f5f5f7"
          roughness={0.1}
          metalness={0.8}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

const ParticleRing = () => {
   const ref = useRef<THREE.Points>(null);
   useFrame((state) => {
       if (ref.current) {
           ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
       }
   });

   const particlesCount = 500;
   const positions = new Float32Array(particlesCount * 3);
   
   for(let i = 0; i < particlesCount; i++) {
       const theta = Math.random() * Math.PI * 2;
       const radius = 4 + Math.random() * 2;
       positions[i*3] = radius * Math.cos(theta);
       positions[i*3+1] = (Math.random() - 0.5) * 2;
       positions[i*3+2] = radius * Math.sin(theta);
   }

   return (
       <points ref={ref}>
           <bufferGeometry>
               <bufferAttribute
                   attach="attributes-position"
                   count={particlesCount}
                   array={positions}
                   itemSize={3}
               />
           </bufferGeometry>
           <pointsMaterial size={0.03} color="#0071e3" transparent opacity={0.6} />
       </points>
   )
}

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0071e3" />
        
        <FloatingShape position={[0, 0, 0]} />
        <ParticleRing />
        
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroScene;