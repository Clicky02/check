import { Grid, Box, Typography, Container } from "@mui/material";
import { STYLE } from "utils/style";

function PageBody() {
    return <Box>

        <Grid container spacing={5}>
            <Grid size={{ sm: 12, md: 6 }}>
                <Typography >Left</ Typography>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
                <Typography>Right</Typography>
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
                <Typography>Right</Typography>
            </Grid>
        </Grid>
        <Box height={160}>

        </Box>
    </ Box>
}

export default PageBody;

// npm install @mui/jo