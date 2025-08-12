import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import GoBackBtn from "../../components/standard/GoBackBtn";
import Header from "../../components/standard/Header";
import { LogoIcon } from "../../components/svg/SvgIcons";
import TokenPhoneValidator from "../../components/tokenphonevalidator";
import { EnumAuthScreen } from "../../utils/types";
import { equalsEnum, formatPhoneInput, validatePhone } from "../../utils/util";
import { useAuthViewModel } from "../../viewmodel/auth/view.model";

export default function AuthView() {
    const viewModel = useAuthViewModel();

    return (
        <>
            <Header title="FeiraFácil - Login" content="Realize o seu login com facilidade." />
            <main className="w-full h-screen md:flex md:items-end">
                <div className="h-screen w-full bg-login bg-cover hidden md:flex" />
                <div className="w-full h-full md:max-w-lg bg-white shadow-3xl">
                    <div className="w-full h-1/4 bg-white px-28 border-b">
                        <span className="h-full flex justify-center items-center">
                            <LogoIcon />
                        </span>
                    </div>
                    {equalsEnum(viewModel.authScreen, EnumAuthScreen.LOGIN) &&
                        <div className="w-full p-6 h-3/4 md:h-min md:bg-white md:rounded-b-3xl md:p-10">
                            <>
                                <div>
                                    <h1 className="text-xl font-semibold text-secondary-dark md:text-1.5xl">
                                        Faça Login
                                    </h1>
                                    <p className="text-sm text-primary-gray pt-4 whitespace-pre-wrap xs:whitespace-nowrap">
                                        Seja bem-vindo, aqui é fácil aproveitar a feira.
                                    </p>
                                </div>
                                <form onSubmit={e => e.preventDefault()} className="py-7">
                                    <CustomInput id="phone" onChange={viewModel.handleChange}
                                        value={formatPhoneInput(viewModel.authFormFields.phone ?? "")}
                                        invalid={viewModel.authFormFields.phone ? !validatePhone(viewModel.authFormFields.phone) : false}
                                        inputHeaderText="Telefone" type="tel" maxLength={15} />
                                    <span className="block pt-7">
                                        <CustomInput id="password" onChange={viewModel.handleChange} withEyeIcon
                                            inputHeaderText="Senha" value={viewModel.authFormFields.password} type="password" />
                                    </span>
                                    <span className="flex justify-end pt-4">
                                        <button onClick={() => viewModel.setAuthScreen(EnumAuthScreen.FORGOT_PASSWORD)}
                                            className="text-sm font-bold text-secondary">
                                            Esqueci minha senha
                                        </button>
                                    </span>
                                </form>
                                <span>
                                    <Button text="Login" disabled={!viewModel.enableLogin() || viewModel.loading} onClick={viewModel.handleLogin} />
                                    <Button text="Novo Usuário" onClick={viewModel.handleStartCreateUser}
                                        className="bg-white text-secondary border border-secondary mt-4" />
                                </span>
                                <span className="flex justify-center pt-8">
                                    <p className="text-sm text-primary-gray whitespace-pre-wrap text-center md:whitespace-normal">
                                        Copyright © 2025 todos os {"\n"} direitos reservados.
                                    </p>
                                </span>
                            </>
                        </div>
                    }
                    {equalsEnum(viewModel.authScreen, EnumAuthScreen.FORGOT_PASSWORD) &&
                        <div className="p-6 md:bg-white md:rounded-b-3xl md:p-10">
                            <GoBackBtn text="Retornar" onClick={viewModel.goBackLogin} renderText />
                            <div className="mt-3">
                                <h1 className="text-xl font-semibold text-secondary-dark md:text-1.5xl">
                                    Esqueci minha senha
                                </h1>
                                {!viewModel.isForgotTokenSent ?
                                    <>
                                        <p className="text-sm text-primary-gray mt-4">
                                            Vamos enviar um código para seu WhatsApp,
                                            validando o código já podemos relizar a troca da sua senha.
                                        </p>
                                        <p className="text-sm text-primary-gray mt-4">
                                            Informe o número de telefone do seu cadastro.
                                        </p>
                                        <form onSubmit={e => e.preventDefault()}>
                                            <span className="block mt-6">
                                                <CustomInput id="phone" onChange={viewModel.handleChange}
                                                    value={formatPhoneInput(viewModel.authFormFields.phone ?? "")}
                                                    invalid={viewModel.authFormFields.phone ? !validatePhone(viewModel.authFormFields.phone) : false}
                                                    inputHeaderText="Telefone" type="tel" maxLength={15} />
                                            </span>
                                        </form>
                                        <div className="mt-8">
                                            <Button text="Enviar código" onClick={() => viewModel.handleSendTokenNotification(true)}
                                                disabled={!validatePhone(viewModel.authFormFields.phone)} />
                                        </div>
                                    </>
                                    :
                                    viewModel.showForgotPasswordInputs ?
                                        <div>
                                            <form onSubmit={e => e.preventDefault()}>
                                                <span className="block mt-6">
                                                    <CustomInput id="password" withEyeIcon onChange={viewModel.handleChange} placeHolder="Senha (Mais que 6 caracteres)"
                                                        inputHeaderText="Senha" value={viewModel.authFormFields.password} type="password" />
                                                </span>
                                                <span className="block mt-6">
                                                    <CustomInput id="userConfirmPassword" withEyeIcon onChange={viewModel.handleChange}
                                                        inputHeaderText="Digite a senha novamente" value={viewModel.authFormFields.userConfirmPassword} type="password" />
                                                </span>
                                            </form>
                                            <div className="mt-8">
                                                <Button text="Atualizar senha" disabled={!viewModel.enableChangePassword()}
                                                    onClick={viewModel.handleChangePass} />
                                            </div>
                                        </div>
                                        :
                                        <TokenPhoneValidator
                                            countdown={viewModel.countdown}
                                            tokenCode={viewModel.tokenCode}
                                            inputRefs={viewModel.inputRefs}
                                            phone={viewModel.authFormFields.phone}
                                            handleChangeTokenCode={viewModel.handleChangeTokenCode}
                                            handleKeyDownTokenCode={viewModel.handleKeyDownTokenCode}
                                            handlePasteTokenCode={viewModel.handlePasteTokenCode}
                                            handleResendTokenCode={viewModel.handleResendTokenCode}
                                            handleValidateToken={viewModel.validateToken}
                                        />

                                }
                            </div>
                        </div>
                    }
                    {equalsEnum(viewModel.authScreen, EnumAuthScreen.SEND_VALIDATION_TOKEN) &&
                        <div className="md:h-min md:bg-white md:rounded-b-3xl">
                            <div className="p-6 md:p-10">
                                <>
                                    <GoBackBtn text="Retornar" renderText onClick={() => viewModel.goBackLogin()} />
                                    <div className="mt-4">
                                        <h1 className="text-xl font-semibold text-secondary-dark text-1.5xl leading-none">
                                            Cadastro - Validar telefone
                                        </h1>
                                        <p className="text-sm text-primary-gray pt-4">
                                            Para proteger sua conta, enviaremos um código de verificação no seu WhatsApp.
                                        </p>
                                        <p className="text-sm text-primary-gray pt-4">
                                            Informe seu número para envio do código.
                                        </p>
                                        <form onSubmit={e => e.preventDefault()}>
                                            <span className="block mt-6">
                                                <CustomInput id="phone" onChange={viewModel.handleChange}
                                                    value={formatPhoneInput(viewModel.authFormFields.phone ?? "")}
                                                    invalid={viewModel.authFormFields.phone ? !validatePhone(viewModel.authFormFields.phone) : false}
                                                    inputHeaderText="Telefone" type="tel" maxLength={15} />
                                            </span>
                                        </form>
                                        <div className="mt-8">
                                            <Button text="Enviar código" onClick={viewModel.handleSendTokenNotification}
                                                disabled={!validatePhone(viewModel.authFormFields.phone)} />
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    }
                    {equalsEnum(viewModel.authScreen, EnumAuthScreen.VERIFY_TOKEN) &&
                        <div className="md:h-min md:bg-white md:rounded-b-3xl">
                            <div className="p-6 md:p-10">
                                <>
                                    <GoBackBtn text="Retornar" renderText onClick={() => viewModel.setAuthScreen(EnumAuthScreen.SEND_VALIDATION_TOKEN)} />
                                    <div className="mt-4">
                                        <h1 className="text-xl font-semibold text-secondary-dark text-1.5xl leading-none">
                                            Cadastro - Validar telefone
                                        </h1>
                                        <TokenPhoneValidator
                                            countdown={viewModel.countdown}
                                            tokenCode={viewModel.tokenCode}
                                            inputRefs={viewModel.inputRefs}
                                            phone={viewModel.authFormFields.phone}
                                            handleChangeTokenCode={viewModel.handleChangeTokenCode}
                                            handleKeyDownTokenCode={viewModel.handleKeyDownTokenCode}
                                            handlePasteTokenCode={viewModel.handlePasteTokenCode}
                                            handleResendTokenCode={viewModel.handleResendTokenCode}
                                            handleValidateToken={viewModel.validateToken}
                                        />
                                    </div>
                                </>
                            </div>
                        </div>
                    }
                    {equalsEnum(viewModel.authScreen, EnumAuthScreen.CREATE_USER) &&
                        <div className="md:h-min md:bg-white md:rounded-b-3xl">
                            <div className="p-6 md:p-10">
                                <>
                                    <GoBackBtn text="Retornar" renderText onClick={() => viewModel.goBackLogin()} />
                                    <div className="mt-4">
                                        <h1 className="text-xl font-semibold text-secondary-dark text-1.5xl leading-none">
                                            Novo usuário
                                        </h1>
                                        <form onSubmit={e => e.preventDefault()}>
                                            <span className="block mt-6">
                                                <CustomInput id="userName" onChange={viewModel.handleChange} inputHeaderText="Nome"
                                                    value={viewModel.authFormFields.userName} type="text" />
                                            </span>

                                            {/* HABILITAR QUANDO FLUXOS DE CLIENTE ESTIVEREM MINIMAMENTE IMPLEMENTADOS */}
                                            {/* <span className="block mt-6">
                                                <p className="mb-4 text-dark-color md:text-lg">
                                                    Eu sou:
                                                </p>
                                                <div className="w-full">
                                                    <CustomToggle idToggle="user-type" selected={viewModel.isSellerType}
                                                        handleChange={viewModel.handleChangeUserType} firstText="Feirante" secondText="Cliente" />
                                                </div>
                                                {viewModel.isSellerType ?
                                                    <p className="text-xs text-primary-gray mt-4">
                                                        Como <b>Feirante</b>, você poderá vender seus produtos.
                                                    </p>
                                                    :
                                                    <p className="text-xs text-primary-gray mt-4">
                                                        Como <b>Cliente</b>, você poderá comprar os produtos da feirinha.
                                                    </p>
                                                }
                                            </span> */}
                                            <span className="block mt-6">
                                                <CustomInput id="password" withEyeIcon onChange={viewModel.handleChange} placeHolder="Senha (Mais que 6 caracteres)"
                                                    inputHeaderText="Senha" value={viewModel.authFormFields.password} type="password" />
                                            </span>
                                            <span className="block mt-6">
                                                <CustomInput id="userConfirmPassword" withEyeIcon onChange={viewModel.handleChange}
                                                    inputHeaderText="Digite a senha novamente" value={viewModel.authFormFields.userConfirmPassword} type="password" />
                                            </span>
                                        </form>
                                        <div className="mt-8">
                                            <Button text="Criar conta" disabled={!viewModel.enableCreateAccount() || viewModel.loading}
                                                onClick={viewModel.handleCreateAccount} />
                                        </div>
                                    </div>
                                </>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}