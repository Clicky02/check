import { Box, TextField, Button } from "@mui/material";

function PageCreate({ pageType }) {
    return (
        <Box display={"flex"} flexDirection={"row"} width={"70%"} gap={"75px"}>
            <TextField label="Name" />
            <TextField label="Description" fullWidth={true} />
            <Button color="primary" variant="outlined">
                Create {pageType}
            </Button>
        </Box>
    );
}

export default PageCreate;
