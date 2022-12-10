import {  Response, AirlinesResponse, GenerationTraceResponse,FlightsByAirline } from "../interfaces";
import { Service } from "./Service";

export class AerolineaService extends Service {

    public obtenerAerolineas(): Promise<Response<AirlinesResponse[]>> {
        return this.get(`airline/all`);
    }

    public crearConsecutivo(airlineCode: string): Promise<Response<GenerationTraceResponse>> {
        return this.post(`airline/trace`, {
            airlineCode
        });
    }

    public obtenerVuelos(airlineCode: string): Promise<Response<FlightsByAirline[]>> {
        return this.get(`airline/flights`, {
            airlineCode
        });
    }
}