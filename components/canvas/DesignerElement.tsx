"use client";
import React from 'react';
import { Rect, Circle, Group, Text } from 'react-konva';
import { NodeProps } from '@/types/node-props';
import { BpmnShapes } from '@/types/bpmn-shapes';
import { Direction } from '@/types/arrow-direction';
import { Coordinate } from '@/types/coordinate';
import { useRef } from 'react';


const newElementCoordinates = (coord: Coordinate, dir: Direction): Coordinate => {
  switch (dir) {
    case Direction.UP:
      return { xCoord: coord.xCoord, yCoord: coord.yCoord < 200 ? 0 : coord.yCoord - 200 }
    case Direction.DOWN:
      return { xCoord: coord.xCoord, yCoord: coord.yCoord + 200 }
    case Direction.LEFT:
      return { xCoord: coord.xCoord < 200 ? 0 : coord.xCoord - 200, yCoord: coord.yCoord }
    case Direction.RIGHT:
      return { xCoord: coord.xCoord + 200, yCoord: coord.yCoord }

    default:
      return { xCoord: coord.xCoord, yCoord: coord.yCoord }
  }
}

const arrowCoordinates = (
  source: Coordinate, sourceNode: NodeProps,
  dest: Coordinate, destNode: NodeProps,
  sourceDir: Direction, destDir: Direction
): number[] => {
  // 1
  if (source.yCoord == dest.yCoord && sourceDir == Direction.RIGHT && destDir == Direction.LEFT) {
    return [
      source.xCoord + (sourceNode.width ?? 0), source.yCoord + (sourceNode.height ?? 0) / 2,
      dest.xCoord, dest.yCoord + (destNode.height ?? 0) /2
    ]
  } 
  // 2 
  else if (source.yCoord == dest.yCoord && sourceDir == Direction.LEFT && destDir == Direction.RIGHT) {
    return [
      source.xCoord, source.yCoord + (sourceNode.height ?? 0) / 2 ,
      dest.xCoord + (destNode.width ?? 0), dest.yCoord  + (sourceNode.height ?? 0) / 2 
    ]
  } 
  // 3
  else if (source.xCoord == dest.xCoord && sourceDir == Direction.DOWN && destDir == Direction.UP) {
    return [
      source.xCoord + (sourceNode.width ?? 0) / 2, source.yCoord + (sourceNode.height ?? 0) ,
      dest.xCoord + (destNode.width ?? 0) / 2, dest.yCoord
    ]
  }
  // 4
  else if (source.xCoord == dest.xCoord && sourceDir == Direction.UP && destDir == Direction.DOWN) {
    return [
      source.xCoord + (sourceNode.width ?? 0) / 2, source.yCoord ,
      dest.xCoord + (destNode.width ?? 0) / 2, dest.yCoord + (destNode.height ?? 0)
    ]
  }
  // 5
  else if (source.xCoord < dest.xCoord && source.yCoord < dest.yCoord && sourceDir == Direction.RIGHT && destDir == Direction.LEFT) {
    return [
      source.xCoord + (sourceNode.width ?? 0), source.yCoord + (sourceNode.height ?? 0) / 2 ,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, source.yCoord + (sourceNode.height ?? 0) / 2,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, dest.yCoord + (destNode.height ?? 0) / 2,
      dest.xCoord , dest.yCoord + (destNode.height ?? 0) / 2,
    ]
  }
  // 6
  else if (source.xCoord < dest.xCoord && source.yCoord > dest.yCoord && sourceDir == Direction.RIGHT && destDir == Direction.LEFT) {
    return [
      source.xCoord + (sourceNode.width ?? 0), source.yCoord + (sourceNode.height ?? 0) / 2 ,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, source.yCoord + (sourceNode.height ?? 0) / 2,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, dest.yCoord + (destNode.height ?? 0) / 2,
      dest.xCoord , dest.yCoord + (destNode.height ?? 0) / 2,
    ]
  }
  // 7
  else if (source.xCoord < dest.xCoord && source.yCoord > dest.yCoord && sourceDir == Direction.RIGHT && destDir == Direction.LEFT) {
    return [
      source.xCoord + (sourceNode.width ?? 0), source.yCoord + (sourceNode.height ?? 0) / 2 ,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, source.yCoord + (sourceNode.height ?? 0) / 2,
      (source.xCoord + dest.xCoord + (sourceNode.width ?? 0) ) / 2, dest.yCoord + (destNode.height ?? 0) / 2,
      dest.xCoord , dest.yCoord + (destNode.height ?? 0) / 2,
    ]
  }
  return [0, 0, 0, 0]
}

const DesignerElement = (elementProps: NodeProps) => {
  let content;

  switch (elementProps.shape) {
    case BpmnShapes.CIRCLE:
      content =
        <Group
          draggable
        >
          <Circle
            x={100}
            y={200}
            stroke="#555"
            strokeWidth={1}
            fill="#ddd"
            width={100}
            height={100} // Approximate height
            shadowColor="black"
            shadowBlur={2}
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowOpacity={0.1}
          />
          <Text
            x={50}
            y={200}
            text={elementProps.name}
            fontSize={12}
            fill="#333"
            width={100}
            height={20}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      break;
    case BpmnShapes.RECTANGLE:
      content =
        <Group
          draggable
        >

          <Rect
            x={300}
            y={150}
            stroke="#555"
            strokeWidth={1}
            fill="#ddd"
            width={200}
            height={100} // Approximate height
            shadowColor="black"
            shadowBlur={2}
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowOpacity={0.1}
            cornerRadius={10}
          />
          <Text
            x={300}
            y={150}
            text={elementProps.name}
            fontSize={12}
            fill="#333"
            width={100}
            height={20}
            align="center"
            verticalAlign="middle"
          />

        </Group>
      break;
    default:
      content =
        <Group
          draggable
        >
          <Rect
            x={700}
            y={150}
            stroke="#555"
            strokeWidth={1}
            fill="#ddd"
            width={75}
            height={75} // Approximate height
            shadowColor="black"
            shadowBlur={2}
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowOpacity={0.1}
            rotation={45}
          />
          <Text
            x={700}
            y={150}
            text={elementProps.name}
            fontSize={12}
            fill="#333"
            width={100}
            height={20}
            align="center"
            verticalAlign="middle"
          />
        </Group>
      break;
  }
  return (
    content
  );
};

export default DesignerElement;