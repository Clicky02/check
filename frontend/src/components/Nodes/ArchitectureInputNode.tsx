import { Handle, NodeProps, Position } from "@xyflow/react";
import { InputNodeInfo, useEditorStore } from "architecture/ArchStore";
import { TensorSizeField } from "param/TensorSizeField";
import { BaseNode, validateNode } from "./BaseNode";

export const ArchInputNode = ({ data, selected }: NodeProps) => {
    const id = data.id as string;
    const node = useEditorStore((state) => state.nodes[id]);
    const editorAPI = useEditorStore((state) => state.api);

    const [title, content] = validateNode<InputNodeInfo>(node, "input", (node) => [
        "Input",
        <TensorSizeField label="Input Size" value={node.size} onChange={(newSize) => editorAPI.updateInputSize(id, newSize)} />,
    ]);

    return (
        <>
            <BaseNode title={title} selected={selected}>
                {content}
            </BaseNode>
            <Handle type="target" position={Position.Left} id="input" />
        </>
    );
};
