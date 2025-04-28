import { Box, Checkbox, FormControlLabel, Input, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Parameter, ParameterTypeEnum } from "utils/parameters";

type NodeParameterProps = { parameter: Parameter<any> };

function NodeParameter({ parameter }: NodeParameterProps) {
    let parameterComp: ReactNode;

    switch (parameter.type) {
        case ParameterTypeEnum.Bool:
            parameterComp = (
                <Box>
                    <FormControlLabel control={<Checkbox />} label={parameter.name} />
                </Box>
            );
            break;
        case ParameterTypeEnum.Float:
            parameterComp = (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "number" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
            break;
        case ParameterTypeEnum.Int:
            parameterComp = (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "number" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
            break;
        case ParameterTypeEnum.Size2D:
            parameterComp = (
                <Box>
                    <Typography>{parameter.name}</Typography>
                </Box>
            );
            break;
        case ParameterTypeEnum.String:
            parameterComp = (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "string" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
            break;
    }

    return <>{parameterComp}</>;
}

export default NodeParameter;
