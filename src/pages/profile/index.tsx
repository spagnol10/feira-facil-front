import AddressForm from "../../components/addressform/view";
import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import DefaultHeaderTitle from "../../components/standard/DefaultHeaderTitle";
import DefaultScreenLayout from "../../components/standard/DefaultScreenLayout";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import Header from "../../components/standard/Header";
import { EnumScreen } from "../../utils/types";
import * as utils from "../../utils/util";
import useProfileViewModel from "../../viewmodel/profile/view.model";

export default function ProfileView() {
    const viewModel = useProfileViewModel();

    return (
        (viewModel.isClient && viewModel.isAuth) &&
        <>
            <Header title="FeiraFácil" content="Meu perfil!" />
            <DefaultScreenLayout loadingText={viewModel.loadingText} screen={EnumScreen.PROFILE} >
                <div className="flex flex-col md:h-full">
                    <DefaultHeaderTitle title="Gerencie aqui suas informações👨‍🌾"
                        content="Aqui você  visualiza, altera e mantém atualizado seus dados" />
                    <div>
                        <h2 className="text-dark-color text-lg font-medium">
                            Informações básicas
                        </h2>
                        <div className="flex lg:w-4/5 xl:w-3/5 flex-col gap-6 mt-10">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <span className="w-full">
                                    <CustomInput id="name" value={viewModel.userData?.name ?? ""}
                                        invalid={!utils.isValidString(viewModel.userData.name)}
                                        inputHeaderText="Nome" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                </span>
                                <span className="w-full">
                                    <CustomInput id="email" placeHolder="Insira seu e-mail" type="email" value={viewModel.userData?.email ?? ""}
                                        invalid={viewModel.userData.email ? !utils.validateEmail(viewModel.userData.email) : false}
                                        inputHeaderText="E-mail" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                </span>
                            </div>
                            <div className="flex flex-col gap-6 md:flex-row">
                                <span className="w-full flex flex-col md:flex-row gap-6">
                                    <span className="w-full gap-6 flex">
                                        <span className="w-full">
                                            <CustomInput id="document" disabled={!viewModel.isCompleteRegister} maxLength={14}
                                                value={utils.formatCPFInput(viewModel.userData?.document ?? "")} placeHolder="Insira seu CPF"
                                                invalid={viewModel.userData.document ? !utils.validateCPF(viewModel.userData.document) : false}
                                                inputHeaderText="Documento" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                        </span>
                                        <span className="w-full">
                                            <CustomInput id="phone" type="tel" value={utils.formatPhoneInput(viewModel.userData?.phone ?? "")} maxLength={15}
                                                invalid={viewModel.userData.phone ? !utils.validatePhone(viewModel.userData.phone) : false} disabled={true}
                                                inputHeaderText="Telefone" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                        </span>
                                    </span>
                                    <span className="w-full gap-6 flex">
                                        <span className="w-full">
                                            <DefaultSelectOne handleSelect={(e: any) => viewModel.handleUpdateGender(e)} inputHeaderText="Sexo"
                                                options={["Masculino", "Feminino"]} optionValue={viewModel.userData?.gender ? viewModel.parseGenderStrToEnum() : "Selecione"} />
                                        </span>
                                        <span className="w-full">
                                            <CustomInput id="birthdate" disabled={!viewModel.isCompleteRegister} maxLength={10}
                                                value={utils.formatDateDDMMYYYYInput(viewModel.userData?.birthdate ?? "")} placeHolder="Insira Data Nascimento"
                                                invalid={viewModel.userData.birthdate ? !utils.isValidateBirtday(viewModel.userData.birthdate) : false}
                                                inputHeaderText="Data nascimento" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 md:flex-row">
                                <span className="w-full">
                                    <CustomInput id="password" type="password" withEyeIcon value={viewModel.userData?.password ?? ""}
                                        inputHeaderText="Senha" onChange={e => utils.handleChange(e, viewModel.setUserData)} />
                                </span>
                                <span className="w-full">
                                    <CustomInput id="passsword-confirm" disabled={!viewModel.isPasswordChanged()}
                                        type="password" withEyeIcon value={viewModel.confirmPassword ?? ""}
                                        invalid={viewModel.confirmPassword ? !utils.equalsStr(viewModel.confirmPassword, viewModel.userData.password ?? "") : false}
                                        inputHeaderText="Confirme a senha" onChange={e => viewModel.setConfirmPassword(e.target.value)} />
                                </span>
                            </form>
                            <p className="text-sm ">
                                Todos os campos são obrigatórios. <span className="font-semibold">Confirmar a senha</span> é utilizado somente em casos de alteração da senha.
                            </p>
                        </div>
                        <h2 className="text-dark-color text-lg font-medium mt-16">
                            Endereço
                        </h2>
                        <div className="flex lg:w-4/5 xl:w-3/5 flex-col gap-6 mt-10">
                            <AddressForm address={viewModel?.userData?.address}
                                setObject={viewModel.setUserData} isParentSetObject showMessage />
                        </div>
                    </div>
                    <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                        <span className="w-full md:w-40">
                            <Button disabled={!viewModel.isValidUpdate()} text="Salvar alterações" onClick={viewModel.handleUpdateUserData} />
                        </span>
                    </div>
                </div>
            </DefaultScreenLayout>
        </>
    );
}