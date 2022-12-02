import { Data, Response } from "../interfaces";
import { Service } from "./Service";

const data = 
`
YYZ	Lester B. Pearson International Airport
YUL	Montreal / Pierre Elliott Trudeau International Airport
YVR	Vancouver International Airport
YYC	Calgary International Airport
YEG	Edmonton International Airport
YQB	Aeropuerto Internacional Jean-Lesage de Quebec
ATL	Aeropuerto Internacional Hartsfield-Jackson
LAX	Aeropuerto Internacional de Los Ángeles
ORD	Aeropuerto Internacional OHare
DFW	Aeropuerto Internacional de Dallas-Fort Worth
DEN	Aeropuerto Internacional de Denver
JFK	Aeropuerto Internacional John F. Kennedy
SFO	Aeropuerto Internacional de San Francisco
SEA	Aeropuerto Internacional de Seattle-Tacoma
LAS	Aeropuerto Internacional Harry Reid
MCO	Aeropuerto Internacional de Orlando
EWR	Aeropuerto Internacional Libertad de Newark
ACA	Aeropuerto Internacional de Acapulco
PIE	Base Aérea No. 7 León González Pie de la Cuesta
AGU	Aeropuerto Internacional de Aguascalientes
XAL	Aeropuerto Nacional de Álamos
AZG	Aeropuerto Nacional Pablo L. Sidar
JJC	Aeropuerto Nacional Jorge Jiménez Cantú
CSL	Aeródromo Internacional de Cabo San Lucas
CPE	Aeropuerto Internacional de Campeche
CNA	Aeropuerto Nacional de Cananea
CUN	Aeropuerto Internacional de Cancún
CYW	Aeropuerto Nacional Capitán Rogelio Castillo
CTM	Aeropuerto Internacional de Chetumal
EZE	Ministro Pistarini International Airport
AEP	Jorge Newbery Airpark
COR	Ingeniero Ambrosio Taravella Airport
ROS	Islas Malvinas Airport
MDZ	El Plumerillo Airport
SLA	Martin Miguel De Guemes International Airport
BCN	Barcelona International Airport
MAD	Adolfo Suárez Madrid-Barajas Airport
AGP	Málaga Airport
PMI	Palma De Mallorca Airport
ALC	Alicante International Airport
VLC	Valencia Airport
SVQ	Sevilla Airport
AXM	Aeropuerto Internacional El Edén
BAQ	Aeropuerto Internacional Ernesto Cortissoz
BOG	Aeropuerto Internacional El Dorado
BGA	Aeropuerto Internacional Palonegro
CLO	Aeropuerto Internacional Alfonso Bonilla Aragón
CTG	Aeropuerto Internacional Rafael Núñez
CUC	Aeropuerto Internacional Camilo Daza
LET	Aeropuerto Internacional Alfredo Vásquez Cobo
MDE	Aeropuerto Internacional José María Córdova
PEI	Aeropuerto Internacional Matecaña
RCH	Aeropuerto Internacional Almirante Padilla
ADZ	Aeropuerto Internacional Gustavo Rojas Pinilla
SMR	Aeropuerto Internacional Simón Bolívar
`;

export class AeropuertoService extends Service {
    private aeropuertos: Data[];

    public constructor() {
        super();
        this.aeropuertos = data.split('\n').map(str => {
            const data = str.split('\t');
            if (data.length > 0)
                return ({
                    id: data.at(0),
                    name: data.at(1)
                }) as Data;

            return {} as Data;
        }).filter(airport => airport.id);
    }

    public obtenerAeropuertos(): Promise<Response<Data[]>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    state: true,
                    code: '200',
                    message: '',
                    data: this.aeropuertos
                });
            }, 2500)
        });
    }

    public obtenerAeropuertosVuelo(vuelo: string): Promise<Response<Data[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                state: true,
                code: '200',
                message: '',
                data: this.aeropuertos.slice(5, 10)
            });
        });
    }
}