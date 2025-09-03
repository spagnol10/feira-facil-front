import Button from "../../components/standard/Button";
import CustomInput from "../../components/standard/CustomInput";
import CustomTextArea from "../../components/standard/CustomTextArea";
import CustomToggle from "../../components/standard/CustomToggle";
import DefaultSelectOne from "../../components/standard/DefaultSelectOne";
import { ArrowLeftIcon } from "../../components/svg/SvgIcons";
import {
  EnumMeasurementType,
  EnumMeasurementUnit,
  EnumProductCategory,
} from "../../utils/types";
import {
  formatCurrency,
  handleChange,
  handleChangeValue,
} from "../../utils/util";
import { Product } from "../../model/Product";
import ProductImageUploader from "../image/ProductImageUploader";

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
    <div className="w-full max-w-full bg-white p-6 md:p-10 rounded-2xl shadow-md">
      <button
        onClick={() => setProductToEdit(undefined)}
        className="flex items-center gap-2 text-gray-600 hover:text-dark-color transition"
      >
        <ArrowLeftIcon />
        <span>Voltar</span>
      </button>

      <h2 className="mt-6 text-2xl font-semibold text-dark-color">
        {isNewProduct ? "Cadastrar Produto" : "Editar Produto"}
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Preencha os dados abaixo para {isNewProduct ? "criar" : "atualizar"} o
        produto.
      </p>

      <div className="mt-8 flex justify-center">
        <ProductImageUploader
          imageUrl={productToEdit.imageUrl}
          onImageChange={(file) => {
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setFieldValue("imageUrl", reader.result?.toString());
              };
              reader.readAsDataURL(file);
            } else {
              setFieldValue("imageUrl", undefined);
            }
          }}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CustomInput
          id="name"
          value={productToEdit.name ?? ""}
          inputHeaderText="Nome"
          onChange={(e) => handleChange(e, setProductToEdit)}
        />

        <DefaultSelectOne
          handleSelect={(val) =>
            handleChangeValue(val, "measurementType", setProductToEdit)
          }
          inputHeaderText="Tipo mensuração"
          placeHolder="Selecione"
          optionValue={productToEdit?.measurementType?.toString() || ""}
          options={[
            EnumMeasurementType.UNIT,
            EnumMeasurementType.BOX,
            EnumMeasurementType.WEIGHT,
            EnumMeasurementType.VOLUME,
          ]}
        />

        <DefaultSelectOne
          handleSelect={(val) =>
            handleChangeValue(val, "measurementUnit", setProductToEdit)
          }
          inputHeaderText="Unidade"
          placeHolder="Selecione"
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
          handleSelect={(val) =>
            handleChangeValue(val, "category", setProductToEdit)
          }
          inputHeaderText="Categoria"
          placeHolder="Selecione"
          optionValue={productToEdit?.category?.toString() ?? ""}
          options={[
            EnumProductCategory.VERDURA,
            EnumProductCategory.LEGUME,
            EnumProductCategory.FRUTA,
            EnumProductCategory.CEREAIS_GRAOS,
            EnumProductCategory.ERVAS_TEMPEROS,
            EnumProductCategory.ARTESANATO,
            EnumProductCategory.FLORES,
          ]}
        />

        <CustomInput
          id="costPrice"
          value={formatCurrency(productToEdit.costPrice ?? 0)}
          inputHeaderText="Preço de custo"
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^\d]/g, "");
            const numericValue = Number(rawValue) / 100;

            setProductToEdit(
              new Product({
                ...productToEdit,
                costPrice: numericValue,
              })
            );
          }}
        />

        <CustomInput
          id="sellingPrice"
          value={formatCurrency(productToEdit.sellingPrice ?? 0)}
          inputHeaderText="Preço de venda"
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^\d]/g, "");
            const numericValue = Number(rawValue) / 100;

            setProductToEdit(
              new Product({
                ...productToEdit,
                sellingPrice: numericValue,
              })
            );
          }}
        />

        <div className="flex items-center gap-4">
          <p className="text-gray-700">Ativo</p>
          <CustomToggle
            idToggle="active"
            selected={productToEdit.active ?? false}
            handleChange={() => setFieldValue("active", !productToEdit.active)}
          />
        </div>
      </div>

      <div className="mt-8">
        <CustomTextArea
          id="description"
          rows={6}
          value={productToEdit.description ?? ""}
          placeHolder="Descrição do produto"
          onChange={(e) => handleChange(e, setProductToEdit)}
        />
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          disabled={!!validateProduct(productToEdit)}
          text={isNewProduct ? "Cadastrar" : "Salvar alterações"}
          onClick={isNewProduct ? saveProduct : updateProduct}
        />
      </div>
    </div>
  );
}
