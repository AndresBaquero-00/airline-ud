import { useEffect, useMemo, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import swal from "sweetalert";

import { useForm } from "../hooks";
import { AerolineaService, AeropuertoService, PostService } from "../services";
import { Loader } from "../components";
import { FormLayout } from "../layouts";
import { AirlinesResponse, ConnectionRequest, FlightsByAirline,AirPortResponse } from "../interfaces";

export const ConexionPage = () => {
    const aerolineaService = useMemo(() => new AerolineaService(), []);
    const aeropuertoService = useMemo(() => new AeropuertoService(), []);
    const postService = useMemo(() => new PostService(), []);
    const [cargando, setCargando] = useState(false);
    const [aerolineas, setAerolineas] = useState([] as AirlinesResponse[]);
    const [vuelosOrigen, setVuelosOrigen] = useState([] as FlightsByAirline[]);
    const [vuelosDestino, setVuelosDestino] = useState([] as FlightsByAirline[]);
    const [aeropuertosOrigen, setAeropuertosOrigen] = useState([] as AirPortResponse[]);
    const [aeropuertosDestino, setAeropuertosDestino] = useState([] as AirPortResponse[]);
    const { form, changeForm, validForm, resetForm, setDataForm } = useForm({
        airlineOrigin: '',
        airlineDestiny: '',
        flightOrigin: '',
        flightDestiny: '',
        airportOrigin: '',
        airportDestiny: ''
    } as ConnectionRequest);

    /* Obtener aerolíneas registradas. */
    useEffect(() => {
        aerolineaService.obtenerAerolineas()
            .then(value => {
                setCargando(false);
                setAerolineas((value.state)?value.data:[] as AirlinesResponse[]);
                if(!value.state)
                    swal('Error', value.message, 'error');
            }).catch(err =>{
                swal('Error', err, 'error');
            });

        setCargando(true);
    }, []);

    /* Obtener vuelos por aerolínea (origen). */
    useEffect(() => {
        if (form.airlineOrigin !== '') {
            aerolineaService.obtenerVuelos(form.airlineOrigin)
                .then(value => {
                    setCargando(false);
                    setVuelosOrigen((value.state)?value.data:[] as FlightsByAirline[]);
                    setAeropuertosOrigen([] as AirPortResponse[]);
                    setDataForm(['flightOrigin', 'airportOrigin'], ['', '']);
                    
                    if(!value.state)
                        swal('Error', value.message, 'error');
                });

            setCargando(true);
        }
    }, [form.airlineOrigin]);

    /* Obtener vuelos por aerolínea (destino). */
    useEffect(() => {
        if (form.airlineDestiny !== '') {
            aerolineaService.obtenerVuelos(form.airlineDestiny)
                .then(value => {
                    setCargando(false);
                    setVuelosDestino(value.data);
                    setAeropuertosDestino([] as AirPortResponse[]);
                    setDataForm(['flightDestiny', 'airportDestiny'], ['', '']);
                }).catch(err =>{
                    swal('Error', err, 'error');
                });

            setCargando(true);
        }
    }, [form.airlineDestiny]);

    /* Obtener aeropuertos por vuelo (origen). */
    useEffect(() => {
        if (form.flightOrigin !== '') {
            aeropuertoService.obtenerAeropuertosVuelo(form.flightOrigin, form.airlineOrigin)
                .then(value => {
                    setCargando(false);
                    setAeropuertosOrigen(value.data);
                        setDataForm(['airportOrigin'], ['', '']);
                });

            setCargando(true);
        }
    }, [form.flightOrigin]);

    /* Obtener aeropuertos por vuelo (destino). */
    useEffect(() => {
        if (form.flightDestiny !== '') {
            aeropuertoService.obtenerAeropuertosVuelo(form.flightDestiny, form.airlineDestiny)
                .then(value => {
                    setCargando(false);
                    setAeropuertosDestino(value.data);
                    setDataForm(['airportDestiny'], ['', '']);
                });

            setCargando(true);
        }
    }, [form.flightDestiny]);

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        postService.crearConexion(form)
            .then(value => {
                setCargando(false);
                resetForm();
                if (value.state)
                    swal('Registro exitoso', 'La conexión ha sido creada satisfactoriamente', 'success');
                else
                    swal('Error', value.message, 'error');
                
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
                name="airlineOrigin"
                value={form.airlineOrigin}
                onChange={changeForm}
            >
                {
                    aerolineas.map((airline, index) => (
                        <MenuItem
                            key={index}
                            value={airline.airlineCode}
                        >
                            {airline.airlineName}
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
                    name="flightOrigin"
                    value={form.flightOrigin}
                    onChange={changeForm}
                >
                    {
                        vuelosOrigen.map((flight, index) => (
                            <MenuItem
                                key={index}
                                value={flight.flightNumber}
                            >
                                {flight.flightNumber} - {flight.airlineCode}
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
                    name="airportOrigin"
                    value={form.airportOrigin}
                    onChange={changeForm}
                >
                    {
                        aeropuertosOrigen.map((airport, index) => (
                            <MenuItem
                                key={index}
                                value={airport.airportCode}
                            >
                                {airport.airportName}
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
                name="airlineDestiny"
                value={form.airlineDestiny}
                onChange={changeForm}
            >
                {
                    aerolineas.map((airline, index) => (
                        <MenuItem
                            key={index}
                            value={airline.airlineCode}
                        >
                            {airline.airlineName}
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
                    name="flightDestiny"
                    value={form.flightDestiny}
                    onChange={changeForm}
                >
                    {
                        vuelosDestino.map((flight, index) => (
                            <MenuItem
                                key={index}
                                value={flight.flightNumber}
                            >
                                {flight.flightNumber} - {flight.airlineCode}
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
                    name="airportDestiny"
                    value={form.airportDestiny}
                    onChange={changeForm}
                >
                    {
                        aeropuertosDestino.map((airport, index) => (
                            <MenuItem
                                key={index}
                                value={airport.airportCode}
                            >
                                {airport.airportName}
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
