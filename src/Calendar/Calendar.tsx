import React from "react";
import styled from "styled-components";
import { diffDays } from "@formkit/tempo";

type CalendarProps = { 
    anio: string;
};

const Calendar: React.FC<CalendarProps> = ({ anio }) => {
  const inicializar = () => {
    let yyyy = new Date(anio);
    return yyyy.getDay();
  };

  const cantidadDias = () => {
    if (anio) {
      let actual = new Date(anio).toISOString();
      let sig = (Number(anio) + 1).toString();
      let siguiente = new Date(sig).toISOString();
      return diffDays(siguiente, actual);
    }
    return 0;
  };

  const diaDelAnio = () => {
    if (anio) {
      let actual = new Date(anio).toISOString();
      let siguiente = new Date().toISOString();
      return diffDays(siguiente, actual)+1;
    }
    return 0;
  };

  const diasDeLaSemana = ["L", "M", "X", "J", "V", "S", "D"];
  const diasEnElMes = cantidadDias();
  const primerDiaDelMes = inicializar();
  const diaActual = diaDelAnio();

  // Calcular celdas vacías al inicio y días del mes
  const celdasVacias = Array.from({ length: primerDiaDelMes }, () => "");
  const diasDelMes = Array.from({ length: diasEnElMes }, (_, i) => i + 1);

  // Combinar celdas vacías y días del mes
  const todasLasCeldas = [...celdasVacias, ...diasDelMes];

  // Transponer las celdas para que cada fila represente un día de la semana
  const grillaTranspuesta = diasDeLaSemana.map((_, diaIndex) =>
    todasLasCeldas.filter((_, index) => index % 7 === diaIndex)
  );

  return (
    <Calendario>
      <Grillado>
        {grillaTranspuesta.map((fila, filaIndex) => (
          <Fila key={filaIndex}>
            <DiaHeader>{diasDeLaSemana[filaIndex]}</DiaHeader>
            {fila.map((dia, diaIndex) => {
              const esDiaActual = dia === diaActual;
              const relleno = dia && dia <= diaActual;
              return (
                <Celda key={diaIndex} relleno={relleno} esDiaActual={esDiaActual}>
                  {dia || ""}
                </Celda>
              );
            })}
          </Fila>
        ))}
      </Grillado>
    </Calendario>
  );
};

export default Calendar;

// Estilos con Styled Components
const Calendario = styled.div`
  font-family: Arial, sans-serif;
  margin: auto;
`;

const Grillado = styled.div`
  display: flex;
  flex-direction: column;
`;

const Fila = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const DiaHeader = styled.div`
  font-weight: bold;
  text-align: center;
  width: 15px;
`;

const Celda = styled.div<{ relleno: boolean; esDiaActual: boolean }>`
  width: 14px;
  height: 14px;
  font-size: 8px;
  background-color: ${({ relleno, esDiaActual }) =>
    esDiaActual ? "#f78fb3" : relleno ? "#c6e48b" : "#ebedf0"};
  color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ esDiaActual }) => (esDiaActual ? "#f06b93" : "#76c7c0")};
    cursor: pointer;
  }
`;
