import { Data, Response, AirPortResponse } from "../interfaces";
import { Service } from "./Service";

export class AeropuertoService extends Service {

    public obtenerAeropuertos(): Promise<Response<AirPortResponse[]>> {
        return this.get('airport/all');
    }

    public obtenerAeropuertosVuelo(flightNumber: string, airlineCode: string): Promise<Response<Data[]>> {
        return this.get('airport/flight', {
            flightNumber,
            airlineCode
        });
    }
}