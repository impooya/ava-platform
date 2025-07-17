import { LogOut, User } from "lucide-react"
import Dropdown from "./dropdown"

const options = [{
    label: "مهمان",
    icon: <User />
},
{
    label: "خروج",
    icon: <LogOut />
}
]
function AppHeader() {
    return (
        <header className="flex w-full justify-end items-end pt-12 pl-12">
            <Dropdown options={options} />
        </header>
    )
}

export default AppHeader