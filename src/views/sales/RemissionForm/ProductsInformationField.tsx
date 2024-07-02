import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'
import { Field, FormikErrors, FormikTouched, FieldProps,FieldInputProps, Form } from 'formik'
//import { useAppSelector,useAppDispatch,setUser, CompanyState } from '@/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { apiGetBranchRemission, apiGetStatusRemission, apiGetStoreRemission, apiGetTaxes } from '@/services/RemissionServices'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import type { Component, ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { apiGetSalesProducts } from '@/services/SalesService'
import Table from '@/components/ui/Table'
const { Tr, Th, Td, THead, TBody } = Table

import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Notification from '@/components/ui/Notification'


import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import paginate from '@/utils/paginate'
import toast from '@/components/ui/toast'
import { useAppSelector,useAppDispatch } from './store'


type FormFieldsName = {
    cant: string
    idProduct:string   
    valorUnit:string 
    valorBruto:string
    discount:string
    idTaxes:string    
    taxRate:string
    taxValor:string
    valorTotal:string
    observation:string
    lineProducts:any[]
}

type ProductsInformationFields = {
    type:string
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {        
        valorUnit:string
        valorBruto:string
        cant:string
        idProduct: string
        idTaxes:string
        taxRate:string
        taxValor:string
        valorTotal:string
        discount:string
        observation:string
        lineProducts:any[] 
        [key: string]: unknown
    }
}





const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const PriceInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} prefix="$"  />
}





