import { Box, Checkbox, Input, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Parameter, ParameterTypeEnum } from "utils/parameters";

type NodeParameterProps = { parameter: Parameter<any> }

function NodeParameter({ parameter }: NodeParameterProps) {
    let parameterComp: ReactNode;

    switch (parameter.type) {
        case ParameterTypeEnum.Bool:
            parameterComp = <Box>
                <Typography>{parameter.name}</Typography>
                <Checkbox></Checkbox>
            </Box>
            break;
        case ParameterTypeEnum.Float:
            parameterComp = <Box>
                <Typography>{parameter.name}</Typography>
                <Input inputProps={{ type: 'number' }}></Input>
            </Box>
            break;
        case ParameterTypeEnum.Int:
            parameterComp = <Box>
                <Typography>{parameter.name}</Typography>
                <Input inputProps={{ type: 'number' }}></Input>
            </Box>
            break;
        case ParameterTypeEnum.Size2D:
            parameterComp = <Box>
                <Typography>{parameter.name}</Typography>
            </Box>
            break;
        case ParameterTypeEnum.String:
            parameterComp = <Box>
                <Typography>{parameter.name}</Typography>
                <Input inputProps={{ type: 'string' }}></Input>
            </Box>
            break;
    }

    return (
        <>
            {parameterComp}
        </>
    );
}

export default NodeParameter;
