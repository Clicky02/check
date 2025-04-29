import { Box, FormControlLabel, IconButton, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FieldComponent, FieldProps, TensorSize } from "./types";

type TensorSizeFieldProps = FieldProps<TensorSize> & {
    fixedDimensions?: number;
};

export const TensorSizeField = ({ label, value, onChange, fixedDimensions = -1 }: TensorSizeFieldProps) => {
    let data = value;

    const isFixed = fixedDimensions !== undefined;
    if (isFixed) {
        if (data.length < fixedDimensions) {
            data = [...data, ...Array(fixedDimensions - data.length).fill(1)];
        } else if (data.length > fixedDimensions) {
            data = [...data.slice(0, fixedDimensions)];
        }
    }

    return (
        <FormControlLabel
            control={
                <>
                    {!isFixed || (
                        <Box display={"flex"} flexDirection={"row"}>
                            <IconButton onClick={() => onChange([...data.slice(0, data.length - 1)])}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={() => onChange([...data, 1])}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    )}

                    <Box display={"flex"} flexDirection={"column"}>
                        {data.map((val, i) => (
                            <Input
                                key={i}
                                value={val}
                                type="number"
                                onChange={(evt) =>
                                    onChange([...data.slice(0, i), parseInt(evt.target.value), ...data.slice(i + 1)])
                                }
                            />
                        ))}
                    </Box>
                </>
            }
            label={label}
        />
    );
};

// @ts-ignore
export const Size2DField: FieldComponent<[number, number]> = (props) => <TensorSizeField {...props} fixedDimensions={2} />;
