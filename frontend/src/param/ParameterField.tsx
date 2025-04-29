import {
    Parameter,
    ParamTypeEnum,
    ParamTypeStr as ParamTypeStr,
    ParamTypeMap as ParamTypeMap,
    FieldComponent,
    ParameterValue,
    AnyParameterValue,
} from "param/types";
import { BoolField } from "./BoolField";
import { FloatField } from "./FloatField";
import { IntField } from "./IntField";
import { Size2DField } from "./TensorSizeField";
import { StringField } from "./StringField";

type NodeParameterProps<T extends ParamTypeStr> = T extends any
    ? {
          parameter: Parameter<T>;
          value?: ParamTypeMap[T];
          onChange: (newData: AnyParameterValue) => void;
      }
    : never;
type Props = NodeParameterProps<ParamTypeStr>;

const FieldComponentMap: Record<ParamTypeStr, FieldComponent<any>> = {
    [ParamTypeEnum.Bool]: BoolField,
    [ParamTypeEnum.Float]: FloatField,
    [ParamTypeEnum.Int]: IntField,
    [ParamTypeEnum.Size2D]: Size2DField,
    [ParamTypeEnum.String]: StringField,
};

function ParameterField(props: Props) {
    const onChange = (val: any) => props.onChange(ParameterValue(props.parameter.type, val) as AnyParameterValue);

    const Field = FieldComponentMap[props.parameter.type];
    return <Field label={props.parameter.name} value={props.value ?? props.parameter.default.val} onChange={onChange} />;
}

export default ParameterField;
