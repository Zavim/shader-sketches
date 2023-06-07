import * as THREE from "three";
import { Flex, Box } from "@react-three/flex";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import defaultVertShader from "../shaders/vert.vs";
import pinkFragShader from "../shaders/pink.frag";
import fragCoordShader from "../shaders/fragCoord.frag";
import linearGraphShader from "../shaders/linearGraph.frag";
import newShader from "../shaders/fractal.frag";

function PinkPlane() {
  return (
    <mesh>
      <planeGeometry />
      <shaderMaterial
        vertexShader={defaultVertShader}
        fragmentShader={pinkFragShader}
      />
    </mesh>
  );
}
function FragCoordPlane() {
  return (
    <mesh>
      <planeGeometry />
      <shaderMaterial
        vertexShader={defaultVertShader}
        fragmentShader={fragCoordShader}
      />
    </mesh>
  );
}
function LinearGraphPlane() {
  return (
    <mesh>
      <planeGeometry />
      <shaderMaterial
        vertexShader={defaultVertShader}
        fragmentShader={linearGraphShader}
      />
    </mesh>
  );
}
function FractalPlane() {
  const scale = new THREE.Vector3(4, 4, 1);
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      u_scale: { value: scale },
      u_time: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={defaultVertShader}
        fragmentShader={newShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Cube(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((_state, delta) => (mesh.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHovered(true)}
      onPointerOut={(_event) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        centerAnchor
      >
        <group name={"row1"}>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            marginBottom={1}
          >
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <FractalPlane />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <PinkPlane />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <Cube position={[0, 0, 0]} />
            </Box>
          </Box>
        </group>

        <group name={"row2"}>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            marginBottom={1}
          >
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <Cube position={[0, 0, 0]} />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <FragCoordPlane />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <Cube position={[0, 0, 0]} />
            </Box>
          </Box>
        </group>

        <group name={"row3"}>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            marginBottom={1}
          >
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <Cube position={[0, 0, 0]} />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <LinearGraphPlane />
            </Box>
            <Box paddingLeft={1} paddingRight={1} centerAnchor>
              <Cube position={[0, 0, 0]} />
            </Box>
          </Box>
        </group>
      </Flex>

      <OrbitControls />
    </Canvas>
  );
}
