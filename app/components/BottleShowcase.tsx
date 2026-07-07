"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Bottle() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/WaterBottle.glb");
  const { gl } = useThree();

  scene.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (!mat) return;

    if (mat.map) {
      mat.map.anisotropy = gl.capabilities.getMaxAnisotropy();
      mat.map.colorSpace = THREE.SRGBColorSpace;
      mat.map.needsUpdate = true;
    }

    if (mat.userData.fixed) return;

    // GLB ships these two parts as flat opaque white — the label already has
    // its own texture and is left untouched.
    if (mat.name?.includes("Glass")) {

      // (No transmission: the canvas has no opaque backdrop to refract
      // through, so real transmission renders flat instead of glass-like.)
      const water = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#cdd5da"),
        transparent: true,
        opacity: 0.22,
        roughness: 0.03,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        ior: 1.42,
        envMapIntensity: 3.4,
        side: THREE.DoubleSide,
      });
      mesh.material = water;
    } else if (mat.name === "M_Full_Bottle_Standard_Surface1SG") {
      // Cap and neck ring — glossy solid blue plastic
      const capPlastic = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#01619C"),
        roughness: 0.22,
        metalness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        envMapIntensity: 2,
      });
      mesh.material = capPlastic;
    }

    mat.userData.fixed = true;
  });

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} position={[0, 0.3, 0]} scale={0.3} />
    </group>
  );
}

export default function BottleShowcase() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-2, 1, 3]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#189cd8" />
        <directionalLight position={[0, -2, 3]} intensity={0.5} color="#ffffff" />
        <Suspense fallback={null}>
          <Bottle />
          <Environment preset="studio" resolution={1024} />
        </Suspense>
        <ContactShadows position={[0, -1.55, 0]} opacity={0.25} scale={6} blur={2.5} far={2} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/WaterBottle.glb");