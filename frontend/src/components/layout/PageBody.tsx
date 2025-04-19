import { Grid, Box, } from "@mui/material";
import { ReactNode } from "react";

type PageBodyProps = {
    topleft: ReactNode | ReactNode[] | undefined;
    topright: ReactNode | ReactNode[] | undefined;
    bottomleft: ReactNode | ReactNode[] | undefined;
    bottomright: ReactNode | ReactNode[] | undefined;
}

function PageBody({ topleft, topright, bottomleft, bottomright }: PageBodyProps) {
    return <Box display={"flex"} flexDirection={"column"} height={"100%"}>
        <Grid container spacing={5} flexGrow={1}>
            <Grid size={{ sm: 12, md: 6 }}>
                {topleft}
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
                {topright}
            </Grid>
        </Grid>

        <Grid height={"200px"} container spacing={5} borderTop={"1px solid white"}>
            <Grid size={{ sm: 12, md: 6 }}>
                {bottomleft}
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
                {bottomright}
            </Grid>
        </Grid>

    </ Box >
}

export default PageBody;

// npm install @mui/jo