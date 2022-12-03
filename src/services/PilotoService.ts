import { Data, Response } from "../interfaces";
import { Service } from "./Service";

export class PilotoService extends Service {

    public obtenerPilotos(): Promise<Response<Data[]>> {
        return this.get('pilotos/all')
    }
}