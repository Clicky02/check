import React, { useRef, useCallback, useState, useEffect } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
    Edge,
    Connection,
    Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import NodeTray from "components/Nodes/NodeTray";
import { DnDProvider, useDnD } from "./DndContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ trayEntries }: any) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type, setType] = useDnD();

    const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer!.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        setType(nodeType);
        event.dataTransfer!.setData("text/plain", nodeType);
        event.dataTransfer!.effectAllowed = "move";
    };

    return (
        <div className="dndflow" style={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <NodeTray nodes={trayEntries} />
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    // @ts-ignore
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    fitView
                    style={{}}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
        </div>
    );
};

function DnDThing({ trayEntries }: any) {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <DnDFlow trayEntries={trayEntries} />
            </DnDProvider>
        </ReactFlowProvider>
    );
}

export default DnDThing;
