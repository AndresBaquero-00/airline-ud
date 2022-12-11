import axios from "axios";
import { Response } from "../interfaces";

export class Service {
    protected readonly api: string;

    public constructor() {
        this.api = import.meta.env.VITE_API_URL;
        console.log(this.api);
    }

    protected post(endpoint: string, data: any): Promise<Response> {
        return new Promise((resolve, reject) => {
            axios.post(`${this.api}/${endpoint}`, data)
                .then(data => {
                    resolve(data.data);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    protected get(endpoint: string, params?: any): Promise<Response> {
        return new Promise((resolve, reject) => {
            axios.get(`${this.api}/${endpoint}`, {
                params,
            }).then(data => {
                resolve(data.data);
            });
        });
    }
}