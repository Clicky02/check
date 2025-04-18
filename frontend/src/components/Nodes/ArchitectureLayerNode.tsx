import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

function LayerNode() {
    return (
        <>
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" className="nodrag" />
            </div>
            <Handle type="source" position={Position.Right} id="output" />
            <Handle type="source" position={Position.Left} id="input" />
        </>
    );
}

export default LayerNode;
