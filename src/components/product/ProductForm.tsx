import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import CustomTextArea from "../../components/standard/CustomTextArea";
import CustomToggle from "../../components/standard/CustomToggle";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import { ArrowLeftIcon } from "../../components/svg/SvgIcons";
import { EnumMeasurementType, EnumMeasurementUnit, EnumProductCategory } from "../../utils/types";
import { handleChange, handleChangeValue, equalsBoolean } from "../../utils/util";
import { Product } from "../../model/Product";

interface ProductFormProps {
    productToEdit: Product;
    isNewProduct: boolean;
    setProductToEdit: (product?: Product) => void;
    setFieldValue: (field: keyof Product, value: any) => void;
    saveProduct: () => void;
    updateProduct: () => void;
    validateProduct: (product: Product) => string | null;
}

export default function ProductForm({
    productToEdit,
    isNewProduct,
    setProductToEdit,
    setFieldValue,
    saveProduct,
    validateProduct,
    updateProduct,
}: ProductFormProps) {
    return (
        <>
            <div>
                <button onClick={() => setProductToEdit(undefined)} className="flex gap-4">
                    <ArrowLeftIcon />
                    <p className="text-secondary">
                        Voltar
                    </p>
                </button>
                <div className="mt-8">
                    <h2 className="text-dark-color text-lg font-medium">
                        Dados do produto
                    </h2>
                    <div className="flex flex-col gap-6 mt-6 md:flex-row lg:w-9/12">
                        <span className="w-full">
                            <CustomInput
                                id="name"
                                value={productToEdit.name ?? ""}
                                inputHeaderText="Nome"
                                onChange={e => handleChange(e, setProductToEdit)} />
                        </span>
                        <DefaultSelectOne
                            handleSelect={val => handleChangeValue(val, "measurementType", setProductToEdit)}
                            inputHeaderText="Tipo mensuração"
                            placeHolder="Tipo de demensuração"
                            optionValue={productToEdit?.measurementType?.toString() || ""}
                            options={[
                                EnumMeasurementType.UNIT,
                                EnumMeasurementType.BOX,
                                EnumMeasurementType.WEIGHT,
                                EnumMeasurementType.VOLUME
                            ]}
                        />

                        <DefaultSelectOne
                            handleSelect={val => handleChangeValue(val, "measurementUnit", setProductToEdit)}
                            inputHeaderText="Unidade mensuração"
                            placeHolder="Unidade de mensuração"
                            optionValue={productToEdit?.measurementUnit?.toString() || ""}
                            options={[
                                EnumMeasurementUnit.KG,
                                EnumMeasurementUnit.G,
                                EnumMeasurementUnit.L,
                                EnumMeasurementUnit.ML,
                                EnumMeasurementUnit.QTD,
                            ]}
                        />

                        <DefaultSelectOne
                            handleSelect={val => handleChangeValue(val, "category", setProductToEdit)}
                            inputHeaderText="Tipo"
                            placeHolder="Tipo de Produto"
                            optionValue={productToEdit?.category?.toString() ?? ""}
                            options={[
                                EnumProductCategory.VERDURA,
                                EnumProductCategory.LEGUME,
                                EnumProductCategory.FRUTA,
                                EnumProductCategory.CEREAIS_GRAOS,
                                EnumProductCategory.ERVAS_TEMPEROS,
                                EnumProductCategory.ARTESANATO,
                                EnumProductCategory.FLORES
                            ]}
                        />
                    </div>
                    <div className="flex gap-6 mt-6 lg:w-[56.5%]">
                        <span className="w-full">
                            <CustomInput
                                id="costPrice"
                                value={productToEdit.costPrice?.toString() ?? ""}
                                inputHeaderText="Valor custo"
                                onChange={e => handleChange(e, setProductToEdit)} />
                        </span>
                        <span className="w-full">
                            <CustomInput
                                id="sellingPrice"
                                value={productToEdit.sellingPrice?.toString() ?? ""}
                                inputHeaderText="Valor venda"
                                onChange={e => handleChange(e, setProductToEdit)} />
                        </span>
                        <span className="flex gap-2 items-center">
                            <p>
                                Ativo
                            </p>
                            <span className="w-16">
                                <CustomToggle
                                    idToggle="active"
                                    selected={productToEdit.active ?? false}
                                    handleChange={() => setFieldValue("active", !productToEdit.active)} />
                            </span>
                        </span>
                    </div>
                    <div className="flex mt-6 w-full lg:w-[56%]">
                        <span className="w-full">
                            <CustomTextArea
                                id="description"
                                rows={10}
                                value={productToEdit.description ?? ""}
                                placeHolder="Descrição"
                                onChange={e => handleChange(e, setProductToEdit)} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full h-10 flex mt-10 md:mt-auto justify-end">
                <span className="w-full md:w-40">
                    <Button
                        disabled={!!validateProduct(productToEdit)}
                        text={isNewProduct ? "Cadastrar" : "Salvar alterações"}
                        onClick={isNewProduct ? saveProduct : updateProduct} />
                </span>
            </div>
        </>
    );
}