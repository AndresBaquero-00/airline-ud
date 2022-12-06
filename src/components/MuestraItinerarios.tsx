import { Fragment } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { Itinerario } from "../interfaces";
import { Info } from "./Info";

type Props = {
    reportes: Itinerario[][];
}

export const MuestraItinerarios = ({ reportes }: Props) => {
    const media = useMediaQuery('(max-width: 600px)');
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: reportes.length ? 'block' : 'none',
            }}
        >
            {
                reportes.map((itinerario, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '90%',
                            margin: '0 auto',
                            padding: '20px 0'
                        }}
                    >
                        <Typography variant="h4">
                            Itinerario #{index + 1}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                gap: '30px',
                                marginTop: '15px',
                                flexDirection: media ? 'column' : 'row'
                            }}
                        >
                            {
                                itinerario.map((reporte, index) => (
                                    <Fragment key={`Fragment-${index}`}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: media ? '100%' : '20%'
                                            }}
                                        >
                                            <Typography variant="h6">
                                                {reporte.type}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'stretch',
                                                width: media ? '100%' : '70%',
                                                gap: '15px'
                                            }}
                                        >
                                            {
                                                reporte.reports?.map((report, index) => (
                                                    <Box
                                                        key={`Reporte-${index}`}
                                                        sx={{
                                                            flex: '1',
                                                            backgroundColor: 'rgba(0, 175, 181, 0.1)',
                                                            padding: '10px',
                                                            borderRadius: '10px'
                                                        }}
                                                    >
                                                        <Info report={report} />
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Fragment>
                                ))
                            }
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}
