import { useEffect, useState } from 'react';
import { Datos, levantarFeriados } from '../api/feriados';
import styled from 'styled-components';
import Card from '../Card/Card';
import { format } from '@formkit/tempo';
import Calendar from '../Calendar/Calendar';
import { obtenerFechaISO, diasProximoFeriado } from '../api/logicas';
import  ProgressBar  from  "@ramonak/react-progress-bar" ;

const Feriado = () => {
    const [datos, setDatos] = useState<Datos[]>([]);
    const [anio, setAnio] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");
    const [diasProximoF, setDiasProximoF] = useState<number | null>(null);

    const obtenerAnio = (event: React.ChangeEvent<HTMLSelectElement>) => { 
        setAnio(event.target.value);
    }

    const obtenerDatos = async(anio: string) => {
        try {
          const datosApi = await levantarFeriados(anio);
          setDatos(datosApi);
        } catch (error) {
          console.error('Error al cargar datos:', error);
        }
  
      }

    useEffect( () => {
     // obtenerDatos();
        let hoy = obtenerFechaISO(); //Cheto
        setFecha(hoy);
        anio ? obtenerDatos(anio) : ""; // por temas de renderizacion, necesito que primero se setee el año del Select y luego disparo el consumo.
    },[anio])

    useEffect(() => {
        const calcularDiasFeriado = async () => {
            const dias = await diasProximoFeriado();
            setDiasProximoF(dias);
        };

        calcularDiasFeriado();
    }, []);

  return (
    <div>
        <h2>Feriado App</h2>
        <p>Hoy es {format(fecha,"full")}</p>
        <p> {diasProximoF !== null
        ? `El próximo feriado es en ${diasProximoF} días.`
        : "No hay más feriados este año."}</p>
        <ProgressBar completed= {90} />
        <Wrapper>
            <p>Seleccione el año: </p>
            <Selector value={anio} name="anio" onChange={obtenerAnio}>
                <Option value="" disabled >Seleccione un año</Option>
                <Option value="2023">2023</Option>
                <Option value="2024">2024</Option>
                <Option value="2025">2025</Option>
            </Selector>
            <p>Año seleccionado: {anio}</p>
        </Wrapper>
        <Wrapper>
            <Calendar anio={anio}/>
        </Wrapper>
        
        <p>La cantidad de feriados del año 2024 es: {datos?.length}</p>
        <Cuadricula>
        {
            datos?.map( (f,i) => (
                <Card key={i} fecha={f.fecha} tipo = {f.tipo} nombre={f.nombre}/>
            ))
        }
        </Cuadricula>

    </div>
  )
}

export default Feriado

//Cuadricula autoajustable sin mediaquery
const Cuadricula = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(150px, 1fr));
    padding: 0;
    margin: 0 32px 0 32px;
    gap: 32px;`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 32px;
    border: 2px solid #FAFAFA;
    `;
const Selector = styled.select`
    font-family: "Poppins";
    font-size: 18px;
    `;
const Option = styled.option`
    font-family: "Poppins";
    `;