import { BrowserRouter, Route, Routes } from "react-router-dom";
import Architecture from "./architecture/Architecture";
import Pipeline from "./pipeline/Pipeline";
import Home from "./Home";
import Header from "components/Header";
import EditArchitecture from "architecture/EditArchitecture";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import ColorScheme from "ColorScheme";

const theme = extendTheme({
    colorSchemes: {
        dark: {
            palette: {
                background: {
                    body: "#111",
                },
            },
        },

        light: {
            palette: {
                background: {
                    body: "#111",
                },
            },
        },
    },
    fontFamily: {
        body: "sans-serif",
        display: "sans-serif",
        code: "sans-serif",
        fallback: "sans-serif",
    },
});

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <CssVarsProvider theme={theme} defaultColorScheme={"dark"} colorSchemeSelector="dark">
                <ColorScheme />
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/architectures" element={<Architecture />} />
                        <Route path="/editarchitecture" element={<EditArchitecture />} />
                        <Route path="/pipelines" element={<Pipeline />} />
                    </Routes>
                </BrowserRouter>
            </CssVarsProvider>
        </>
    );
}

export default App;
