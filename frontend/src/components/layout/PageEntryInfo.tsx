import { Box, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { ObjectDescription } from "types/architecture-types";

type PageEntryInfoProps = {
    selectedEntry: ObjectDescription | null;
    type: "architecture" | "pipeline" | "model";
    EntryComponent: FC<EntryInfoProps>;
};

export type EntryInfoProps = {
    val: ObjectDescription;
};

function PageEntryInfo({ selectedEntry, type, EntryComponent }: PageEntryInfoProps) {
    let entryInfo: ReactNode;

    if (selectedEntry == null) {
        entryInfo = <Typography>No {type} selected.</Typography>;
    } else {
        entryInfo = <EntryComponent val={selectedEntry} />;
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            width={"60%"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {entryInfo}
        </Box>
    );
}

export default PageEntryInfo;
