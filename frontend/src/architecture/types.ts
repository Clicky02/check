import { AnyParameterValue, Parameter, TensorSize } from "param/types";

export type LayerID = string;
export type LayerInstanceID = number;

export type LayerDescription = {
    id: string,
    inputs: {}[],
    name: string,
    parameters: Parameter<any>[]
}


export interface InputLayerConfig {
    instance_id: LayerInstanceID;
    size: TensorSize;
}

export interface NetworkLayerConfig {
    instance_id: LayerInstanceID; // a unique identifier for this layer instance
    layer_id: LayerID; // The ID of the layer type
    input: LayerInstanceID[]; // the layer or input that feeds into this network
    param_values: [string, AnyParameterValue][]; // the values for each parameter in the layer

    // Optionally, you can implement get_params as a function that processes param_values
    // get_params?(): { [key: string]: any };
}

export interface ArchitectureConfig {
    inputs: InputLayerConfig[];
    layers: NetworkLayerConfig[];
    output: LayerInstanceID; // id of layers that are outputs
}

