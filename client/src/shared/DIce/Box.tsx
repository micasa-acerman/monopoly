import { MeshProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export const Box: React.FC<{ position: number[] }> = (props) => {
  const mesh = useRef<MeshProps>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    if (mesh.current) {
      (mesh.current.rotation as { x: number }).x += 0.05;
      (mesh.current.rotation as { y: number }).y += 0.05;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
