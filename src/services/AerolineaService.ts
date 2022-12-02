import { Data, Response } from "../interfaces";
import { Service } from "./Service";

const data =
`
W3	Swiftair
V7	Volotea
VY	Vueling
EB	Wamos Air
AC	Air Canada
WS	WestJet
TS	Air Transat
7F	First Air
5T	Canadian North
YC	Ciel Canadien
PD	Porter Airlines
AM	AeroMéxico
4O	Interjet
Y4	Volaris
VB	Viva Aerobus
VW	Aeromar
YQ	TAR
AV	Avianca
5Z	Viva Air Colombia
P5	Wingo
VE	EasyFly
AA	American Airlines
XP	Avelo Airlines
MX	Breeze Airways
DL	Delta Air Lines
AR	Aerolineas Argentinas
AU	Austral
4M	LATAM Airlines Argentina
`;

export class AerolineaService extends Service {

    private aerolineas: Data[];

    public constructor() {
        super();
        this.aerolineas = data.split('\n').map(str => {
            const data = str.split('\t');
            if (data.length > 0)
                return ({
                    id: data.at(0),
                    name: data.at(1)
                }) as Data;

            return {} as Data;
        }).filter(airline => airline.id);
    }

    public obtenerAerolineas(): Promise<Response<Data[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                state: true,
                code: '200',
                message: '',
                data: this.aerolineas
            });
        });
    }

    public obtenerConsecutivo(id: string): Promise<Response<string>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    state: true,
                    code: '200',
                    message: '',
                    data: `${Math.floor((Math.random() * 999))}`
                });
            }, 1000)
        });
    }

    public obtenerVuelos(id: string): Promise<Response<string[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                state: true,
                code: '200',
                message: '',
                data: [`${Math.floor((Math.random() * 999))}`]
            });
        });
    }
}