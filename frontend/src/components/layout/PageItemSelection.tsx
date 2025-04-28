import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactNode } from "react";
import { ObjectDescription } from "types/architecture-types";

type ItemSelectionEntryProps = {
    entryData: ObjectDescription;
};

function ItemSelectionEntry({ entryData }: ItemSelectionEntryProps) {
    return (
        <ToggleButton value={entryData} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{entryData.meta.name}</Typography>
        </ToggleButton>
    );
}

type PageItemSelectionProps = {
    itemSelectionData: ObjectDescription[] | null;
    selectedEntry: any;
    onSelect: (data: any) => void;
};

function PageItemSelection({ itemSelectionData, selectedEntry, onSelect }: PageItemSelectionProps) {
    // Generate the entries for the selection list
    let itemSelectionEntries: ReactNode[] = [];
    if (itemSelectionData != null) {
        for (let i = 0; i < itemSelectionData.length; i++) {
            itemSelectionEntries.push(<ItemSelectionEntry entryData={itemSelectionData[i]} />);
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"75%"}>
            <ToggleButtonGroup orientation="vertical" value={selectedEntry} exclusive onChange={(_, nextID) => onSelect(nextID)}>
                {itemSelectionEntries}
            </ToggleButtonGroup>
        </Box>
    );
}

export default PageItemSelection;
