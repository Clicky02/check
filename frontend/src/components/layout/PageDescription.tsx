import { Box, Typography } from "@mui/material";

function PageDescription({ title = "Title", body = "Body" }) {
    return <Box display={"flex"} flexDirection={"column"} alignItems={"center"} >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body1">{body}</Typography>
    </ Box >
}

export default PageDescription;

