import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'
import { MdSportsBasketball } from "react-icons/md";


export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    products:<MdSportsBasketball />
}

export default navigationIcon
