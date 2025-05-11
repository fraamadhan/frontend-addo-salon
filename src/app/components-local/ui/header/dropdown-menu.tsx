import { User } from "@/app/types/general";
import DropdownItem from "./dropdown-item";

const DropdownMenu = (props: { className: string, user: User | null }) => {
    return (
        <div className={props.className}>
            <DropdownItem user={props.user} />
        </div>
    )
}

export default DropdownMenu;
