import { Query, Report, Response, SegmentInfo } from "../interfaces";
import { Service } from "./Service";

export class ReporteService extends Service {

    public obtenerReporte(data: Query): Promise<Response<Report[]>>;
    public obtenerReporte(data: SegmentInfo): Promise<Response<Report[]>>;

    public obtenerReporte(data: any): Promise<Response<Report[]>> {
        if ('aeropuertos' in data) {
            const info = data as SegmentInfo;
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