import React from 'react'
import styled from 'styled-components';
import { format } from '@formkit/tempo';

interface CardProps {
  fecha: string;
  tipo: string;
  nombre: string;
}


const Card: React.FC<CardProps> = ({ fecha, tipo, nombre }) => {

  const formatear = (dato:string) => {
    return format(dato,"full")
    // aaaa-mm-dd
    // let dia: number;
    // let aux: string [] = dato.split("-");
    // dia = Number(aux[2]);
    // switch (aux[1]) {
    //   case "01":
    //     return `${dia} de Enero`
    //     break;
    //   case "02":
    //     return `${dia} de Febrero`
    //     break;
    //   case "03":
    //     return `${dia} de Marzo`
    //     break;
    //   case "04":
    //     return `${dia} de Abril`
    //     break;
    //   case "05":
    //     return `${dia} de Mayo`
    //     break;
    //   case "06":
    //     return `${dia} de Junio`
    //     break;
    //   case "07":
    //     return `${dia} de Julio`
    //     break;
    //   case "08":
    //     return `${dia} de Agosto`
    //     break;
    //   case "09":
    //     return `${dia} de Septiembre`
    //     break;
    //   case "10":
    //     return `${dia} de Octubre`
    //     break;
    //   case "11":
    //      return `${dia} de Noviembre`
    //      break;
    //   default:
    //     return `${dia} de Diciembre`
    //     break;
    // }
  }
  return (
    <Wrapper>
        <Item>{formatear(fecha)}</Item>
        <Item>{tipo}</Item>
        <Item>{nombre}</Item>
    </Wrapper>
  )
}

export default Card;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    border: 2px solid #FAFAFA;
    box-shadow: 4px 4px #f8f7f1;`;

const Item = styled.p`
    margin: 0;
    padding: 8px;
    text-align: center;
    height: auto;`;