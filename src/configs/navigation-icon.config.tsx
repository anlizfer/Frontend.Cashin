import {   
    HiOutlineHome,
} from 'react-icons/hi'
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

import { 
    MdSportsBasketball,
    MdPeopleOutline,
    MdOutlineShoppingCart,
    MdPhoneCallback,
    MdOutlinePeopleAlt,
    MdOutlineFactory,
    MdSettings
} from "react-icons/md";
import { 
    TbTruck 
} from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { LuPackage } from "react-icons/lu";
import { TbPackage } from "react-icons/tb";






export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    products:<LuPackage />,
    customers:<MdPeopleOutline />,
    orders:<MdOutlineShoppingCart />,
    confirmations:<MdPhoneCallback />,
    users:<MdOutlinePeopleAlt />,
    companies:<MdOutlineFactory />,
    configuration:<MdSettings />,
    routes:<TbTruck />,
    remissions:<HiOutlineClipboardDocumentCheck />,    
    withdrawls:<GiMoneyStack />,
    pickingpacking:<TbPackage />
}

export default navigationIcon
