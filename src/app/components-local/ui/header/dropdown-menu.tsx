import { User } from "@/app/types/general";
import DropdownItem from "./dropdown-item";

const DropdownMenu = (props: { className: string, user: User | null, showMenu: boolean | null }) => {
    return (
        <div className={props.className}>
            <DropdownItem user={props.user} showMenu={props?.showMenu} />
        </div>
    )
}

export default DropdownMenu;
