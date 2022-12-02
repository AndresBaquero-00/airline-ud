import axios from "axios";
import { Response } from "../interfaces";

export class Service {
    protected readonly api: string;

    public constructor() {
        this.api = import.meta.env.VITE_API_URL;
    }

    protected post(endpoint: string, data: any): Promise<Response> {
        return new Promise((resolve, reject) => {
            axios.post(`${this.api}/${endpoint}`, data)
                .then(data => {
                    resolve(data.data);
                });
        });
    }

    protected get(endpoint: string): Promise<Response> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.api}/${endpoint}`)
                .then(data => {
                    resolve(data.data);
                });
        });
    }
}