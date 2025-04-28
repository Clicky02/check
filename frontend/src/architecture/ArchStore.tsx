import { createStore, useStore } from "zustand";
import { LayerDescription } from "types/layer-types";
import { combineImmer } from "utils/combineImmer";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";

type ArchEditorState = {
    selectedLayerType: string | null;
    inputId: string | null;
    outputId: string | null;
    nodes: {
        [id: string]: {
            layerTypeId: string;
            inputId: string | null;
            outputId: string | null;
            param_values: any;
            position: { x: number; y: number };
            selected: boolean;
        };
    };
    layers: { [id: string]: LayerDescription };
    nextId: number;
};

type ArchStore = ReturnType<ReturnType<typeof createInitialStore>>;
function createInitialStore() {
    return combineImmer(
        {
            selectedLayerType: null,
            inputId: null,
            outputId: null,
            nodes: {},
            layers: {},
            nextId: 0,
        } as ArchEditorState,
        (set, get) => ({
            api: {
                addNode: (layerTypeId: string, position: { x: number; y: number }) =>
                    set((state) => {
                        const newId = state.nextId++;
                        state.nodes[newId.toString()] = {
                            layerTypeId,
                            inputId: null,
                            outputId: null,
                            param_values: {},
                            position,
                            selected: false,
                        };
                    }),

                removeNode: (id: string) =>
                    set((state) => {
                        delete state.nodes[id];
                    }),

                updateNodePosition: (id: string, position: { x: number; y: number }) => {
                    const node = get().nodes[id];
                    if (node && node.position.x !== position.x && node.position.y !== position.y) {
                        set((state) => {
                            state.nodes[id].position = position;
                        });
                    }
                },

                setNodeSelected: (id: string, selected: boolean) =>
                    set((state) => {
                        if (state.nodes[id]) {
                            state.nodes[id].selected = selected;
                        }
                    }),

                connectNodes: (sourceId: string, targetId: string) =>
                    set((state) => {
                        const sourceNode = state.nodes[sourceId];
                        const targetNode = state.nodes[targetId];
                        if (sourceNode && targetNode) {
                            sourceNode.outputId = targetId;
                            targetNode.inputId = sourceId;
                        }
                    }),

                setInputId: (id: string) =>
                    set((state) => {
                        state.inputId = id;
                    }),

                setOutputId: (id: string) =>
                    set((state) => {
                        state.outputId = id;
                    }),

                setAvailableLayers: (layers: LayerDescription[]) =>
                    set((state) => {
                        state.layers = layers.reduce((acc, layer) => {
                            acc[layer.id] = layer;
                            return acc;
                        }, {} as { [id: string]: LayerDescription });
                    }),

                setSelectedLayerType: (layerType: string | null) =>
                    set((state) => {
                        state.selectedLayerType = layerType;
                    }),
            },
        })
    );
}

function createEditorStore() {
    // TODO: Set up layers
    return createStore(createInitialStore());
}

const ArchEditorContext = createContext(null as any as ReturnType<typeof createEditorStore>);

type ArchEditorProviderProps = {
    children: React.ReactNode;
    layers: LayerDescription[];
};

export const ArchEditorProvider = ({ layers, children }: ArchEditorProviderProps) => {
    const [store] = useState(() => createEditorStore());

    useEffect(() => {
        console.log("LAYERS", layers);
        store.getState().api.setAvailableLayers(layers);
    }, [store, layers]);

    // TODO: REMOVE ReactFlowProvider???????
    return (
        <ReactFlowProvider>
            <ArchEditorContext.Provider value={store}>{children}</ArchEditorContext.Provider>
        </ReactFlowProvider>
    );
};

export function useEditorStore<T>(selector: (state: ArchStore) => T): T {
    const store = useContext(ArchEditorContext);
    if (!store) {
        throw new Error("Missing Store Provider");
    }
    return useStore(store, selector);
}
