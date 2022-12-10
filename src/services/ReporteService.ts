import { Query, Report, Response,SegmentRequest,Itinerario} from "../interfaces";
import { Service } from "./Service";

export class ReporteService extends Service {

    public obtenerReporte(data: Query): Promise<Response<Report[]>>;
    public obtenerReporte(data: SegmentRequest): Promise<Response<Report[]>>;

    public obtenerReporte(data: any): Promise<Response<Report[] | Itinerario[][]>> {
        if ('aeropuertos' in data) {
            const info = data as SegmentRequest;
            return this.get('reporte/segmentos', {
                segmentInfo: info
            });
        }

        const info = data as Query;
        return this.get('reporte/query', {
            query: info
        });
    }
}