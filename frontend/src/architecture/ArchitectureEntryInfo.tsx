import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { EntryInfoProps } from "components/layout/PageEntryInfo";
import { useNavigate } from "react-router-dom";

function ArchitectureEntryInfo({ val }: EntryInfoProps) {
    const navigate = useNavigate();
    return (
        <Box width={"100%"} height={"25%"} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
                <Typography variant="h4">{val.meta.name}</Typography>
                <Typography variant="subtitle2">{val.meta.description}</Typography>
            </Box>

            <ButtonGroup>
                <Button color="secondary" onClick={() => navigate("/architectures/editarchitecture/" + val.id)}>
                    Edit Architecture
                </Button>
                <Button color="secondary">Create Model</Button>
                <Button color="error">Delete Architecture</Button>
            </ButtonGroup>
        </Box>
    );
}

export default ArchitectureEntryInfo;
