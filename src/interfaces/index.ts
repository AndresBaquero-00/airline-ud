
export interface RouteInfo {
    path: string;
    label: string;
    icon: JSX.Element;
    element: JSX.Element;
}

export interface Response<T = unknown> {
    code: string;
    state: boolean;
    message: string;
    data: T;
}

export interface Data {
    id: string;
    name: string;
}

export interface Query {
    aeropuertoOrigen: string;
    aeropuertoDestino: string;
    fechaViaje: string;
}

export interface Report {
    flight: string;
    airline: string;
    airport: string;
    city: string;
    country: string;
    date: string;
    pilot?: string;
    division: {
        type: string;
        name: string;
    }
}

export interface SegmentInfo {
    aerolinea: string;
    numeroVuelo: string;
    fechaVuelo: string;
    piloto: string;
    numSegmentos: string;
    aeropuertos: string[];
}