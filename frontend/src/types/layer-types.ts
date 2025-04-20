import { Parameter } from "utils/parameters"

export type LayerDescription = {
    id: string,
    inputs: {}[],
    name: string,
    parameters: Parameter<any>[]
}