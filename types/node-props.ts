import {BpmnShapes} from '@/types/bpmn-shapes'
export type NodeProps = {
  name: string,
  shape: BpmnShapes,
  linkTo: number | null,
  coord: number[] | null,
  width: number | null,
  height: number | null,
}