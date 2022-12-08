import { Data, Response, PilotResponse } from "../interfaces";
import { Service } from "./Service";

export class PilotoService extends Service {

    public obtenerPilotos(): Promise<Response<PilotResponse[]>> {
        return this.get('pilots/all')
    }
}