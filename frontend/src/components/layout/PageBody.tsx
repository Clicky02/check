import { Grid, Box, } from "@mui/material";
import { ReactNode } from "react";

type PageBodyProps = {
    topleft: ReactNode | ReactNode[] | undefined;
    topright: ReactNode | ReactNode[] | undefined;
    bottom: ReactNode | ReactNode[] | undefined;
}

function PageBody({ topleft, topright, bottom }: PageBodyProps) {
    return <Box display={"flex"} flexDirection={"column"} flexGrow={1}>
        <Grid container spacing={5} flexGrow={1}>
            <Grid size={{ sm: 12, md: 6 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                {topleft}
            </Grid>
            <Grid size={{ sm: 12, md: 6 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                {topright}
            </Grid>
        </Grid>

        <Grid height={"200px"} container spacing={5} borderTop={"1px solid white"}>
            <Grid size={{ sm: 12, md: 12 }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                {bottom}
            </Grid>
        </Grid>

    </ Box >
}

export default PageBody;
