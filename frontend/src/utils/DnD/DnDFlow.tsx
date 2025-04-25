import React, { useRef, useCallback, useState } from 'react';
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
    Node
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import NodeTray from 'components/Nodes/NodeTray';
import { DnDProvider, useDnD } from './DndContext';

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
        event.dataTransfer!.dropEffect = 'move';
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
        [screenToFlowPosition, type],
    );

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        setType(nodeType);
        event.dataTransfer!.setData('text/plain', nodeType);
        event.dataTransfer!.effectAllowed = 'move';
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
    return <ReactFlowProvider>
        <DnDProvider>
            <DnDFlow trayEntries={trayEntries} />
        </DnDProvider>
    </ReactFlowProvider>
}

export default DnDThing;


// function create_editor() {

// }

// import { createStore, useStore } from 'zustand'
// import { immer } from 'zustand/middleware/immer'
// import { LayerDescription } from 'types/layer-types';

// type ArchEditorState = {
//     inputId: number | null;
//     outputId: number | null;
//     nodes: {
//         [id: number]: {
//             layerTypeId: string;
//             inputId: number | null;
//             outputId: number | null;
//             param_values: any,
//             position: { x: number, y: number }
//         }
//     }
//     layers: { [id: string]: LayerDescription }

// }

// function createEditorStore() {

//     let a = immer((set) => ({
//         state: {
//             inputId: null,
//             outputId: null,
//             nodes: {},
//             layers: {},
//         } as ArchEditorState,
//         api: {
//             addNode: (layerTypeId: string, position: { x: number, y: number }) => {
//                 set((state) => {
//                     const newId = Object.keys(state.nodes).length + 1;
//                     state.nodes[newId] = {
//                         layerTypeId,
//                         inputId: null,
//                         outputId: null,
//                         param_values: {},
//                         position
//                     };
//                 });
//             },
//             removeNode: (id: number) => {
//                 set((state) => {
//                     delete state.nodes[id];
//                 });
//             },
//             setInputId: (id: number) => {
//                 set((state) => {
//                     state.inputId = id;
//                 });
//             },
//             setOutputId: (id: number) => {
//                 set((state) => {
//                     state.outputId = id;
//                 });
//             },
//         }
//     }))
//     return createStore()
// }

// const ArchEditorContext = React.createContext(null)

// const EditorProvider = ({ layers }) => {
//     const [store] = useState(() =>
//         createStore((set) => ({
//             input: initialBears,
//             actions: {
//                 increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
//                 removeAllBears: () => set({ bears: 0 }),
//             },
//         }))
//     )

//     return (
//         <ArchEditorContext.Provider value={store}>
//             {children}
//         </ArchEditorContext.Provider>
//     )
// }