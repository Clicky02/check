import { Paper, Typography } from "@mui/material";
import { useEditorStore } from "architecture/ArchStore";
import { LayerDescription } from "types/layer-types";
import { useDnD } from "utils/DnD/DndContext";

type NodeTrayEntryProps = {
    data: LayerDescription;
};

function NodeTrayEntry({ data }: NodeTrayEntryProps) {
    const editorAPI = useEditorStore((state) => state.api);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        editorAPI.setSelectedLayerType(nodeType);
        event.dataTransfer!.effectAllowed = "move";
    };

    return (
        <Paper
            elevation={10}
            variant="outlined"
            draggable
            onDragStart={(event) => onDragStart(event, data.id)}
            sx={{
                width: "175px",
                height: "75px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
                borderColor: "white",
            }}
        >
            <Typography>{data.name}</Typography>
        </Paper>
    );
}

export default NodeTrayEntry;
