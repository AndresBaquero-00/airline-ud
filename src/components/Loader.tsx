import { Box, CircularProgress } from "@mui/material";

type Props = {
    show: boolean;
}

export const Loader = ({ show }: Props) => {
    return (
        <Box
            className="wrapper-loading"
            sx={{
                position: 'fixed',
                zIndex: '1300',
                inset: '0',
                display: show ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box 
                className="loading-backdrop"
                sx={{
                    position: 'fixed',
                    zIndex: '-1',
                    inset: '0',
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    animationName: 'opacidad',
                    animationDuration: '.2s',
                }}
            ></Box>
            <Box 
                className="loading-content"
                sx={{
                    padding: '25px',
                    backgroundColor: '#FFF',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animationName: 'opacidad, escala',
                    animationDuration: '.3s',
                }}
            >
                <CircularProgress />
            </Box>
        </Box>
    )
}
