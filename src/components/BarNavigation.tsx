import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, useMediaQuery } from "@mui/material";

import { RouteInfo } from "../interfaces";

type Props = {
    routes: RouteInfo[]
}

export const BarNavigation = ({ routes }: Props) => {
    const media = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(
        routes.findIndex(({ path }) => path === location.pathname)
    );

    return (
        <BottomNavigation
            value={value}
            showLabels
            onChange={(e, v) => setValue(v)}
            sx={{
                height: media ? '80px' : '60px',
                backgroundColor: 'primary.main'
            }}
        >
            {
                routes.map(({ label, icon, path }) => (
                    <BottomNavigationAction
                        key={label}
                        icon={icon}
                        label={label}
                        onClick={() => {
                            navigate(path, { replace: true });
                        }}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            '&.Mui-selected': {
                                color: '#FFF'
                            }
                        }}
                    />
                ))
            }
        </BottomNavigation>
    )
}
