import { useColorScheme } from "@mui/joy";
import { useEffect } from "react";

function ColorScheme() {
    const { setMode } = useColorScheme();

    useEffect(() => {
        setMode("dark");
    });

    return <></>;
}

export default ColorScheme;
