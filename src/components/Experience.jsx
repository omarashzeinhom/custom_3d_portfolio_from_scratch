import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Office } from "./Office";
import { Projects } from "./Projects";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(0.5, Math.min(0.9 * responsiveRatio, 0.9));

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] = useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);

    if (curSection > 3) {
      curSection = 3;
    }

    if (curSection !== section) {
      setSection(curSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // const position = new THREE.Vector3();
    if (section === 0) {
      characterContainerAboutRef.current.getWorldPosition(
        characterGroup.current.position
      );
    }
    // console.log([position.x, position.y, position.z]);

    // const quaternion = new THREE.Quaternion();
    // characterContainerAboutRef.current.getWorldQuaternion(quaternion);
    // const euler = new THREE.Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");

    // console.log([euler.x, euler.y, euler.z]);
  });

  return (
    <>
      <Background />
      <motion.group
        ref={characterGroup}
        position={[2.0072935059634513, 1.04400000000000002, 2.581801948466054]}
        rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            y: isMobile ? -viewport.height - 3.0 : -viewport.height + 0.2,
            x: isMobile ? 2.5 : 0,
            z: isMobile ? -14 : 5,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 1.5 : 1.5,
            scaleY: isMobile ? 1.5 : 1.5,
            scaleZ: isMobile ? 1.5 : 1.5,
          },
          2: {
            x: isMobile ? -0.7 : -1.5,
            y: -viewport.height * 2 + 0.2,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: isMobile ? -viewport.height * 3 + 1.9 : -viewport.height * 3 + 1,
            x: isMobile ? -1 : 1.3,
            z: isMobile ? 1 : 3,
            rotateX: isMobile ? 0 : 7,
            rotateY: isMobile ? Math.PI / 4 : 6.5,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}
      >
        <Avatar animation={characterAnimation} wireframe={section === 1} />
      </motion.group>

      <ambientLight intensity={0.9} />

      <motion.group
        position={[
          isMobile ? 0 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>

      {/* SKILLS */}
  

      <motion.group
        position={[
          0,
          isMobile ? -viewport.height : -1.5 * officeScaleRatio,
          -15,
        ]}
        animate={{
          z: section === 1 ? 0 : -10,
          y:
            section === 1
              ? -viewport.height
              : isMobile
              ? -viewport.height
              : -1.5 * officeScaleRatio,
        }}
      >
        <directionalLight position={[-1, 5, 7]} intensity={0.1} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 1.4, 2]}>
            <sphereGeometry radius={5} />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"yellow"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[2.7, 2.8, 2.7]} position={[3, 1, -18]}>
            <torusKnotGeometry tube={10} radius={5}/>
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="red"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1, 1, 1]} position={[-3, -1, -11]}>
            <torusGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"green"}
            />
          </mesh>
        </Float>
      </motion.group>
      <spotLight intensity={1} />

      <Projects />
    </>
  );
};
