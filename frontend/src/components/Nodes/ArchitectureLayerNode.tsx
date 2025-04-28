import { Handle, NodeProps, Position } from "@xyflow/react";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@mui/material";
import { useEditorStore } from "architecture/ArchStore";
import NodeParameter from "./NodeParameter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STYLE } from "utils/style";

function LayerNode({ data, selected }: NodeProps) {
    let id = data.id as number;
    let node = useEditorStore((state) => state.nodes[id]);
    let layer = useEditorStore((state) => node && state.layers[node.layerTypeId]);

    if (node === undefined) {
        return <Paper>Could not find Node.</Paper>;
    } else if (layer === undefined) {
        return <Paper>Invalid layer type {node.layerTypeId}.</Paper>;
    }

    return (
        <>
            <Accordion sx={{ border: selected ? STYLE.separator : undefined }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography align="center" variant="h5">
                        {layer.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {layer.parameters.map((param) => (
                        <NodeParameter key={param.id} parameter={param} />
                    ))}
                </AccordionDetails>
            </Accordion>

            <Handle type="source" position={Position.Right} id="output" />
            <Handle type="target" position={Position.Left} id="input" />
        </>
    );
}

export default LayerNode;
