import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder, Box, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const SchoolBuilding: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle rotation based on scroll position
      const scrollY = window.scrollY;
      // Smoothly interpolate rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, 
        (scrollY * 0.0005) + Math.PI / 8, 
        0.05
      );
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={0.9} position={[0, -0.5, 0]}>
      {/* Base Platform */}
      <RoundedBox args={[16, 0.4, 12]} radius={0.2} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#f2f2f7" />
      </RoundedBox>

      {/* Main Building Structure - Modern Clean Lines */}
      <group position={[0, 2, -1]}>
        {/* Central Block */}
        <RoundedBox args={[8, 4, 4]} radius={0.1}>
           <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
        </RoundedBox>
        
        {/* Glass Facade */}
        <Box args={[6, 3, 0.1]} position={[0, 0, 2.01]}>
          <meshPhysicalMaterial 
            color="#bfdbfe" 
            transmission={0.4} 
            opacity={0.8}
            roughness={0} 
            metalness={0.1}
            transparent
          />
        </Box>

        {/* Roof Detail */}
        <Box args={[8.5, 0.2, 4.5]} position={[0, 2.1, 0]}>
           <meshStandardMaterial color="#333" />
        </Box>
      </group>

      {/* Side Wing Left */}
      <group position={[-6, 1.5, 0]}>
        <RoundedBox args={[3.5, 3, 3]} radius={0.1}>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        <Box args={[0.1, 2, 2]} position={[1.8, 0, 0]}>
           <meshStandardMaterial color="#333" />
        </Box>
        {/* Windows */}
        <Box args={[2.5, 1, 0.1]} position={[0, 0.5, 1.51]}>
          <meshStandardMaterial color="#bfdbfe" />
        </Box>
      </group>

      {/* Side Wing Right */}
      <group position={[6, 1.5, 0]}>
        <RoundedBox args={[3.5, 3, 3]} radius={0.1}>
          <meshStandardMaterial color="#ffffff" />
        </RoundedBox>
        <Box args={[0.1, 2, 2]} position={[-1.8, 0, 0]}>
           <meshStandardMaterial color="#333" />
        </Box>
        {/* Windows */}
        <Box args={[2.5, 1, 0.1]} position={[0, 0.5, 1.51]}>
          <meshStandardMaterial color="#bfdbfe" />
        </Box>
      </group>

      {/* Entrance Area */}
      <group position={[0, 0, 2.5]}>
         {/* Canopy */}
         <Box args={[4, 0.1, 2.5]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#111" />
         </Box>
         {/* Pillars */}
         <Cylinder args={[0.1, 0.1, 1.5]} position={[-1.8, 0.75, 1]} material-color="#999" />
         <Cylinder args={[0.1, 0.1, 1.5]} position={[1.8, 0.75, 1]} material-color="#999" />
         
         {/* Steps */}
         <Box args={[5, 0.2, 1.5]} position={[0, 0.1, 0.5]}>
            <meshStandardMaterial color="#d1d5db" />
         </Box>
      </group>

      {/* Stylized Trees */}
      {[[-6, 4], [6, 4], [-9, 2], [9, 2]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
            <Cylinder args={[0.15, 0.2, 0.8]} position={[0, 0.4, 0]} material-color="#5d4037" />
            <mesh position={[0, 1.2, 0]}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial color="#4ade80" roughness={0.8} />
            </mesh>
        </group>
      ))}

      <ContactShadows opacity={0.4} scale={30} blur={2} far={4.5} />
    </group>
  );
};

export default SchoolBuilding;