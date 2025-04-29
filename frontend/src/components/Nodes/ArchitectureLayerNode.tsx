import { Handle, NodeProps, Position } from "@xyflow/react";
import { LayerNodeInfo, useEditorStore } from "architecture/ArchStore";
import ParameterField from "../../param/ParameterField";
import { BaseNode, validateNode } from "./BaseNode";
import { Typography } from "@mui/material";

export const ArchLayerNode = ({ data, selected }: NodeProps) => {
    const id = data.id as string;
    const node = useEditorStore((state) => state.nodes[id]);
    const layer = useEditorStore((state) => node && node.type === "layer" && state.layers[node.layerTypeId]);
    const editorAPI = useEditorStore((state) => state.api);

    const [title, content] = validateNode<LayerNodeInfo>(node, "layer", (node) => {
        if (!layer) {
            return [undefined, <Typography>Invalid layer type '{node.layerTypeId}'.</Typography>];
        } else {
            return [
                layer.name,
                layer.parameters.map((param) => (
                    <ParameterField
                        key={param.id}
                        parameter={param}
                        value={node.param_values[param.id]?.val}
                        onChange={(newVal) => editorAPI.updateParameterValue(id, param.id, newVal)}
                    />
                )),
            ];
        }
    });

    return (
        <>
            <BaseNode title={title} selected={selected} foldable>
                {content}
            </BaseNode>

            <Handle type="source" position={Position.Right} id="output" />
            <Handle type="target" position={Position.Left} id="input" />
        </>
    );
};
