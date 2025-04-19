import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { ReactNode } from "react";
import { availableArchitecture } from "types/architecture-types";

type PageEntryInfoProps = {
    selectedEntry: availableArchitecture | null;
    type: "architecture" | "pipeline" | "model"
}

function PageEntryInfo({ selectedEntry, type }: PageEntryInfoProps) {
    let entryInfo: ReactNode;

    if (selectedEntry == null) {
        entryInfo = <Typography>No {type} selected.</Typography>
    }
    else {
        switch (type) {
            case "architecture":
                entryInfo =
                    <Box width={"100%"} height={"25%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Typography variant="h4">{selectedEntry.meta.name}</Typography>
                            <Typography variant="subtitle2">{selectedEntry.meta.description}Test Description</Typography>
                        </Box>

                        <ButtonGroup>
                            <Button color="primary">Edit Architecture</Button>
                            <Button color="secondary">Create Model</Button>
                            <Button color="error">Delete Architecture</Button>
                        </ButtonGroup>
                    </Box>;
                break;
            case "pipeline":
                entryInfo =
                    <Box width={"100%"} height={"25%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Typography variant="h4">{selectedEntry.meta.name}</Typography>
                            <Typography variant="subtitle2">{selectedEntry.meta.description}Test Description</Typography>
                        </Box>

                        <ButtonGroup>
                            <Button color="primary">Edit Pipeline</Button>
                            <Button color="error">Delete Pipeline</Button>
                        </ButtonGroup>
                    </Box>;
                break;
            case "model":
                entryInfo =
                    <Box width={"100%"} height={"25%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <Box>
                            <Typography variant="h4">{selectedEntry.meta.name}</Typography>
                            <Typography variant="subtitle2">{selectedEntry.meta.description}Test Description</Typography>
                        </Box>

                        <ButtonGroup>
                            <Button color="primary">Train Model</Button>
                            <Button color="error">Delete Model</Button>
                        </ButtonGroup>
                    </Box>;
                break;
        }
    }


    return <Box display={"flex"} flexDirection={"column"} width={"60%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
        {entryInfo}
    </ Box >
}

export default PageEntryInfo;

