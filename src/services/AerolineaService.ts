import { Data, Response } from "../interfaces";
import { Service } from "./Service";

export class AerolineaService extends Service {

    public obtenerAerolineas(): Promise<Response<Data[]>> {
        return this.get('aerolineas/all');
    }

    public obtenerConsecutivo(airlineCode: string): Promise<Response<string>> {
        return this.get('aerolineas/consecutivo', {
            airlineCode
        });
    }

    public obtenerVuelos(airlineCode: string): Promise<Response<string[]>> {
        return this.get(`aerolineas/vuelos`, {
            airlineCode
        });
    }
}