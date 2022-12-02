import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import { Home, Flight, ConnectingAirports, Description } from "@mui/icons-material";

import { BarNavigation } from "./components";
import { ConexionPage, VueloPage, HomePage, ReportePage } from "./pages";
import { RouteInfo } from "./interfaces";
import { appTheme } from "./themes";

const routes: RouteInfo[] = [
    {
        path: '/',
        label: 'Home',
        icon: <Home />,
        element: <HomePage />
    },
    {
        path: '/nuevo-vuelo',
        label: 'Nuevo Vuelo',
        icon: <Flight />,
        element: <VueloPage />
    },
    {
        path: '/nueva-conexion',
        label: 'Nueva Conexión',
        icon: <ConnectingAirports />,
        element: <ConexionPage />
    },
    {
        path: '/reporte',
        label: 'Reporte',
        icon: <Description />,
        element: <ReportePage />
    }
];



export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={appTheme}>
                <Box
                    component="main" 
                    sx={{ 
                        height: 'calc(100vh - 60px)',
                        width: '100%',
                    }}
                >
                    <Routes>
                        {
                            routes.map(({ path, element }) => (
                                <Route 
                                    key={path} 
                                    path={path} 
                                    element={element}
                                />
                            ))
                        }

                        <Route 
                            path="/*" 
                            element={<Navigate to="/" />}
                        />
                    </Routes>
                </Box>
                <BarNavigation routes={routes} />
            </ThemeProvider>
        </BrowserRouter>
    )
}
