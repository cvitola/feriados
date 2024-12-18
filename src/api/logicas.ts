import { levantarFeriados } from "./feriados";
import { diffDays } from "@formkit/tempo";

export const obtenerFechaISO = ():string => {
    return new Date().toISOString();
}

export const diasProximoFeriado = async(): Promise<number> => {
    let anioActual = new Date().getFullYear().toString();
    let hoy = obtenerFechaISO();
    let feriados = await levantarFeriados(anioActual);
    let sig = feriados?.filter(f => diffDays(hoy,f.fecha) < 0 )[0];
    if (!sig) return null; // No hay próximo feriado
    return diffDays(sig.fecha,hoy)+1;
}