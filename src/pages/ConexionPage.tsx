import { useEffect, useMemo, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import swal from "sweetalert";

import { useForm } from "../hooks";
import { AerolineaService, AeropuertoService, PostService } from "../services";
import { Loader } from "../components";
import { FormLayout } from "../layouts";
import { ConnectionInfo, Data } from "../interfaces";

export const ConexionPage = () => {
    const aerolineaService = useMemo(() => new AerolineaService(), []);
    const aeropuertoService = useMemo(() => new AeropuertoService(), []);
    const postService = useMemo(() => new PostService(), []);
    const [cargando, setCargando] = useState(false);
    const [aerolineas, setAerolineas] = useState([] as Data[]);
    const [vuelosOrigen, setVuelosOrigen] = useState([] as string[]);
    const [vuelosDestino, setVuelosDestino] = useState([] as string[]);
    const [aeropuertosOrigen, setAeropuertosOrigen] = useState([] as Data[]);
    const [aeropuertosDestino, setAeropuertosDestino] = useState([] as Data[]);
    const { form, changeForm, validForm, resetForm } = useForm({
        aerolineaOrigen: '',
        aerolineaDestino: '',
        vueloOrigen: '',
        vueloDestino: '',
        aeropuertoOrigen: '',
        aeropuertoDestino: ''
    } as ConnectionInfo);

    /* Obtener aerolíneas registradas. */
    useEffect(() => {
        aerolineaService.obtenerAerolineas()
            .then(value => {
                setCargando(false);
                setAerolineas(value.data);
            });

        setCargando(true);
    }, []);

    /* Obtener vuelos por aerolínea (origen). */
    useEffect(() => {
        if (form.aerolineaOrigen !== '') {
            aerolineaService.obtenerVuelos(form.aerolineaOrigen)
                .then(value => {
                    setCargando(false);
                    setVuelosOrigen(value.data);
                });

            setCargando(true);
        }
    }, [form.aerolineaOrigen]);

    /* Obtener vuelos por aerolínea (destino). */
    useEffect(() => {
        if (form.aerolineaDestino !== '') {
            aerolineaService.obtenerVuelos(form.aerolineaDestino)
                .then(value => {
                    setCargando(false);
                    setVuelosDestino(value.data);
                });

            setCargando(true);
        }
    }, [form.aerolineaDestino]);

    /* Obtener aeropuertos por vuelo (origen). */
    useEffect(() => {
        if (form.vueloOrigen !== '') {
            aeropuertoService.obtenerAeropuertosVuelo(form.vueloOrigen, form.aerolineaOrigen)
                .then(value => {
                    setCargando(false);
                    setAeropuertosOrigen(value.data);
                });

            setCargando(true);
        }
    }, [form.vueloOrigen]);

    /* Obtener aeropuertos por vuelo (destino). */
    useEffect(() => {
        if (form.vueloDestino !== '') {
            aeropuertoService.obtenerAeropuertosVuelo(form.vueloDestino, form.aerolineaDestino)
                .then(value => {
                    setCargando(false);
                    setAeropuertosDestino(value.data);
                });

            setCargando(true);
        }
    }, [form.vueloDestino]);

    const enviar = function (e: React.FormEvent) {
        e.preventDefault();
        postService.crearConexion(form)
            .then(value => {
                setCargando(false);
                resetForm();
                swal('Registro exitoso', 'La conexión ha sido creada satisfactoriamente', 'success');
            });
    }

    return (
        <FormLayout onSubmit={enviar}>
            <Loader show={cargando} />
            <Typography variant="h4">
                Crear Conexión.
            </Typography>

            <Typography sx={{ width: '100%' }}>
                Llene los datos de origen.
            </Typography>
            <TextField
                select
                fullWidth
                variant="outlined"
                label="Aerolínea*"
                helperText="Seleccione la aerolínea."
                name="aerolineaOrigen"
                value={form.aerolineaOrigen}
                onChange={changeForm}
            >
                {
                    aerolineas.map((airline, index) => (
                        <MenuItem
                            key={index}
                            value={airline.id}
                        >
                            {airline.name}
                        </MenuItem>
                    ))
                }
            </TextField>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '15px'
                }}
            >
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Vuelo*"
                    helperText="Seleccione el número de vuelo."
                    name="vueloOrigen"
                    value={form.vueloOrigen}
                    onChange={changeForm}
                >
                    {
                        vuelosOrigen.map((flight, index) => (
                            <MenuItem
                                key={index}
                                value={flight}
                            >
                                {flight}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Aeropuerto*"
                    helperText="Seleccione el aeropuerto."
                    name="aeropuertoOrigen"
                    value={form.aeropuertoOrigen}
                    onChange={changeForm}
                >
                    {
                        aeropuertosOrigen.map((airport, index) => (
                            <MenuItem
                                key={index}
                                value={airport.id}
                            >
                                {airport.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Box>

            <Typography sx={{ width: '100%' }}>
                Llene los datos de destino.
            </Typography>
            <TextField
                select
                fullWidth
                variant="outlined"
                label="Aerolínea*"
                helperText="Seleccione la aerolínea."
                name="aerolineaDestino"
                value={form.aerolineaDestino}
                onChange={changeForm}
            >
                {
                    aerolineas.map((airline, index) => (
                        <MenuItem
                            key={index}
                            value={airline.id}
                        >
                            {airline.name}
                        </MenuItem>
                    ))
                }
            </TextField>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: '15px'
                }}
            >
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Vuelo*"
                    helperText="Seleccione el número de vuelo."
                    name="vueloDestino"
                    value={form.vueloDestino}
                    onChange={changeForm}
                >
                    {
                        vuelosDestino.map((flight, index) => (
                            <MenuItem
                                key={index}
                                value={flight}
                            >
                                {flight}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Aeropuerto*"
                    helperText="Seleccione el aeropuerto."
                    name="aeropuertoDestino"
                    value={form.aeropuertoDestino}
                    onChange={changeForm}
                >
                    {
                        aeropuertosDestino.map((airport, index) => (
                            <MenuItem
                                key={index}
                                value={airport.id}
                            >
                                {airport.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Box>
            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!validForm}
                sx={{
                    marginTop: '15px',
                    borderRadius: '50px'
                }}
            >
                Crear Conexión
            </Button>
        </FormLayout>
    )
}
