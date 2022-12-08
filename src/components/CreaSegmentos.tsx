import { useEffect, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";

import { Data,AirPortResponse } from "../interfaces";

type Props = {
    show: boolean;
    numSegmentos: string;
    aeropuertos: AirPortResponse[];
    onChange: Function;
}

export const CreaSegmentos = ({ show, numSegmentos, aeropuertos, onChange }: Props) => {
    const [seleccionados, setSeleccionados] = useState([] as unknown[]);

    useEffect(() => {
        setSeleccionados(Array(Number(numSegmentos) + 1).fill(''));
    }, [numSegmentos]);

    return (
        <Box
            sx={{
                width: '100%',
                display: show ? 'block' : 'none'
            }}
        >
            <Typography>
                Seleccione los aeropuertos correspondientes para cada segmento.
            </Typography>
            {
                seleccionados.map((selected, index) => (
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        label="Aeropuerto*"
                        helperText={`Segmento #${index + 1}`}
                        key={index}
                        value={selected}
                        sx={{ marginTop: '10px' }}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSeleccionados(seleccionados => {
                                const airports = seleccionados.map((seleccionado, i) => (
                                    i === index ? value:seleccionado
                                ));

                                onChange(airports);
                                return airports;
                            });
                        }}
                    >
                        {
                            aeropuertos.map((airport) => (
                                <MenuItem
                                    key={airport.airportCode}
                                    value={airport.airportCode}
                                >
                                    {airport.airportName}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                ))
            }
        </Box>
    )
}
