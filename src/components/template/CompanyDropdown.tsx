import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineLogout, HiOutlineUser, HiOutlineOfficeBuilding,HiOutlinePlus } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { forEach } from 'lodash'

type DropdownList = {
    id?:number
    label?: string
    path: string
    icon: JSX.Element
}




const _CompanyDropdown = ({ className }: CommonProps) => {

    
    

    const { avatar, userName, authority, email,companies } = useAppSelector(
        (state) => state.auth.user
    )

    const [companiesUser, setCompayUser]=useState(companies);
    const [dropdownItemList, SetDropdownItemList]=useState<DropdownList[]>([]); 

    useEffect(()=>{
        let itemDrop:DropdownList[]=[];
        companiesUser?.forEach((item)=>{
            itemDrop.push({
                id:item.id,
                label: item.name,
                path: '/app/home',
                icon: <HiOutlineOfficeBuilding />,
            })
        });

        SetDropdownItemList(itemDrop);

    },[])
    

    const  urlCompany = () => {
        console.log("'/add-company'");
    }

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            {               
                <Avatar size={32} shape="circle" icon={<HiOutlineOfficeBuilding />} />
            }

            <div className="hidden md:block">
                <div className="text-xs capitalize">Compañía A</div>                
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
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
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
