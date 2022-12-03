import { Service } from "./Service";
import { ConnectionInfo, Response, SegmentInfo } from "../interfaces";

export class PostService extends Service {

    public crearSegmento(data: SegmentInfo): Promise<Response> {
        return this.post('crear/segmento', {
            segmentInfo: data
        });
    }

    public crearConexion(data: ConnectionInfo): Promise<Response> {
        return this.post('crear/conexion', {
            connectionInfo: data
        });
    }

}