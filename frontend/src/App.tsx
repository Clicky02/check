import { BrowserRouter, Route, Routes } from "react-router-dom";
import Architecture from "./architecture/Architecture";
import Pipeline from "./pipeline/Pipeline";
import Home from "./Home";
import Header from "components/Header";
import EditArchitecture from "architecture/EditArchitecture";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

function App() {
    // const [count, setCount] = useState(0);
    console.log(theme)

    return (
        <>
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/architectures" element={<Architecture />} />
                        <Route path="/editarchitecture" element={<EditArchitecture />} />
                        <Route path="/pipelines" element={<Pipeline />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
