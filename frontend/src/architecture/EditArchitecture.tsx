import { Box, Paper, Typography } from "@mui/material";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeTray from "components/Nodes/NodeTray";
import NodeTrayEntry from "components/Nodes/NodeTrayEntry";
import { ReactNode, useEffect, useState } from "react";
import { LayerDescription } from "types/layer-types";
import { CheckApi } from "utils/API-utils";
import DnDThing from "utils/DnD/DnDFlow";
import DnDFlow from "utils/DnD/DnDFlow";

function EditArchitecture() {
    const [layerData, setLayerData] = useState<LayerDescription[] | null>(null)

    useEffect(() => {
        CheckApi.getAvailableLayers().then((data) => { setLayerData(data) })
    }, [])


    let trayEntries: ReactNode[] = [];

    if (layerData != null) {
        layerData.forEach(layer => {
            trayEntries.push(
                <NodeTrayEntry data={layer} />
            )
        });
    }

    return (
        <Box display={"flex"} width={"100%"} height={"calc(100vh - 54px)"}>
            {/* <NodeTray nodes={trayNodes} />
            <ReactFlow>
                <Background />
                <Controls />
            </ReactFlow> */}
            <DnDThing trayEntries={trayEntries} />
        </Box>

    );
}

export default EditArchitecture;
