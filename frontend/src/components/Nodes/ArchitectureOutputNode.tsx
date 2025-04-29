import { Handle, NodeProps, Position } from "@xyflow/react";
import { OutputNodeInfo, useEditorStore } from "architecture/ArchStore";
import { BaseNode, validateNode } from "./BaseNode";

export const ArchOutputNode = ({ data, selected }: NodeProps) => {
    const id = data.id as string;
    const node = useEditorStore((state) => state.nodes[id]);

    const [title, content] = validateNode<OutputNodeInfo>(node, "output", (_) => ["Output", undefined]);

    return (
        <>
            <BaseNode title={title} selected={selected}>
                {content}
            </BaseNode>
            <Handle type="target" position={Position.Left} id="input" />
        </>
    );
};
