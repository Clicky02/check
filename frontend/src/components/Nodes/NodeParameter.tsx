import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { Parameter, ParameterTypeEnum } from "utils/parameters";

type NodeParameterProps = { parameter: Parameter<any> };

function NodeParameter({ parameter }: NodeParameterProps) {
    switch (parameter.type) {
        case ParameterTypeEnum.Bool:
            return (
                <Box>
                    <FormControlLabel control={<Checkbox />} label={parameter.name} />
                </Box>
            );
        case ParameterTypeEnum.Float:
            return (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "number" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
        case ParameterTypeEnum.Int:
            return (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "number" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
        case ParameterTypeEnum.Size2D:
            return (
                <Box>
                    <Typography>{parameter.name}</Typography>
                </Box>
            );
        case ParameterTypeEnum.String:
            return (
                <Box>
                    <TextField
                        label={parameter.name}
                        defaultValue={parameter.default}
                        slotProps={{ htmlInput: { type: "string" } }}
                        size="small"
                    ></TextField>
                </Box>
            );
    }
}

export default NodeParameter;
