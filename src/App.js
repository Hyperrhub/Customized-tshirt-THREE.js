import { AccumulativeShadows, Decal, Environment, RandomizedLight, useGLTF , useTexture  } from '@react-three/drei';
import { Center, OrbitControls, } from '@react-three/drei';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import {easing} from 'maath';
import * as THREE from 'three';
import { useSnapshot } from 'valtio'
import { state } from './Store'

function App({ position= [ -1, 0 ,2.5] ,fov = 25}) {
  return (
    <Canvas

      shadows
      gl={{preserveDrawingBuffer: true}}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      camera={{ position, fov }}
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
          <Backdrop></Backdrop>
        <Center>
          <Shirt ></Shirt>
        </Center>
      </CameraRig>

      <OrbitControls />
    </Canvas>
  );
}

function Shirt (props){
  const snap = useSnapshot(state)
  const texture = useTexture(`/${snap.selectedDecal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  // materials['Material.001'].color= new THREE.Color(snap.selectedColor)

  useFrame((state , delta)=>{
easing.dampC(materials.lambert1.color , snap.selectedColor, 0.25 , delta)
  })
  return (
   
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}>
        <Decal 
        position={[0, 0.04, 0.15]}
        rotation={[0,0,0]}
        scale={0.15}
        opacity={0.7}
        map={texture}
        > </Decal>
      </mesh>
  )
}

function Backdrop (){
const shadows = useRef()
useFrame((state , delta)=>{
  easing.dampC(shadows.current.getMesh().material.color, state.selectedColor, 0.25 , delta)
    })
  return (<AccumulativeShadows 
    ref={shadows}
  temporal
  frames={60}
  alphaTest={0.15}
  scale={5}
  rotation={[Math.PI /2 ,0, 0]}
  position={[0,0,-0.14]}
   >
<RandomizedLight
amount={4}
radius={9}
intensity={0.55}
ambient={0.25}
position={[5,5,-10]}>
</RandomizedLight>
<RandomizedLight
amount={4}
radius={5}
intensity={0.25}
ambient={0.55}
position={[-5,5,-9]}>
</RandomizedLight>

  </AccumulativeShadows>)
}

function CameraRig ({children}){
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta)=>{
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width/ 4 : 0, 0 ,2] ,0.25 , delta)
    easing.dampE(
      group.current.rotation,
       [state.pointer.y /5 , -state.pointer.x /2 , 0], 
       0.25,
       delta
    )
  })
return <group ref={group}>
  {children}
</group>
}

useGLTF.preload('/oversized_t-shirt.glb');
['/react.png','/three2.png','/pmndrs.png'].forEach(useTexture.preload)

export default App;
