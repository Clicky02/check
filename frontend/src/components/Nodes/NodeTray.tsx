import { Box } from "@mui/material";
import { ReactNode } from "react";

type NodeTrayProps = {
    nodes: ReactNode[]
}

function NodeTray({ nodes }: NodeTrayProps) {
    return (
        <Box width={"250px"} height={"100%"} maxHeight={"100%"}
            sx={{ backgroundColor: "black", gap: "15px", padding: "15px" }}
            display={"flex"} flexDirection={"column"} alignItems={"center"} overflow={"auto"}
        >
            {nodes}
        </Box>
    );
}

export default NodeTray;
