"use client"
import dynamic from "next/dynamic";
const KonvaCanvas = dynamic(() => import("@/components/canvas/DesignerCanvas"), {
  ssr: false, // Prevents SSR
});
const Bpmn = () => {
  return (
    <KonvaCanvas/>
  );
};

export default Bpmn;