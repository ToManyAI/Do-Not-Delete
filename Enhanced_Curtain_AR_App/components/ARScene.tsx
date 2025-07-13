
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

declare global {
  interface Window {
    MINDAR: any;
  }
}

export const ARScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricIndex, setFabricIndex] = useState(0);

  const swatches = [
    '/Kirkwood Smog.jpg',
    // Add more swatch paths here as needed
  ];

  useEffect(() => {
    const startAR = async () => {
      if (!window.MINDAR) {
        console.error('MindAR library not loaded.');
        return;
      }

      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: containerRef.current,
        imageTargetSrc: '/targets.mind',
      });

      const { renderer, scene, camera } = mindarThree;

      // Setup lighting for realism
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(0, 1, 1).normalize();
      scene.add(ambientLight);
      scene.add(directionalLight);

      const anchor = mindarThree.addAnchor(0);

      // Load curtain model and apply texture
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();

      loader.load('/curtain.glb', (gltf) => {
        const curtain = gltf.scene;
        curtain.scale.set(0.5, 0.5, 0.5);

        // Animate subtle drape swaying
        let sway = 0;
        const animate = () => {
          sway += 0.01;
          curtain.rotation.z = 0.05 * Math.sin(sway);
        };

        // Apply fabric texture
        const updateTexture = (index: number) => {
          const texture = textureLoader.load(swatches[index]);
          curtain.traverse((child: any) => {
            if (child.isMesh) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          });
        };

        updateTexture(fabricIndex);
        anchor.group.add(curtain);

        mindarThree.start().then(() => {
          renderer.setAnimationLoop(() => {
            animate();
            renderer.render(scene, camera);
          });
        });
      });
    };

    startAR();
  }, [fabricIndex]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100vh', position: 'relative' }}
      />
      <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10 }}>
        <button
          onClick={() =>
            setFabricIndex((prev) => (prev + 1) % swatches.length)
          }
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#ffffffdd',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Change Fabric
        </button>
      </div>
    </>
  );
};
