import { Box } from "@mui/material";
import { useEditorStore } from "architecture/ArchStore";
import { ReactNode } from "react";
import NodeTrayEntry from "./NodeTrayEntry";

function NodeTray() {
    let layers = useEditorStore((state) => state.layers);

    let entries: ReactNode[] = [];
    if (layers != null) {
        for (const layer in layers) {
            const data = layers[layer];
            entries.push(<NodeTrayEntry key={data.id} data={data} />);
        }
    }

    return (
        <Box
            width={"250px"}
            height={"100%"}
            maxHeight={"100%"}
            sx={{ backgroundColor: "black", gap: "15px", padding: "15px" }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            overflow={"auto"}
        >
            {entries}
        </Box>
    );
}

export default NodeTray;
