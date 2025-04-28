import PageBody from "components/layout/PageBody";
import PageDescription from "components/layout/PageDescription";
import PageEntryInfo from "components/layout/PageEntryInfo";
import PageItemSelection from "components/layout/PageItemSelection";
import PageCreate from "components/layout/PageCreate";
import { useEffect, useState } from "react";
import { ObjectDescription } from "types/architecture-types";
import { CheckApi } from "utils/API-utils";
import ArchitectureEntryInfo from "./ArchitectureEntryInfo";
import { Button, Box } from "@mui/material";

const descriptionBody: string =
    " Select the architecture you would like to edit, delete, or convert to a model or start from scratch with a new architecture";
function Architecture() {
    const [itemSelectionData, setItemSelectionData] = useState(null);

    useEffect(() => {
        async function getArchitectures() {
            await CheckApi.getAvailableArchitectures().then((data) => {
                setItemSelectionData(data);
            });
        }
        getArchitectures();
    }, []);

    const [selectedEntry, setSelectedEntry] = useState<ObjectDescription | null>(null);
    const [createArchitecture, setCreateArchitecture] = useState<bool>(false);

    const onSelect = (data: any) => {
        setCreateArchitecture(false);
        setSelectedEntry(data);
    };
    let bottomComponent: ReactNode;
    if (createArchitecture == false) {
        bottomComponent = (
            <PageEntryInfo selectedEntry={selectedEntry} type="architecture" EntryComponent={ArchitectureEntryInfo} />
        );
    } else {
        bottomComponent = <PageCreate pageType={"Architecture"} />;
    }
    return (
        <PageBody
            topleft={
                <Box display={"flex"} flexDirection={"column"} gap={"50px"}>
                    <PageDescription title="Architecture" body={descriptionBody} />
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                            setSelectedEntry(null);
                            setCreateArchitecture(true);
                        }}
                    >
                        Create Architecture
                    </Button>
                </Box>
            }
            topright={
                <PageItemSelection itemSelectionData={itemSelectionData} selectedEntry={selectedEntry} onSelect={onSelect} />
            }
            bottom={bottomComponent}
        />
    );
}

export default Architecture;