const ProductsInformationFields = (props: ProductsInformationFields) => {    
    const dispatch = useAppDispatch();    
    const { values = { idProduct: '', idTaxes:'', cant:"", valorBruto:"", 
                        valorUnit:"", taxRate:"",valorTotal:"", discount:"",
                        taxValor:"",lineProducts:[], observation:""
                    }, touched, errors, type } = props

    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )

    const idStoreData = useAppSelector(
        (state) => state.salesRemissionForm.data?.idStoreData
    )

    const tableRef = useRef<DataTableResetHandle>(null)
    const [product,setProduct] = useState<any>([]);
    const [taxes,setTaxes]=useState<any>([]);
    const [lineProduct,setLineProduct]=useState<any>([]);    
    const [productSel,setProductSel]=useState<any>({});
    const [inventorySel, setInventorySel] = useState<any>({cant:0});
    const [enabledAdd, setEnabledAdd] = useState(true);
    
    
    //tabla totales
    const [totalBruto,setTotalBruto]=useState<any>("0.00");
    const [totalDescuento,setTotalDescuento]=useState<any>("0.00");
    const [totalSubtotal,setTotalSubtotal]=useState<any>("0.00");
    const [totalImpuesto,setTotalImpuesto]=useState<any>("0.00");
    const [totalNeto,setTotalNeto]=useState<any>("0.00");

    const formatNumberCashin = (numb: number): string => {
        if (numb === null || numb === undefined) {
            return '';
        }
        return numb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    
    const tableData = {};
    
    
     useEffect(()=>{
        
        
         

        if(type=="edit"){
            const lines=values.lineProducts;
            let arraLines:any=[];            
            lines.forEach((element:any) => {
                arraLines.push({
                    productCodeLine:element.refProduct,
                    nameProductLine:element.nameProduct,
                    idProductLine:element.idProduct,
                    cantLine:element.quantity,
                    priceProductLine:element.valueProduct,
                    brutoProductLine:(element.valueProduct)*element.quantity,
                    discountProductLine:(element.discount!="")?element.discount:"0.00",
                    taxPriceProductLine:element.taxes,
                    totalLine:element.totalLine,
                    idTaxes:element.idTaxes
                });
            });

            setLineProduct(arraLines);
        }
        GetFetchData();
        //cleanData();

     },[]);

    useEffect(()=>{        
        
        let inventory:any={};
        setEnabledAdd(true);
        product.forEach((element:any) => {
            if(element.id==values.idProduct){
                values.valorUnit=element.price;     
                setProductSel({...element});                
                if(element.inventory.length >0){
                    inventory=element.inventory;
                    setInventorySel({cant:0});
                    for(let i=0;i<inventory.length;i++){
                        if(parseInt(inventory[i].idStore)==idStoreData){
                            setInventorySel(inventory[i]);
                            if(inventory[i].cant>0){
                                setEnabledAdd(false);
                            }
                        }
                    }

                }
                
            }
        });

        
        

        calcTotal();        
    },[values.idProduct]);

    useEffect(()=>{  
        taxes.forEach((element:any) => {
            if(element.id==values.idTaxes){
                values.taxRate=element.price;                
            }
        });

        calcTotal();
    },[values.idTaxes]);

    useEffect(()=>{                
        calcTotal();
    },[values.cant, values.idTaxes,values.valorUnit,values.discount]);

    const calcTotal=()=>{
        let valorUnitary=parseFloat(values.valorUnit);
        let cant=parseFloat((values.cant!=undefined)?values.cant:"0");        
        let valorBruto=cant*valorUnitary;       

        //IMPUESTOS        
        let convTax=(parseFloat((values.taxRate!=undefined)?values.taxRate:"0")/100)+1;       
                
        //descuento
        values.valorBruto=valorBruto.toString();        

        if(values.discount!=undefined && values.discount!=""  ){
            valorBruto = valorBruto-parseFloat(values.discount);
        }
        console.log(values.discount);
        
        let subTotal=valorBruto*convTax;                
        values.taxValor=((valorBruto*(convTax-1)).toFixed(2)).toString();
        values.valorTotal=subTotal.toFixed(2).toString();

        if(type!="edit"){
            values.lineProducts=lineProduct;
            //setProductSel({cantLine:values.cant,...productSel});
        }       
    }

    const openNotification = (type: 'success' | 'warning' | 'danger' | 'info', title:string, message:string ) => {
        toast.push(
            <Notification
                title={title}
                type={type}
            >
                {message}
            </Notification>,{
                    placement: 'top-center',
                }
        )
    }
    

    const GetFetchData = async ()=>{
        let dataProduct:any = await apiGetSalesProducts({idCompany:companyDefault?.id});
        let productD:any=[];
        dataProduct=dataProduct.data;        
        dataProduct.forEach((element:any) => {
            productD.push({label:`${element.productCode} - ${element.name} `, value:element.id, ...element});
        });            
        setProduct(productD);

        
        

        let dataTaxes:any = await apiGetTaxes();
        let listTaxes:any=[];
        dataTaxes=dataTaxes.data;
        listTaxes.push({label:`0 - Sin Impuesto`, value:"", price:0, id:"" });
        dataTaxes.forEach((element:any) => {
            listTaxes.push({label:`${element.id} - ${element.name}`, value:element.id, price:element.value, id:element.id });
        });            
        setTaxes(listTaxes);
    };

    
    const addlineProduct=()=>{
        let lineProd:any[]=[];

        if(productSel.id=="" ||productSel.id==undefined ){
            openNotification('warning','Producto','Debes seleccionar un producto antes de agregar');
            return;
        }

        if(values.cant=="" || values.cant==undefined  || parseFloat(values.cant)<=0){
            openNotification('warning','Cantidad','La cantidad no debe ser 0 o vacío');
            return;
        }

        if(values.valorUnit=="" || values.valorUnit==undefined  || parseFloat(values.valorUnit)<=0){
            openNotification('warning','Precio','El precio no debe ser 0 o vacío');
            return;
        }

        lineProd.push({

                       productCodeLine:productSel.productCode,
                       nameProductLine:productSel.name,
                       idProductLine:productSel.id,
                       cantLine:values.cant,
                       priceProductLine:values.valorUnit,
                       brutoProductLine:values.valorBruto,
                       discountProductLine:(values.discount!="")?values.discount:"0.00",
                       taxPriceProductLine:values.taxValor,
                       totalLine:values.valorTotal,
                       idTaxes:values.idTaxes
                    });
        setLineProduct([...lineProd,...lineProduct]);        
        cleanData();
        
    }
    useEffect(()=>{
        if(type!="edit"){
            values.lineProducts=lineProduct;
        }
        CalcTotal();
    },[lineProduct])

    const CalcTotal=()=>{

        let _totalBruto=0;
        let _totalDescuento=0;
        let _totalImpuesto=0;
        let _totalNeto=0;
        lineProduct.map((element:any,ind:any)=>{
            _totalBruto+=parseFloat(element.brutoProductLine);
            _totalDescuento+=parseFloat(element.discountProductLine);
            _totalImpuesto+=parseFloat(element.taxPriceProductLine);
            _totalNeto+=parseFloat(element.totalLine);
        });

        console.log("_totalBruto",lineProduct);

        setTotalBruto(formatNumberCashin(_totalBruto));
        setTotalDescuento(formatNumberCashin(_totalDescuento));
        setTotalSubtotal(formatNumberCashin((_totalBruto-_totalDescuento)));
        setTotalImpuesto(formatNumberCashin(_totalImpuesto));
        setTotalNeto(formatNumberCashin(_totalNeto));
    }



    const cleanData=()=>{
        setProductSel({});
        values.idProduct='';
        values.idTaxes='0';
        values.cant="1";
        values.valorBruto="0.00";
        values.valorUnit="0.00";
        values.taxRate="0";
        values.valorTotal="0.00";
        values.discount="0.00";
        values.taxValor="0.00";                    
    }

    // Eliminar el elemento en la posición 'index' del array 'estad'
    const deleteLine = (index: number) => {
        setLineProduct(
            lineProduct.filter((item:any,indx:number)=>{
                return(index!==indx)
            })
        );
        calcTotal();        
    };

   
    

    return (
        <AdaptableCard>            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-1 p-2" style={{backgroundColor:"#f1f1f1"}}>

                <div className="col-span-9">
                    <FormItem
                        label="Producto *"
                        invalid={
                                (errors.idProduct && touched.idProduct) as boolean
                        }
                            errorMessage={errors.idProduct}
                        >
                        <Field name="idProduct">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={product}
                                    value={product.filter(
                                        (state:any) =>
                                            state.value === values.idProduct
                                    )}
                                    onChange={(option) =>{ 
                                        
                                        form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                        }                                           
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-2">
                    <FormItem
                        label="Cant. *"
                        invalid={(errors.cant && touched.cant) as boolean}
                        errorMessage={errors.cant}>   
                        <Field
                            type="number"
                            autoComplete="off"
                            name="cant"
                            placeholder="Cant"
                            component={Input}
                            min={1}                            
                            max={50000}                       
                            style={{textAlign:"center"}}
                        />
                        <small>Inv: {inventorySel.cant}</small>
                    </FormItem>
                    
                </div>

                


                

                

                

                

                <div className='col-span-1'>
                    <Button type='button' disabled={enabledAdd} className='mt-7' style={{backgroundColor:"#0ea5e9",color:"#fff"}} onClick={addlineProduct}>+</Button>
                </div>
                
            </div>

            
            <div className='mt-4'>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Ref.</Th>
                            <Th>Producto</Th>
                            <Th>Cant.</Th>                            
                            <Th></Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {
                            lineProduct.map((element:any,ind:any)=>{
                                return (                                 
                                <Tr key={ind}>
                                    <Td>{element.productCodeLine}</Td>
                                    <Td>{element.nameProductLine}</Td>
                                    <Td style={{textAlign:"center"}}>{element.cantLine}</Td>                                    
                                    <Td>
                                        <button type='button' onClick={()=>{deleteLine(ind)}}><HiOutlineTrash /></button>
                                    </Td>
                                </Tr>);
                            })
                        }
                        
                        
                    </TBody>
                </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-8" >
                <div className='col-span-12'>
                    <div className="col-span-1">
                        <FormItem
                            label="Observación"
                            invalid={(errors.observation && touched.observation) as boolean}
                            errorMessage={errors.observation}
                        >   
                            <Field
                                type="text"
                                autoComplete="off"
                                name="observation"
                                placeholder="Observación:"
                                component={Input}
                                textArea
                                rows={8}
                            />
                        </FormItem>
                    </div>
                </div>                
            </div>

            <div className='mt-4'>
                
            </div>

            
        </AdaptableCard>
    )
}

export default ProductsInformationFields
