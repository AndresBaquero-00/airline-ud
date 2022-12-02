import { Data, Response } from "../interfaces";
import { Service } from "./Service";

const data = 
`
PPA-0	Paula Rodríguez
PPA-1	Andrés Hernández
PPA-2	Diego Torres
PPA-3	María Barrera
PPA-4	María Álvarez
PPA-5	Juan Medina
PPA-6	María Pardo
`;

export class PilotoService extends Service {

    private pilotos: Data[];

    public constructor() {
        super();
        this.pilotos = data.split('\n').map(str => {
            const data = str.split('\t');
            if (data.length > 0)
                return ({
                    id: data.at(0),
                    name: data.at(1)
                }) as Data;

            return {} as Data;
        }).filter(pilot => pilot.id);
    }

    public obtenerPilotos(): Promise<Response<Data[]>> {
        return new Promise((resolve, reject) => {
            resolve({
                state: true,
                code: '200',
                message: '',
                data: this.pilotos
            });
        });
    }
}