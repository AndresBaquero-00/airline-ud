import { Box, Fade } from "@mui/material";

type Props = {
    onSubmit: React.FormEventHandler;
    children: JSX.Element | JSX.Element[];
}

export const FormLayout = ({ onSubmit, children }: Props) => {
    return (
        <Box
            component="section"
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                overflowY: 'auto'
            }}
        >
            <Fade in>
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={onSubmit}
                    method="POST"
                    sx={{
                        width: '90%',
                        maxWidth: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '30px 0',
                        minHeight: '100%',
                        height: 'fit-content'
                    }}
                >
                    { children }
                </Box>
            </Fade>
        </Box>
    )
}
