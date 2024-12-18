export interface Datos {
    "fecha": string,
    "tipo": string,
    "nombre": string
}

import axios from "axios";

export const  apiClient = axios.create({
    baseURL: "https://api.argentinadatos.com/v1/feriados",
})

export const levantarFeriados = async(year: string): Promise<Datos[]> => {
    try {
        const response = await apiClient.get<Datos[]>(`/${year}`)
        return response.data;
    } catch (error) {
        console.error('Error al traer los datos:', error);
        throw error;
    }
}