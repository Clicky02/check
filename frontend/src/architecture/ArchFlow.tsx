import "@xyflow/react/dist/style.css";

import React, { useCallback, useEffect, useMemo } from "react";
import { ReactFlow, Controls, useReactFlow, Background, Node, OnNodesChange, OnConnect } from "@xyflow/react";
import { useEditorStore } from "./ArchStore";
import LayerNode from "components/Nodes/ArchitectureLayerNode";

export const ArchFlow = () => {
    const { screenToFlowPosition } = useReactFlow();
    const editorAPI = useEditorStore((state) => state.api);
    const type = useEditorStore((state) => state.selectedLayerType);
    const nodes = useEditorStore((state) => state.nodes);

    const flowNodes = useMemo(
        () =>
            Object.keys(nodes).map((key) => {
                const node = nodes[key];
                return {
                    id: key,
                    type: "layer",
                    position: node.position,
                    selected: node.selected,
                    data: {
                        id: key,
                    },
                };
            }),
        [nodes]
    );
    const flowEdges = useMemo(() => {
        const edges: any[] = [];

        Object.keys(nodes).forEach((key) => {
            const node = nodes[key];
            if (node.inputId) {
                edges.push({
                    id: `${node.inputId}-${key}`,
                    source: node.inputId,
                    target: key,
                    type: "smoothstep",
                });
            }
            if (node.outputId) {
                edges.push({
                    id: `${key}-${node.outputId}`,
                    source: key,
                    target: node.outputId,
                    type: "smoothstep",
                });
            }
        });

        return edges;
    }, [nodes]);

    const onConnect = useCallback<OnConnect>((connection) => {
        console.log("CONNECT");
        editorAPI.connectNodes(connection.source, connection.target);
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer!.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!type) {
                return;
            }

            editorAPI.addNode(
                type,
                screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                })
            );
        },
        [screenToFlowPosition, type]
    );

    const onNodesChange = useCallback<OnNodesChange>(
        (changes) =>
            changes.forEach((val) => {
                switch (val.type) {
                    case "remove":
                        editorAPI.removeNode(val.id);
                        break;
                    case "position":
                        editorAPI.updateNodePosition(val.id, val.position!);
                        break;
                    case "select":
                        editorAPI.setNodeSelected(val.id, val.selected);
                        break;
                }
            }),
        []
    ); // [setNodes]

    const nodeTypes = useMemo(() => ({ layer: LayerNode }), []);
    return (
        <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={() => console.log("changed")}
            onConnect={onConnect}
            onDrop={onDrop}
            // @ts-ignore
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            style={{}}
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
};
