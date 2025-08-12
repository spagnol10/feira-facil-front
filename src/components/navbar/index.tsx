import Image from "next/image";
import router from "next/router";
import FeiraFacilSmallIcon from "../../assets/logo-icon.png";
import FeiraFacilFullIcon from "../../assets/logo-large.png";
import { useAppContext } from "../../context/appContext";
import { EnumScreen, INavBar } from "../../utils/types";
import { equalsEnum, handleLogout } from "../../utils/util";
import useMiddleware from "../../viewmodel/middleware";
import SimpleDialog from "../standard/SimpleDialog";
import { BellIcon, ChevronLeftIcon, ChevronRightIcon, CompanyIcon, DashboardIcon, ExitAppIcon, OrderIcon, ProductIcon, SaleIcon, StockIcon, UserIcon } from "../svg/SvgIcons";
import useNavbarViewModel from "./view.model";

export default function NavBar({ screen }: INavBar) {
    const viewModel = useNavbarViewModel();
    const { showFullNavbar, handleChangeShowFullNavbar } = useAppContext();

    return (
        <>
            <div className="hidden absolute top-6 right-6 z-10 h-10 w-30 bg-white 
                md:flex justify-center gap-2 items-center rounded-full shadow-lg">
                <button onClick={viewModel.openCloseDialogNotifications} className="p-2">
                    <BellIcon fill="#245F40" />
                </button>
                <button className="p-2" onClick={() => router.push("/profile")}>
                    <UserIcon fill="#245F40" />
                </button>
            </div>
            {/* Mobile nav */}
            <nav className="bg-gray-100 md:hidden">
                <div className={`shadow-lg mb-4 ${viewModel.showMobileMenu ? 'h-screen flex-col' : 'h-20 rounded-b-2.5xl'}`}>
                    <div className="w-full flex h-20 items-center justify-end z-10 absolute bg-white">
                        <span className="w-52">
                            <Image src={FeiraFacilFullIcon} alt="Imagem logo Feira Fácil" width={192}/>
                        </span>
                        <button className="h-6 flex justify-end w-1/4 ml-4 pr-8 pt-1" onClick={() => viewModel.setShowMobileMenu(!viewModel.showMobileMenu)}>
                            <div className="grid justify-items-center gap-1">
                                <span className={`h-0.5 w-5 rounded-full bg-secondary transition ${viewModel.showMobileMenu && 'rotate-45 translate-y-2'}`} />
                                <span className={`h-0.5 w-5 rounded-full bg-secondary transition ${viewModel.showMobileMenu && 'scale-x-0'}`} />
                                <span className={`h-0.5 w-5 rounded-full bg-secondary transition ${viewModel.showMobileMenu && '-rotate-45 -translate-y-2'}`} />
                            </div>
                        </button>
                    </div>
                    {viewModel.showMobileMenu &&
                        <div className="h-full w-full flex flex-col px-8 bg-white pt-20 animate-fade-down z-0 rounded-b-2.5xl shadow-lg">
                            <button title="Home" className={`flex h-14 mt-12 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.HOME) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <DashboardIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.HOME) && 'font-semibold'}`}>
                                    Início
                                </p>
                            </button>
                            <button title="Vendas" className={`flex h-14 mt-2 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.SALES) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/sales")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <SaleIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.SALES) && 'font-semibold'}`}>
                                    Vendas
                                </p>
                            </button>
                            <button title="Empresa" className={`flex h-14 mt-2 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.COMPANY) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/company")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <CompanyIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.COMPANY) && 'font-semibold'}`}>
                                    Empresa
                                </p>
                            </button>
                            <button title="Produtos" className={`flex h-14 mt-2 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.PRODUCTS) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/products")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <ProductIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.PRODUCTS) && 'font-semibold'}`}>
                                    Produtos
                                </p>
                            </button>
                            <button title="Estoque" className={`flex h-14 mt-2 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.STOCK) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/stock")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <StockIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.STOCK) && 'font-semibold'}`}>
                                    Estoque
                                </p>
                            </button>
                            <div className="w-full flex justify-center animate-fade-up-fast">
                                <div className="h-0.5 w-4/5 bg-primary my-2" />
                            </div>
                            <button title="Venda" className={`flex h-14 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.ORDER) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/order")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <OrderIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.ORDER) && 'font-semibold'}`}>
                                    Realizar venda
                                </p>
                            </button>
                            <button title="Notificação" className="flex h-14 mt-16 gap-3 items-center w-full 
                                 hover:bg-primary hover:rounded-lg hover:bg-opacity-10"
                                onClick={viewModel.openCloseDialogNotifications}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <BellIcon fill="#245F40" />
                                </span>
                                <p className="text-secondary text-sm">
                                    Notificações
                                </p>
                            </button>
                            <button title="Perfil" className={`flex h-14 gap-3 items-center w-full
                            ${equalsEnum(screen, EnumScreen.PROFILE) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                                onClick={() => router.push("/profile")}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <UserIcon fill="#245F40" />
                                </span>
                                <p className={`text-secondary text-sm ${equalsEnum(screen, EnumScreen.PROFILE) && 'font-semibold'}`}>
                                    Perfil
                                </p>
                            </button>
                            <button title="Perfil" className="flex h-14 mt-auto mb-16 gap-3 items-center w-full
                                hover:bg-primary hover:rounded-lg hover:bg-opacity-10"
                                onClick={() => viewModel.setShowExitDialog(true)}>
                                <div className="w-1/3" />
                                <span className="mr-4 pl-3">
                                    <ExitAppIcon fill="#245F40" />
                                </span>
                                <p className="text-secondary text-sm">
                                    Sair
                                </p>
                            </button>
                        </div>
                    }
                </div>
            </nav>
            {/* Desktop nav */}
            <nav className="h-screen left-0 z-0 bg-gray-100 hidden md:flex">
                <div className={`h-full w-full flex flex-col rounded-r-2.5xl bg-white pb-8 pt-6 shadow-2xl 
                    transform ease-in-out duration-300 ${showFullNavbar ? 'w-60 pl-4' : 'w-20 px-4'}`}>
                    <div title="Feira Fácil Home" className={`flex justify-center ${showFullNavbar && 'w-52 pl-1'}`}>
                        <span className={`flex ${showFullNavbar && 'w-52'}`}>
                            <Image src={showFullNavbar ? FeiraFacilFullIcon : FeiraFacilSmallIcon}
                                alt="Imagem logo Feira Fácil" width={showFullNavbar ? 192 : 36}/>
                        </span>
                    </div>
                    <button title="Home" className={`flex h-14 mt-16 items-center  ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                            ${equalsEnum(screen, EnumScreen.HOME) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <DashboardIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.HOME) && 'font-semibold'}`}>
                                Início
                            </p>
                        }
                    </button>
                    <button title="Minhas vendas" className={`flex h-14 items-center ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                        ${equalsEnum(screen, EnumScreen.SALES) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/sales")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <SaleIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.SALES) && 'font-semibold'}`}>
                                Vendas
                            </p>
                        }
                    </button>
                    <button title="Minha empresa" className={`flex h-14 items-center ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                        ${equalsEnum(screen, EnumScreen.COMPANY) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/company")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <CompanyIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.COMPANY) && 'font-semibold'}`}>
                                Empresa
                            </p>
                        }
                    </button>
                    <button title="Produtos" className={`flex h-14  items-center ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                    ${equalsEnum(screen, EnumScreen.PRODUCTS) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/products")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <ProductIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.PRODUCTS) && 'font-semibold'}`}>
                                Produtos
                            </p>
                        }
                    </button>
                    <button title="Estoque" className={`flex h-14  items-center ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                    ${equalsEnum(screen, EnumScreen.STOCK) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/stock")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <StockIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.STOCK) && 'font-semibold'}`}>
                                Estoque
                            </p>
                        }
                    </button>
                    <div className={`h-0.5 w-3/5 self-center bg-primary my-6 ${showFullNavbar && 'w-4/5'}`} />
                    <button title="Realizar vendas" className={`flex h-14 items-center ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}
                     ${equalsEnum(screen, EnumScreen.ORDER) ? 'bg-primary rounded-lg' : "hover:bg-primary hover:rounded-lg hover:bg-opacity-10"}`}
                        onClick={() => router.push("/order")}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <OrderIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className={`text-secondary text-sm
                                ${equalsEnum(screen, EnumScreen.ORDER) && 'font-semibold'}`}>
                                Realizar venda
                            </p>
                        }
                    </button>
                    <button title={showFullNavbar ? "Retrair" : "Expandir"} className={`flex mt-auto h-14 hover:rounded-md
                     items-center hover:bg-primary hover:bg-opacity-10 ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}`}
                        onClick={() => handleChangeShowFullNavbar()}>
                        {showFullNavbar ?
                            <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                                <ChevronLeftIcon />
                            </span>
                            :
                            <ChevronRightIcon />
                        }
                        {showFullNavbar &&
                            <p className="text-secondary text-sm ease-in-out">
                                Retrair
                            </p>
                        }
                    </button>
                    <button title="Sair" className={`flex h-14 items-center hover:bg-primary hover:rounded-md
                        hover:bg-opacity-10 ${showFullNavbar ? 'w-48' : 'w-12 self-center justify-center'}`}
                        onClick={() => viewModel.setShowExitDialog(true)}>
                        <span className={` ${showFullNavbar && 'mr-4 pl-3'}`}>
                            <ExitAppIcon fill="#245F40" />
                        </span>
                        {showFullNavbar &&
                            <p className="text-secondary text-sm ease-in-out">
                                Sair
                            </p>
                        }
                    </button>
                </div>
            </nav>
            {viewModel.showExitDialog &&
                <SimpleDialog dialogTitle="Deseja sair do sistema?"
                    firstBtnText="Sair"
                    secondBtnText="Cancelar"
                    handleFunction={() => handleLogout(false)}
                    handleClose={() => viewModel.setShowExitDialog(false)} />
            }
        </>
    )
}