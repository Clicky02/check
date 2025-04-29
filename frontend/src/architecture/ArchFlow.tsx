import "@xyflow/react/dist/style.css";

import React, { useCallback, useMemo } from "react";
import { ReactFlow, Controls, useReactFlow, Background, OnNodesChange, OnConnect, OnEdgesChange, Edge } from "@xyflow/react";
import { useEditorStore } from "./ArchStore";
import { ArchOutputNode } from "components/Nodes/ArchitectureOutputNode";
import { ArchLayerNode } from "components/Nodes/ArchitectureLayerNode";
import { ArchInputNode } from "components/Nodes/ArchitectureInputNode";

export const ArchFlow = () => {
    const { screenToFlowPosition } = useReactFlow();
    const editorAPI = useEditorStore((state) => state.api);
    const type = useEditorStore((state) => state.selectedLayerType);
    const nodes = useEditorStore((state) => state.nodes);

    const flowNodes = useMemo(
        () =>
            Object.keys(nodes).map((key) => {
                const node = nodes[key];
                if (node.type == "layer") {
                    return {
                        id: key,
                        type: "layer",
                        position: node.position,
                        selected: node.selected,
                        data: {
                            id: key,
                        },
                    };
                } else {
                    return {
                        id: key,
                        type: "io",
                        position: node.position,
                        selected: node.selected,
                        data: {
                            id: key,
                            iotype: node.type,
                        },
                    };
                }
            }),
        [nodes]
    );

    const flowEdges = useMemo(() => {
        const edges: Edge[] = [];

        Object.keys(nodes).forEach((key) => {
            const node = nodes[key];
            if (node.inputId) {
                edges.push({
                    id: `${node.inputId}-${key}`,
                    source: node.inputId,
                    target: key,
                    deletable: true,
                });
            }
        });

        return edges;
    }, [nodes]);

    const onConnect = useCallback<OnConnect>(
        (connection) => editorAPI.connectNodes(connection.source, connection.target),
        [editorAPI]
    );

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

            editorAPI.addLayerNode(
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
        [editorAPI]
    );
    const onEdgesChange = useCallback<OnEdgesChange>(
        (changes) =>
            changes.forEach((val) => {
                switch (val.type) {
                    case "remove":
                        const [sourceId, targetId] = val.id.split("-");
                        console.log("REMOVE", val.id, sourceId, targetId);
                        editorAPI.disconnectNodes(sourceId, targetId);
                        break;
                }
            }),
        []
    );

    const nodeTypes = useMemo(() => ({ layer: ArchLayerNode, input: ArchInputNode, output: ArchOutputNode }), []);
    return (
        <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            // @ts-ignore
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            style={{}}
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
};
