import { Canvas } from "@react-three/fiber";
import { ReactElement } from "react";
import { Box } from "./Box";

interface Props {}

function DiceManager({}: Props): ReactElement {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}
export default DiceManager;
