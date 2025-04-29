import { ValueOf } from "utils/types/value-of";

export type TensorSize = number[];

export type ParameterId = string;
export type ParameterName = string;

export const ParamTypeEnum = {
    Bool: 'bool',
    Float: 'float',
    Int: 'int',
    Size2D: 'size2d',
    String: 'str',
} as const;
export type ParamTypeMap = {
    [ParamTypeEnum.Bool]: boolean,
    [ParamTypeEnum.Float]: number,
    [ParamTypeEnum.Int]: number,
    [ParamTypeEnum.Size2D]: [number, number],
    [ParamTypeEnum.String]: string,
};
export type ParamTypeStr = ValueOf<typeof ParamTypeEnum>;


export type Parameter<T extends ParamTypeStr> = {
    type: T;
    id: ParameterId;
    name: ParameterName;
    // TODO: CONSTRAINTS 
    // constraint: AnyConstraint<T> | undefined, 
    constraint: any;
    default: ParameterValue<T>;
};
type DistributeParameter<Union extends ParamTypeStr> = Union extends any ? Parameter<Union> : never;
export type AnyParameter = DistributeParameter<ParamTypeStr>


export type ParameterValue<T extends ParamTypeStr> = {
    type: T;
    val: ParamTypeMap[T];
};
type DistributeParameterValue<Union extends ParamTypeStr> = Union extends any ? ParameterValue<Union> : never;
export type AnyParameterValue = DistributeParameterValue<ParamTypeStr>;
export function ParameterValue<T extends ParamTypeStr>(type: T, val: ParamTypeMap[T]): ParameterValue<T> {
    return { type, val };
}


export type FieldProps<T> = {
    label: string,
    value: T
    onChange: (val: T) => void
}
export type FieldComponent<T> = React.FC<FieldProps<T>>