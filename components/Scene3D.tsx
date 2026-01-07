
import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProductDetail } from '../types';

// Fix for React Three Fiber intrinsic elements in TypeScript
// This extends both the global JSX and React.JSX namespaces to include the three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

interface Scene3DProps {
  type: 'console' | 'controller' | 'headset' | 'monitor';
  color: string;
  id: string;
  details: ProductDetail[];
  onDetailClick: (detail: ProductDetail) => void;
  isExploring: boolean;
}

const Hotspot: React.FC<{ detail: ProductDetail; onClick: () => void }> = ({ detail, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Html position={detail.position} center distanceFactor={10}>
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-4 h-4 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 transform ${hovered ? 'scale-125 bg-[#FFE135]' : 'bg-white shadow-lg scale-100'}`}
      >
        <div className={`w-1 h-1 rounded-full ${hovered ? 'bg-black' : 'bg-black/80'}`} />
      </button>
    </Html>
  );
};

const HardwareModel: React.FC<{ type: string; id: string; color: string; details: ProductDetail[]; onDetailClick: (d: ProductDetail) => void; isExploring: boolean }> = ({ type, id, color, details, onDetailClick, isExploring }) => {
  const meshRef = useRef<THREE.Group>(null);

  const symbolTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#eeeeee';
      ctx.lineWidth = 1;
      const size = 16;
      for (let x = 0; x < 256; x += size) {
        for (let y = 0; y < 256; y += size) {
          const type = Math.floor(Math.random() * 4);
          ctx.beginPath();
          const cx = x + size / 2;
          const cy = y + size / 2;
          const r = size / 5;
          if (type === 0) {
            ctx.moveTo(cx, cy - r);
            ctx.lineTo(cx + r, cy + r);
            ctx.lineTo(cx - r, cy + r);
            ctx.closePath();
          } else if (type === 1) {
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
          } else if (type === 2) {
            ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx + r, cy + r);
            ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx - r, cy + r);
          } else {
            ctx.rect(cx - r, cy - r, r * 2, r * 2);
          }
          ctx.stroke();
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 16);
    return texture;
  }, []);

  const renderGeometry = () => {
    const isPro = id.includes('pro');
    
    switch (type) {
      case 'console':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.45, 4, 2.5]} />
              <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
            </mesh>
            <group position={[0.3, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.08, 4.2, 2.6]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.7} />
              </mesh>
              {isPro && [0.2, 0, -0.2].map((y, i) => (
                <mesh key={i} position={[0.045, y, 0]}>
                  <boxGeometry args={[0.01, 0.08, 2.6]} />
                  <meshStandardMaterial color="#121314" metalness={1} roughness={0} />
                </mesh>
              ))}
            </group>
            <group position={[-0.3, 0, 0]}>
              <mesh>
                <boxGeometry args={[0.08, 4.2, 2.6]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.7} />
              </mesh>
              {isPro && [0.2, 0, -0.2].map((y, i) => (
                <mesh key={i} position={[-0.045, y, 0]}>
                  <boxGeometry args={[0.01, 0.08, 2.6]} />
                  <meshStandardMaterial color="#121314" metalness={1} roughness={0} />
                </mesh>
              ))}
            </group>
          </group>
        );
      case 'controller':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.8, 64, 64]} />
              <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            <group rotation={[0, 0, Math.PI / 4]} position={[0.6, -0.6, 0]}>
              <mesh>
                <capsuleGeometry args={[0.35, 1.2, 16, 32]} />
                <meshStandardMaterial color={color} roughness={0.8} roughnessMap={symbolTexture} />
              </mesh>
            </group>
            <group rotation={[0, 0, -Math.PI / 4]} position={[-0.6, -0.6, 0]}>
              <mesh>
                <capsuleGeometry args={[0.35, 1.2, 16, 32]} />
                <meshStandardMaterial color={color} roughness={0.8} roughnessMap={symbolTexture} />
              </mesh>
            </group>
            <mesh position={[0, 0.2, 0.4]}>
              <boxGeometry args={[0.8, 0.5, 0.1]} />
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.9} />
            </mesh>
            <mesh position={[0.4, -0.2, 0.6]}>
              <cylinderGeometry args={[0.15, 0.15, 0.2]} />
              <meshStandardMaterial color="#121314" />
            </mesh>
            <mesh position={[-0.4, -0.2, 0.6]}>
              <cylinderGeometry args={[0.15, 0.15, 0.2]} />
              <meshStandardMaterial color="#121314" />
            </mesh>
          </group>
        );
      case 'headset':
        return (
          <group>
            <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[1, 0.1, 16, 100]} />
              <meshStandardMaterial color="#121314" metalness={0.5} roughness={0.2} />
            </mesh>
            <mesh position={[1, 0.2, 0]}>
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
            </mesh>
            <mesh position={[-1, 0.2, 0]}>
              <sphereGeometry args={[0.45, 32, 32]} />
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
            </mesh>
          </group>
        );
      case 'monitor':
        return (
          <group>
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[4, 2.4, 0.05]} />
              <meshStandardMaterial color="#000" metalness={1} roughness={0.01} />
            </mesh>
            <mesh position={[0, 1, -0.1]}>
              <boxGeometry args={[4.1, 2.5, 0.1]} />
              <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.5, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.3, 1.8]} />
              <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  };

  return (
    <Float 
      speed={isExploring ? 0 : 0.8} 
      rotationIntensity={isExploring ? 0 : 0.1} 
      floatIntensity={isExploring ? 0 : 0.1}
    >
      <group ref={meshRef}>
        {renderGeometry()}
        {!isExploring && details.map((detail) => (
          <Hotspot key={detail.id} detail={detail} onClick={() => onDetailClick(detail)} />
        ))}
      </group>
    </Float>
  );
};

const Scene3D: React.FC<Scene3DProps> = ({ type, color, id, details, onDetailClick, isExploring }) => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />
        <Suspense fallback={null}>
          <Stage 
            environment="studio" 
            intensity={0.6} 
            contactShadow={{ opacity: 0.1, blur: 4 }}
            adjustCamera={false}
          >
            <HardwareModel type={type} id={id} color={color} details={details} onDetailClick={onDetailClick} isExploring={isExploring} />
          </Stage>
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={!isExploring}
          autoRotateSpeed={0.4}
          makeDefault
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, 5, 10]} intensity={1} color="#FFE135" />
      </Canvas>
    </div>
  );
};

export default Scene3D;
