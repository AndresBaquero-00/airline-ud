import { Service } from "./Service";
import { ConnectionInfo, Response,SegmentRequest } from "../interfaces";

export class PostService extends Service {

    public crearSegmento(data: SegmentRequest): Promise<Response> {
        return this.post('program/segment', {
            segmentInfo: data
        });
    }

    public crearConexion(data: ConnectionInfo): Promise<Response> {
        return this.post('program/connection', {
            connectionInfo: data
        });
    }

}