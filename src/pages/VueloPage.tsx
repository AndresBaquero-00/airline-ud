import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, MenuItem, Typography, TextField } from "@mui/material";
import swal from "sweetalert";

import { useForm } from "../hooks";
import { AeropuertoService, AerolineaService, PilotoService, ReporteService, PostService } from "../services";
import { CreaSegmentos, InfoAeropuertos, Loader } from "../components";
import { FormLayout } from "../layouts";
import { Data, Report, SegmentInfo } from "../interfaces";

export const VueloPage = () => {
    const aerolineaService = useMemo(() => new AerolineaService(), []);
    const aeropuertoService = useMemo(() => new AeropuertoService(), []);
    const pilotoService = useMemo(() => new PilotoService(), []);
    const reporteService = useMemo(() => new ReporteService(), []);
    const postService = useMemo(() => new PostService(), []);
    const [cargando, setCargando] = useState(false);
    const [muestraSegmentos, setMuestraSegmentos] = useState(false);
    const [aerolineas, setAerolineas] = useState([] as Data[]);
    const [aeropuertos, setAeropuertos] = useState([] as Data[]);
    const [pilotos, setPilotos] = useState([] as Data[]);
    const [reportes, setReportes] = useState([] as Report[]);
    const { form, changeForm, setDataForm, validForm, resetForm } = useForm({
        aerolinea: '',
        numeroVuelo: '',
        fecha: '',
        piloto: '',
        numSegmentos: '',
        aeropuertos: [] as string[]
    } as SegmentInfo);

    /* Obtener datos de aerolíneas, aeropuertos y pilotos. */
    useEffect(() => {
        aerolineaService.obtenerAerolineas()
            .then(value => {
                setAerolineas(value.data);
            });

        aeropuertoService.obtenerAeropuertos()
            .then(value => {
                setAeropuertos(value.data);
            });

        pilotoService.obtenerPilotos()
            .then(value => {
                setPilotos(value.data);
            });

        setCargando(true);
    }, []);

    /* setCargando(false) cuando la data haya sido cargada. */
    useEffect(() => {
        const cargando = !(aerolineas.length && aeropuertos.length && pilotos.length);
        setCargando(cargando);
    }, [aerolineas, aeropuertos, pilotos]);

    /* Obtener consecutivo por aerolínea. */
    useEffect(() => {
        if (form.aerolinea !== '') {
            setCargando(true);
            aerolineaService.obtenerConsecutivo(form.aerolinea)
                .then(value => {
                    setCargando(false);
                    setDataForm(['numeroVuelo'], [value.data]);
                });
        }
    }, [form.aerolinea]);

    /* Obtener reporte de segmentos ingresados. */
    useEffect(() => {
        if (validForm) {
            setCargando(true);
            reporteService.obtenerReporte(form)
                .then(value => {
                    setCargando(false);
                    setReportes(value.data);
                });
        }
    }, [validForm]);

    const enviar = function (e: React.FormEvent) {
        e.preventDefault();
        postService.crearSegmento(form)
            .then(value => {
                setCargando(false);
                resetForm();
                swal('Registro exitoso', 'El segmento ha sido creado satisfactoriamente', 'success');
            });
        
        setCargando(true);
    }

    return (
        <FormLayout onSubmit={enviar}>
            <Loader show={cargando} />
            <Typography variant="h4">
                Crear Segmento.
            </Typography>
            <TextField
                select
                fullWidth
                variant="outlined"
                label="Aerolínea*"
                helperText="Seleccione la aerolínea."
                name="aerolinea"
                value={form.aerolinea}
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
                    fullWidth
                    variant="outlined"
                    label="# de Vuelo*"
                    name="numeroVuelo"
                    value={form.numeroVuelo}
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="date"
                    label="Fecha de Vuelo*"
                    name="fecha"
                    value={form.fecha}
                    onChange={changeForm}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </Box>
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
                    label="Piloto*"
                    helperText="Seleccione el piloto."
                    name="piloto"
                    value={form.piloto}
                    onChange={changeForm}
                >
                    {
                        pilotos.map((pilot, index) => (
                            <MenuItem
                                key={index}
                                value={pilot.id}
                            >
                                {pilot.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="# de Segmentos*"
                    type="number"
                    name="numSegmentos"
                    value={form.numSegmentos}
                    error={form.numSegmentos !== '' && !(Number(form.numSegmentos) > 0)}
                    onChange={(e) => {
                        const { value } = e.target;
                        setMuestraSegmentos(false);
                        setReportes([] as Report[]);
                        setDataForm(['numSegmentos', 'aeropuertos'], [value, [] as string[]]);
                    }}
                    onBlur={(e) => {
                        (Number(form.numSegmentos) > 0) && setMuestraSegmentos(true);
                    }}
                />
            </Box>
            <CreaSegmentos
                show={muestraSegmentos}
                aeropuertos={aeropuertos}
                numSegmentos={form.numSegmentos}
                onChange={(aeropuertos: string[]) => setDataForm(['aeropuertos'], [aeropuertos])}
            />
            <InfoAeropuertos 
                show={validForm} 
                reports={reportes} 
            />
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
                Crear Vuelo
            </Button>
        </FormLayout>
    );
}
