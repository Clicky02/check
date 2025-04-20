import { Box, Button, Link, Typography } from "@mui/material";
import Logo from "assets/logo-5.svg?react";
import { useNavigate } from "react-router-dom";

const Links = [
    { name: "Architectures", href: "/architectures" },
    { name: "Pipelines", href: "/pipelines" },
    { name: "Models", href: "/models" },
    { name: "Training", href: "/training" },
];

export const HEADER_HEIGHT = "54px";

function Header() {
    const navigate = useNavigate();

    return (
        <Box width={"100vw"} height={HEADER_HEIGHT} display={"flex"} alignItems={"center"} borderBottom={"1px solid #ffffff"}>
            <Box display={"flex"} pl={2} gap={5} alignItems={"center"}>
                <Logo width={27} height={27} />

                {Links.map((val) => (
                    <Typography key={val.name} onClick={() => navigate(val.href)} sx={theme => ({
                        '&:hover': {
                            color: theme.palette.primary.main,
                            cursor: 'pointer'
                        },
                    })}>
                        {val.name}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}

export default Header;
