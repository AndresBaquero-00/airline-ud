import { Data, Response } from "../interfaces";
import { Service } from "./Service";

export class AeropuertoService extends Service {

    public obtenerAeropuertos(): Promise<Response<Data[]>> {
        return this.get('aeropuertos/all');
    }

    public obtenerAeropuertosVuelo(flightNumber: string, airlineCode: string): Promise<Response<Data[]>> {
        return this.get('aeropuertos/vuelo', {
            flightNumber,
            airlineCode
        });
    }
}