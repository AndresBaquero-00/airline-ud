
export interface RouteInfo {
    path: string;
    label: string;
    icon: JSX.Element;
    element: JSX.Element;
}

export interface Response<T = any> {
    code: string;
    state: boolean;
    message: string;
    data: T;
}

export interface Data {
    id: string;
    name: string;
}

export interface AirlinesResponse{
    airlineName:string;
    airlineCode:string;
}

export interface AirPortResponse{
    airportName:string;
    airportCode:string;
}


export interface PilotResponse{
    pilotName:string;
    pilotNumber:string;
}

export interface GenerationTraceResponse{
    trace:string;
}

export interface FlightsByAirline{
    flightNumber:string;
    airlineCode:string;
}

export interface Query {
    aeropuertoOrigen: string;
    aeropuertoDestino: string;
    fechaViaje: string;
}

export interface SegmentInfo {
    aerolinea: string;
    numeroVuelo: string;
    fecha: string;
    piloto: string;
    numSegmentos: string;
    aeropuertos: string[];
}

export interface SegmentRequest {
    airlineCode:string;
    flightNumber:string;
    flightDate:string;
    pilotLicense:string;
    numberOfSegments:string;
    airportCodes:string[];
}

export interface ConnectionInfo {
    aerolineaOrigen: string;
    aerolineaDestino: string;
    vueloOrigen: string;
    vueloDestino: string;
    aeropuertoOrigen: string;
    aeropuertoDestino: string;
}

export interface ConnectionRequest{
    airlineOrigin: string;
    airlineDestiny: string;
    flightOrigin: string;
    flightDestiny: string;
    airportOrigin: string;
    airportDestiny: string;
}

export interface Report {
    airline: string;
    flight: string;
    airport: string;
    city: Place;
    division: Place;
    country: Place;
    date: string;
    pilot?: string;
}

export interface Place {
    name: string;
    type: string;
}

export interface Itinerario {
    type?: string;
    reports?: Report[];
}
