import { Service } from "./Service";
import { Response, SegmentRequest, ConnectionRequest } from "../interfaces";

export class PostService extends Service {

    public crearSegmento(data: SegmentRequest): Promise<Response> {
        return this.post('program/segment', data);
    }

    public crearConexion(data: ConnectionRequest): Promise<Response> {
        return this.post('program/connection',data);
    }

}