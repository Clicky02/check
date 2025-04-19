import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { availableArchitecture } from "types/architecture-types";

type ItemSelectionEntryProps = {
    entryData: availableArchitecture;
}

function ItemSelectionEntry({ entryData }: ItemSelectionEntryProps) {
    return <ToggleButton value={entryData.id} sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{entryData.meta.name}</Typography>
    </ToggleButton>
}

type PageItemSelectionProps = {
    itemSelectionData: availableArchitecture[] | null;
}

function PageItemSelection({ itemSelectionData }: PageItemSelectionProps) {
    //Handles the currently selected entry in the button group
    const [selectedID, setselectedID] = useState('list');
    const handleChange = (event: React.MouseEvent<HTMLElement>, nextID: string) => {
        setselectedID(nextID)
    };

    // Generate the entries for the selection list
    let itemSelectionEntries: ReactNode[] = []
    if (itemSelectionData != null) {
        for (let i = 0; i < itemSelectionData.length; i++) {
            itemSelectionEntries.push(<ItemSelectionEntry entryData={itemSelectionData[i]} />);
        }
    }


    return <Box display={"flex"} flexDirection={"column"} width={"75%"}>
        <ToggleButtonGroup orientation="vertical" value={selectedID} exclusive onChange={handleChange}>
            {itemSelectionEntries}
        </ToggleButtonGroup>

    </ Box >
}

export default PageItemSelection;

