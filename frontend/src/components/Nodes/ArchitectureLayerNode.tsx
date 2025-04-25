import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { Parameter } from "utils/parameters";
import NodeParameter from "./NodeParameter";
import { Box, Typography } from "@mui/material";

type LayerNodeProps = {
    layerName: string;
    parameters: Parameter<any>[];
}

function LayerNode({ layerName, parameters }: LayerNodeProps) {
    let parameterComponents: ReactNode[] = parameters.map((param) => <NodeParameter parameter={param} />);

    return (
        <>
            <Typography>{layerName}</Typography>
            <Box>
                {parameterComponents}
            </Box>
            <Handle type="source" position={Position.Right} id="output" />
            <Handle type="source" position={Position.Left} id="input" />
        </>
    );
}

export default LayerNode;
