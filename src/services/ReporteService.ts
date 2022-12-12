import { Info } from "@mui/icons-material";
import { Query, Report, Response,SegmentRequest,Itinerario} from "../interfaces";
import { Service } from "./Service";

export class ReporteService extends Service {

    public obtenerReporte(data: Query): Promise<Response<Report[]>>;
    public obtenerReporte(data: SegmentRequest): Promise<Response<Report[]>>;

    public obtenerReporte(data: any): Promise<Response<Report[] | Itinerario[][]>> {
        console.log("Data: " + JSON.stringify(data));
        if ('airportCodes' in data) {
            const info:SegmentRequest = data as SegmentRequest;
            return this.get('report/segments', {
                segmentInfo: JSON.stringify(info)
            });
        }

        const info = data as Query;
        return this.get('report/query', {
            query: info
        });
    }
}