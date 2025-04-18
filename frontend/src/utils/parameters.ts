import { ValueOf } from "./value-of";

export const ParameterTypeEnum = {
    Bool: 'bool',
    Float: 'float',
    Int: 'int',
    Size2D: 'size2d',
    String: 'str',
} as const;

export type ParameterType = ValueOf<typeof ParameterTypeEnum>;

export type ParameterId = number;
export type ParameterName = string;

export type Parameter<T> = {
    id: ParameterId,
    name: ParameterName,
    // TODO: CONSTRAINTS 
    // constraint: AnyConstraint<T> | undefined, 
    constraint: any,
    default: ParameterValue<any> | undefined,
    type: ParameterType,
}

export type ParameterValue<T> = {
    val: T,
    type: ParameterType
}