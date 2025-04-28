import { Handle, NodeProps, Position } from "@xyflow/react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useEditorStore } from "architecture/ArchStore";
import NodeParameter from "./NodeParameter";
import { ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function LayerNode({ data }: NodeProps) {
    let id = data.id as number;
    let node = useEditorStore((state) => state.nodes[id]);
    let layer = useEditorStore((state) => state.layers[node.layerTypeId]);
    let parameterComponents: ReactNode[] = layer.parameters.map((param) => <NodeParameter parameter={param} />);

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography align="center" variant="h5">
                        {layer.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>{parameterComponents}</AccordionDetails>
            </Accordion>

            <Handle type="source" position={Position.Right} id="output" />
            <Handle type="source" position={Position.Left} id="input" />
        </>
    );
}

export default LayerNode;
