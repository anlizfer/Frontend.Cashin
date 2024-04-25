import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser, HiOutlineOfficeBuilding,HiOutlinePlus } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { useAppSelector,useAppDispatch,setUser, CompanyState } from '@/store'
import { useEffect, useState } from 'react'
import { forEach } from 'lodash'

type DropdownList = {
    id?:number
    label?: string
    path: string
    icon: JSX.Element
    name?:string
    img?:string
}




const _CompanyDropdown = ({ className }: CommonProps) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    


    const { avatar, userName, authority, email,companies,companyDefault } = useAppSelector(
        (state) => state.auth.user
    )
    const userDefault = useAppSelector(
        (state) => state.auth.user
    )

    const [companiesUser, setCompayUser]=useState(companies);
    const [dropdownItemList, SetDropdownItemList]=useState<DropdownList[]>([]); 
    const [selCompany,setSelCompany]=useState(companyDefault);

    useEffect(()=>{
        let itemDrop:DropdownList[]=[];
        companiesUser?.forEach((item)=>{
            itemDrop.push({
                id:item.id,
                label: item.name,
                name: item.name,
                img : item.name,
                path: '/app/home',
                icon: <HiOutlineOfficeBuilding />,
            })
        });

        SetDropdownItemList(itemDrop);

    },[])
    

    const  urlCompany = () => {
        navigate('/app/company');
    }

    const setCompanyDefault=(company:CompanyState)=>{
        
        setSelCompany(company);

        dispatch(
            setUser(                            
                {
                    ...userDefault,
                    companyDefault:{
                        ...company
                    }
                }
            )
        )        
        navigate('/app/home');
    }

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            {               
                <Avatar size={32} shape="circle" icon={<HiOutlineOfficeBuilding />} />
            }

            <div className="hidden md:block">
                <div className="text-xs capitalize">{selCompany?.name}</div>                
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}                
                placement="bottom-end"
                renderTitle={UserAvatar}                
            >
                {/*<Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                Company
                            </div>                            
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />*/}
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.id}
                        eventKey={item.label}
                        className="mb-1 px-0" 
                        onClick={()=>setCompanyDefault(item)}
                    >
                        
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"                    
                    onClick={urlCompany}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlinePlus />
                    </span>
                    <span>Nueva Compañía</span>
                </Dropdown.Item>
                
            </Dropdown>
        </div>
    )
}

const CompanyDropdown = withHeaderItem(_CompanyDropdown)

export default CompanyDropdown
