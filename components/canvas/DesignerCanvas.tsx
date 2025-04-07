"use client";
import React from 'react';
import { Stage, Layer, Rect, Circle, Text, Group } from 'react-konva';
import { useState, useRef } from 'react';
import DesignerElement from './DesignerElement';
import { NodeProps } from '@/types/node-props';
import { BpmnShapes } from '@/types/bpmn-shapes';

const DesignerCanvas = () => {
  const [bpmn, setBpmn] = useState(new Map<number, NodeProps>([
  ]))

  const handleStartClick = () => {
    console.log("Click recorded")
    setBpmn(new Map<number, NodeProps>([
      [1, { name: 'Start', shape: BpmnShapes.CIRCLE, linkTo: 1 }],
      [2, { name: 'Process', shape: BpmnShapes.RECTANGLE, linkTo: 2 }],
      [3, { name: 'Decision', shape: BpmnShapes.PYRAMID, linkTo: 3 }],
      [4, { name: 'End', shape: BpmnShapes.CIRCLE, linkTo: 4 }]
    ])
    );
  };
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Group>
          <Rect
            x={20}
            y={20}
            stroke="#555"
            strokeWidth={1}
            fill="#ddd"
            width={200}
            height={50} // Approximate height
            shadowColor="black"
            shadowBlur={5}
            shadowOffsetX={5}
            shadowOffsetY={5}
            shadowOpacity={0.1}
            cornerRadius={20}
          />
          <Text
            x={0}
            y={20}
            text="Click To Start"
            fontSize={18}
            fontFamily="Calibri"
            fill="#555"
            width={250}
            padding={15}
            align="center"
            onClick={handleStartClick}
          />
        </Group>
        {[...bpmn].map(([key, value]) => (
          <DesignerElement key={key} name={value.name} shape={value.shape} linkTo={value.linkTo} />
        ))}
      </Layer>
    </Stage>
  );
};

export default DesignerCanvas;