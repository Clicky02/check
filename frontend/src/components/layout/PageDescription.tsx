import { Box, Typography } from "@mui/material";

function PageDescription({ title = "Title", body = "Body" }) {
    return <Box display={"flex"} flexDirection={"column"} width={"400px"} gap={"75px"}>
        <Typography variant="h3" align="center">{title}</Typography>
        <Typography variant="body1" align="center">{body}</Typography>
    </ Box >
}

export default PageDescription;

