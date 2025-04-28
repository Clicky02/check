import { Box, CircularProgress } from "@mui/material";
import "@xyflow/react/dist/style.css";
import NodeTray from "components/Nodes/NodeTray";
import NodeTrayEntry from "components/Nodes/NodeTrayEntry";
import { ReactNode, useEffect, useState } from "react";
import { LayerDescription } from "types/layer-types";
import { CheckApi } from "utils/API-utils";
import { useParams } from "react-router-dom";
import { ArchFlow } from "./ArchFlow";
import { ArchEditorProvider } from "./ArchStore";

function EditArchitecture() {
    const [layerData, setLayerData] = useState<LayerDescription[] | null>(null);
    const { id } = useParams();
    // const ArchEditorStore = useEditorStore();

    useEffect(() => {
        if (id != undefined) {
            CheckApi.getArchitectureByID(parseInt(id)).then((data) => {
                console.log(data);
            });
        }

        CheckApi.getAvailableLayers().then((data) => {
            setLayerData(data);
        });
    }, []);

    if (layerData === null) {
        return <CircularProgress size="30px" />;
    }

    return (
        <ArchEditorProvider layers={layerData || []}>
            <Box display={"flex"} width={"100%"} height={"calc(100vh - 54px)"}>
                <NodeTray />
                <Box style={{ width: "100%", height: "100%" }}>
                    <ArchFlow />
                </Box>
            </Box>
        </ArchEditorProvider>
    );
}

export default EditArchitecture;
