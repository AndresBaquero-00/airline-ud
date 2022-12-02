import { LabelImportant } from "@mui/icons-material";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";

export const HomePage = () => {
    const media = useMediaQuery('(max-width: 600px)');
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: media ? 'column' : 'row',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Plane_icon_nose_up.svg/1016px-Plane_icon_nose_up.svg.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    rotate: '90deg',
                    top: '25px',
                    animation: 'avion 5s infinite',
                }}
            >

            </Box>
            <Box
                sx={{
                    backgroundImage: 'url(https://www.guninetwork.org/files/universidad_francisco_jose_de_caldas.png)',
                    maxWidth: '300px',
                    maxHeight: '300px',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    gap: '25px',
                    width: '90%',
                    height: '90%'
                }}
            ></Box>
            <Box>
                <Typography variant="h4">
                    Integrantes:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <LabelImportant />
                        </ListItemIcon>
                        <ListItemText>
                            Andrés Baquero - 20181020124
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LabelImportant />
                        </ListItemIcon>
                        <ListItemText>
                            Sergio Paez  - 20191020167
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LabelImportant />
                        </ListItemIcon>
                        <ListItemText>
                            Brayan Muñoz -  20162020408
                        </ListItemText>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}
