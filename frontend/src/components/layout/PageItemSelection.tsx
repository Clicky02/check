import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { availableArchitecture } from "types/architecture-types";

type ItemSelectionEntryProps = {
    entryData: availableArchitecture;
}

function ItemSelectionEntry({ entryData }: ItemSelectionEntryProps) {
    return <ToggleButton value={entryData} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{entryData.meta.name}</Typography>
    </ToggleButton>
}

type PageItemSelectionProps = {
    itemSelectionData: availableArchitecture[] | null;
    getSelectedEntry: (data: any) => void;
}

function PageItemSelection({ itemSelectionData, getSelectedEntry }: PageItemSelectionProps) {
    //Handles the currently selected entry in the button group
    const [selectedEntry, setSelectedEntry] = useState('list');
    const handleChange = (_event: React.MouseEvent<HTMLElement>, nextID: string) => {
        setSelectedEntry(nextID);
        getSelectedEntry(nextID);
    };

    // Generate the entries for the selection list
    let itemSelectionEntries: ReactNode[] = []
    if (itemSelectionData != null) {
        for (let i = 0; i < itemSelectionData.length; i++) {
            itemSelectionEntries.push(<ItemSelectionEntry entryData={itemSelectionData[i]} />);
        }
    }


    return <Box display={"flex"} flexDirection={"column"} width={"75%"}>
        <ToggleButtonGroup orientation="vertical" value={selectedEntry} exclusive onChange={handleChange}>
            {itemSelectionEntries}
        </ToggleButtonGroup>

    </ Box >
}

export default PageItemSelection;

