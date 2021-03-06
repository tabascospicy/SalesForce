import { Picker } from "@react-native-community/picker";
import React, { useContext, useEffect, useRef } from "react";
import { Button, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import reactotron from "reactotron-react-native";
import Context from "services/context"
import {Card,Data,styles,DataSection,DataTitle,Bold,PickerContainer,shadow} from "./style";
import {BoxShadow} from 'react-native-shadow';
import { Dimensions } from "react-native";
export const {height,width} = Dimensions.get('window');
type Props = {
  handleDescuento:any,
  setPayments:any,
  payments:PlanPago,
  cliente:Cliente,
  nav:()=>void,
  plan:PlanPago[],
  isCreditNotAvaible:boolean
}

const ClientData:React.FC<Props> = ({handleDescuento,setPayments,payments,cliente,nav,plan,isCreditNotAvaible}) => {
  const {colors} = useContext(Context);
 
  return (
    <BoxShadow setting={shadow}>
    <Card>  
   <DataSection>
   <DataTitle>Informacion</DataTitle>
    <Data><Bold>Cedula:</Bold>{cliente.cedula}</Data>
    <Data ><Bold>Telefono:</Bold>{cliente.telefono_contacto}</Data>
    <Data ><Bold>Limite de Credito:</Bold>{cliente.limite_credito || 0} $</Data>
    <Data ><Bold>Direccion:</Bold>{cliente.direccion.toLowerCase()}</Data>
    </DataSection>
    <PickerContainer style={{backgroundColor:colors["secondary-light"]}} >
    <Picker
      selectedValue={payments.descuento}
      style={{...styles.picker,color:colors["secondary-dark"]}}
      
      itemStyle={{fontFamily:"Nunito-Regular"}}
      onValueChange={(itemValue, itemIndex) => {
        handleDescuento(plan[itemIndex -1 ]);
        setPayments({descuento:itemValue,method:`${itemValue}`,index: itemIndex});
      }}>
      <Picker.Item label="Seleccione" value="" />
      {plan.map((element: PlanPago, key: number) => {
        
        return (
          <Picker.Item
            key={key}
            label={`${element.nombre} ${element.descuento}%`}
            value={element.descuento}
          />
        );
      })}
    </Picker>
    </PickerContainer>
    <Button labelStyle={{color:"white"}}  disabled={isCreditNotAvaible || (cliente?.limite_credito===null)} onPress={nav} mode={'contained'} color={colors.terceary}>
      Generar Pedido
    </Button>
   {isCreditNotAvaible && <Caption>Este Usuario no posee credito disponible</Caption>} 
  </Card>
  </BoxShadow>
  );
}

export default ClientData;