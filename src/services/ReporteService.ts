import { Query, Report, Response, SegmentInfo } from "../interfaces";
import { Service } from "./Service";

export class ReporteService extends Service {

    public obtenerReporte(data: Query): Promise<Response<Report[]>>;
    public obtenerReporte(data: SegmentInfo): Promise<Response<Report[]>>;

    public obtenerReporte(data: any): Promise<Response<Report[]>> {
        if ('aeropuertos' in data) {
            const info = data as SegmentInfo;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        state: true,
                        code: '200',
                        message: '',
                        data: info.aeropuertos.map(airport => ({
                            airline: data.aerolinea,
                            flight: data.numeroVuelo,
                            airport: airport,
                            date: data.fechaVuelo,
                            city: 'Bogotá',
                            country: 'Colombia',
                            pilot: data.piloto,
                            division: {
                                type: 'Departamento',
                                name: 'Distrito Capital'
                            }
                        } as Report))
                    })
                }, 1000);
            });
        }

        const info = data as Query;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    state: true,
                    code: '200',
                    message: '',
                    data: [] as Report[]
                })
            }, 1000);
        });
    }
}