import { NavLink, Outlet } from "react-router"
import AppHeader from "../components/app-header"


function MainPageLayout() {
    return (
        <div>
            <AppHeader />
            <aside
                className="w-[166px] rounded-tl-[10px] rounded-bl-[10px] h-full fixed right-0 top-0 "
                style={{
                    backgroundImage: "url('/images/alefba-group.png'), linear-gradient(to bottom, #00B5A0, #00C69B)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <div className="mt-[50px] flex flex-col justify-center items-center gap-y-[181px]">
                    <div className="text-white flex justify-center items-center  gap-x-[11px]">
                        <svg width="19" height="38">
                            <use href="#ava-icon" width="19" height="38" />
                        </svg>
                        <span className=" font-iranyekan-bold text-xl">آوا</span>
                    </div>
                    <div className="space-y-[39px]">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-white font-iranyekan-bold flex  gap-x-3 justify-center items-center py-[9px] px-[21px] rounded-[10px] transition-all ${isActive ? "bg-[#02816E]" : "hover:bg-[#02816E]"
                                }`
                            }
                        >
                            <svg width="22" height="25">
                                <use href="#speach-icon" />
                            </svg>
                            تبدیل گفتار
                        </NavLink>
                        <NavLink
                            to="/archive"
                            className={({ isActive }) =>
                                `text-white font-iranyekan-bold flex  gap-x-3 justify-center items-center py-[9px] px-[21px] rounded-[10px] transition-all ${isActive ? "bg-[#02816E]" : "hover:bg-[#02816E]"
                                }`
                            }
                        >
                            <svg width="20" height="20">
                                <use href="#archive-icon" />
                            </svg>
                            آرشیو
                        </NavLink>
                    </div>
                </div>
            </aside>
            <main className="flex flex-col justify-center items-center h-full w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default MainPageLayout