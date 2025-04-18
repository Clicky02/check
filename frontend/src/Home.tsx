import { Box, Button } from "@mui/joy";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import PatternBackground from "assets/PatternAsset.png";
import { STYLE } from "utils/style";
import Logo from "assets/logo-5.svg?react";

function Home() {
    const navigate = useNavigate();

    return (
        <Box display={"flex"} flexGrow={1} flexDirection={"row"}>
            <Box
                sx={{ background: `url(${PatternBackground}) repeat center center` }}
                borderRight={STYLE.separator}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"50%"}
                height={"100%"}
            >
                <Logo width={321} height={321} />
            </Box>
            <Box display={"flex"} sx={{ width: "50%", height: "fit-content", gap: 4 }}>
                <Button variant="outlined" endDecorator={<KeyboardArrowRight />} onClick={() => navigate("/architectures")}>
                    Architectures
                </Button>
                <Button variant="outlined" endDecorator={<KeyboardArrowRight />} onClick={() => navigate("/pipelines")}>
                    Pipelines
                </Button>
            </Box>
        </Box>
    );
}

export default Home;
