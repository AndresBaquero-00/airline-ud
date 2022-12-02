import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Fab, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

import { useForm } from "../hooks";
import { AeropuertoService, ReporteService } from "../services";
import { Data, Query, Report } from "../interfaces";
import { Loader } from "../components";

export const ReportePage = () => {
    const aeropuertoService = useMemo(() => new AeropuertoService(), []);
    const reporteService = useMemo(() => new ReporteService(), []);
    const [cargando, setCargando] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [aeropuertos, setAeropuertos] = useState([] as Data[]);
    const [reportes, setReportes] = useState([] as Report[]);
    const { form, changeForm, validForm, resetForm } = useForm({
        aeropuertoOrigen: '',
        aeropuertoDestino: '',
        fechaViaje: ''
    } as Query);

    /* Obtener datos de aerolíneas, aeropuertos y pilotos. */
    useEffect(() => {
        aeropuertoService.obtenerAeropuertos()
            .then(value => {
                setAeropuertos(value.data);
                setCargando(false);
            });

        setCargando(true);
    }, []);

    /* Obtener reportes. */
    useEffect(() => {
        if (!openModal && validForm) {
            reporteService.obtenerReporte(form)
                .then(value => {
                    setReportes(value.data);
                    setCargando(false);
                    resetForm();
                });

            setCargando(true);
        }
    }, [openModal]);

    const enviar = function (e: React.FormEvent) {
        e.preventDefault();
        setOpenModal(false);
        console.log(form);
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative'
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
                    position: 'absolute',
                    right: '25px',
                    bottom: '25px'
                }}
            >
                <Search />
            </Fab>
        </Box>
    )
}
