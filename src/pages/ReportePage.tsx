import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Fab, MenuItem, Modal, TextField, Typography, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";

import { useForm } from "../hooks";
import { AeropuertoService, ReporteService } from "../services";
import { Data, Itinerario, Query } from "../interfaces";
import { Loader, MuestraItinerarios } from "../components";

export const ReportePage = () => {
    const aeropuertoService = useMemo(() => new AeropuertoService(), []);
    const reporteService = useMemo(() => new ReporteService(), []);
    const media = useMediaQuery('(max-width: 600px)');
    const [cargando, setCargando] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [aeropuertos, setAeropuertos] = useState([] as Data[]);
    const [reportes, setReportes] = useState([] as Itinerario[][]);
    const { form, changeForm, validForm, resetForm } = useForm({
        aeropuertoOrigen: '',
        aeropuertoDestino: '',
        fechaViaje: ''
    } as Query);

    /* Obtener datos de aeropuertos. */
    useEffect(() => {
        aeropuertoService.obtenerAeropuertos()
            .then(value => {
                setAeropuertos(value.data);
                setCargando(false);
            });

        setCargando(true);
    }, []);

    const enviar = function (e: React.FormEvent) {
        e.preventDefault();
        reporteService.obtenerReporte(form)
            .then(value => {
                console.log(value.data);
                setReportes(value.data as Itinerario[][]);
                setCargando(false);
                resetForm();
            });

        setOpenModal(false);
        setCargando(true);
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflowY: 'auto'
            }}
        >
            <Loader show={cargando} />
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: reportes.length ? 'none' : 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5">
                    No hay reportes para mostrar.
                </Typography>
            </Box>
            <MuestraItinerarios reportes={reportes} />
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={enviar}
                    sx={{
                        width: '90%',
                        maxWidth: '550px',
                        backgroundColor: '#FFF',
                        borderRadius: '25px',
                        padding: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '15px'
                    }}
                >
                    <Typography variant="h4">
                        Realizar Reporte.
                    </Typography>
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        label="Aeropuerto Origen*"
                        helperText="Seleccione el aeropuerto de origen."
                        name="aeropuertoOrigen"
                        value={form.aeropuertoOrigen}
                        onChange={changeForm}
                    >
                        {
                            aeropuertos.map((airport, index) => (
                                <MenuItem
                                    key={index}
                                    value={airport.id}
                                >
                                    {airport.name}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        label="Aeropuerto Destino*"
                        helperText="Seleccione el aeropuerto de destino."
                        name="aeropuertoDestino"
                        value={form.aeropuertoDestino}
                        onChange={changeForm}
                    >
                        {
                            aeropuertos.map((airport, index) => (
                                <MenuItem
                                    key={index}
                                    value={airport.id}
                                >
                                    {airport.name}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="date"
                        label="Fecha de Viaje*"
                        name="fechaViaje"
                        value={form.fechaViaje}
                        onChange={changeForm}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={!validForm}
                        sx={{
                            marginTop: '15px',
                            borderRadius: '50px'
                        }}
                    >
                        Consultar
                    </Button>
                </Box>
            </Modal>
            <Fab
                color="secondary"
                aria-label="buscar"
                size="large"
                onClick={() => setOpenModal(true)}
                sx={{
                    position: 'fixed',
                    right: '25px',
                    bottom: media ? '100px' : '80px'
                }}
            >
                <Search />
            </Fab>
        </Box>
    )
}
