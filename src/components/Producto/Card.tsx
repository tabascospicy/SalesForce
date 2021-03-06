import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Pressable, StyleSheet,Dimensions, InteractionManager} from 'react-native';
import Context from 'services/context';
import Image from './img';
import * as RootNavigation from 'components/RootNavigationRef/RootNavigationRef';
import { StackNavigationProp } from '@react-navigation/stack';
import {Font,} from "styles";
import { shadowSetting } from 'theme';
import accounting from "accounting";
import reactotron from 'reactotron-react-native';
type ProfileScreenNavigationProp = StackNavigationProp<{}>;

const Product = styled(Pressable)`
  flex-grow: 1;
  position: relative;
  padding: 10px;
  margin: 5px;
  min-height:120px;
  max-height:140px;
  align-items: center;
  flex-wrap:wrap;
  border-radius: 9px;
  background-color: white;
  box-shadow: 20px 50px 5px black;
`;
const Description = styled.View`
  flex-grow: 1;
  flex-direction: column;
  padding-right:20px;
  flex-wrap:nowrap;
`;
const Name = styled(Font)`
  font-size: 12px;
  font-weight: bold;
  opacity:0.8;
`;
const Des = styled(Font)`
  font-size: 9px;
  opacity:0.7;
`;
const Plus = styled(Pressable)``;
const PlusIcon = styled(Font)`
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 8px;
  opacity:0.7;
  margin-left: 2px;
  padding-right: 8px;
  border-radius: 40px;
  color: white;
`;
const Price = styled(Font)`
  font-size: 18px;

  align-items:center;
  color: #2C2C63;
  border-radius: 10px;
`;
const content = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 2,
  },
  button: {
    borderRadius: 20,
  },
});
const Position = styled.View`
  position: absolute;
  right: 0;
  flex-direction: row;
  bottom: 0;
  z-index: 6;
  margin: 10px;
`;
type Item = {
  item:Product
}
interface ProductoPros {
  
  navigation:ProfileScreenNavigationProp,
  producto: Item;
  disabled: boolean;
  dispatch: any;
  setSnack: any;
  img: any;
  detalles: any;
}
const ProductoCard = ({
  disabled = false,
  navigation,
  detalles,
  producto,
}: ProductoPros) => {
  const {handleSelectedProduct, colors,descuento} = useContext(Context);
  const [det, setDet] = useState({marca: '', categoria: ''});
  const precio = useRef(0);
  const precio_Dolar :number = parseFloat(producto.item.precio_dolar);
  const PercentageDescuento = parseInt(descuento?.descuento || "0")/100;
  precio.current = precio_Dolar  - (PercentageDescuento * precio_Dolar );

  const nav = () => {
      RootNavigation.navigate('Producto',{id:producto.item.id,imagen:producto.item.imagen,nombre:producto.item.nombre,precioProductoDolar:producto.item.precio_dolar});
      reactotron.log(producto.item,"producto");
      InteractionManager.runAfterInteractions(()=>{
       handleSelectedProduct && handleSelectedProduct({producto: producto.item, shouldAdd:!disabled ? true :false}); 
      });
  };

  useEffect(() => {
    if (detalles?.marcas) {
      const marca = detalles.marcas.find(
        (element:any) => element.id === producto.item.adm_marcas_id,
      );
      const categoria = detalles.categoria.find(
        (element:any) => element.id === producto.item.adm_grupos_id,
      );
      setDet({
        marca: marca?.nombre || 'sin asignar',
        categoria: categoria?.nombre || 'sin asignar',
      });
    }
  }, []);
  useEffect(()=>{
    precio.current = precio_Dolar  - (PercentageDescuento* precio_Dolar );
  },[descuento])
  return (
    <Product
      style={content.shadow}
      android_ripple={{color: '#e8e5e54d'}}
      onPress={nav}>
      <Image producto={producto.item} />
      <Description>
        <Name >{producto.item.nombre}</Name>
        <Des>{det.marca}</Des>
        <Des>{det.categoria}</Des>
      </Description>
      
        <Position>
          <Price>{accounting.formatMoney(precio.current.toFixed(2), {
                          symbol: '',
                          thousand: '.',
                          decimal: ',',
                          precision: 2,
                        })}$</Price>
          <Plus >
            <PlusIcon style={{backgroundColor:colors.secondary}}>+</PlusIcon>
          </Plus>
        </Position>
    
    </Product>
  );
};

export default ProductoCard;
