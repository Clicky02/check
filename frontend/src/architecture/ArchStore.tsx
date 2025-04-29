import { createStore, useStore } from "zustand";
import { combineImmer } from "utils/combineImmer";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { LayerDescription } from "./types";
import { AnyParameterValue, TensorSize } from "param/types";

export type BaseNodeInfo = {
    inputId: string | null;
    outputId: string | null;
    position: { x: number; y: number };
    selected: boolean;
};

export type LayerNodeInfo = BaseNodeInfo & {
    type: "layer";
    layerTypeId: string;
    param_values: { [id: string]: AnyParameterValue };
};

function LayerNodeInfo(
    layerTypeId: string,
    position: { x: number; y: number },
    inputId: string | null = null,
    outputId: string | null = null,
    param_values: any = {},
    selected: boolean = false
): LayerNodeInfo {
    return {
        type: "layer",
        layerTypeId,
        inputId,
        outputId,
        position,
        param_values,
        selected,
    };
}

export type InputNodeInfo = BaseNodeInfo & {
    type: "input";
    size: TensorSize;
};

function InputNodeInfo(
    size: TensorSize,
    position: { x: number; y: number },
    inputId: string | null = null,
    outputId: string | null = null,
    selected: boolean = false
): InputNodeInfo {
    return {
        type: "input",
        size,
        inputId,
        outputId,
        position,
        selected,
    };
}

export type OutputNodeInfo = BaseNodeInfo & {
    type: "output";
};

function OutputNodeInfo(
    position: { x: number; y: number },
    inputId: string | null = null,
    outputId: string | null = null,
    selected: boolean = false
): OutputNodeInfo {
    return {
        type: "output",
        inputId,
        outputId,
        position,
        selected,
    };
}

export type NodeInfo = LayerNodeInfo | InputNodeInfo | OutputNodeInfo;

export type ArchEditorState = {
    selectedLayerType: string | null;
    inputId: string | null;
    outputId: string | null;
    nodes: { [id: string]: NodeInfo };
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
                addLayerNode: (layerTypeId: string, position: { x: number; y: number }) =>
                    set((state) => {
                        const newId = state.nextId++;
                        state.nodes[newId.toString()] = LayerNodeInfo(layerTypeId, position);
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

                updateParameterValue: (id: string, paramId: string, value: AnyParameterValue) =>
                    set((state) => {
                        const node = state.nodes[id];
                        if (node && node.type === "layer") {
                            node.param_values[paramId] = value;
                        }
                    }),

                updateInputSize: (id: string, size: TensorSize) =>
                    set((state) => {
                        const node = state.nodes[id];
                        if (node && node.type === "input") {
                            node.size = size;
                        }
                    }),

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

                disconnectNodes: (sourceId: string, targetId: string) =>
                    set((state) => {
                        const sourceNode = state.nodes[sourceId];
                        const targetNode = state.nodes[targetId];
                        if (sourceNode && targetNode) {
                            sourceNode.outputId = null;
                            targetNode.inputId = null;
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

    useEffect(() => store.getState().api.setAvailableLayers(layers), [store, layers]);

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
