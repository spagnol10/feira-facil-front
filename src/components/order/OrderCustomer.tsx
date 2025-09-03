import Button from "../../components/standard/Button";
import {
  FindUserIcon,
  NewUserIcon,
  UnknownUserIcon,
} from "../../components/svg/SvgIcons";
import { CustomerType } from "../../viewmodel/order/view.model";

type Props = {
  selectedUser?: CustomerType;
  setSelectedUser: (user?: CustomerType) => void;
  showFindUser: boolean;
  setShowFindUser: (val: boolean) => void;
  showRegisterUser: boolean;
  setShowRegisterUser: (val: boolean) => void;
  defaultUser: CustomerType;
};

export default function OrderCustomer({
  selectedUser,
  setSelectedUser,
  showFindUser,
  setShowFindUser,
  showRegisterUser,
  setShowRegisterUser,
  defaultUser,
}: Props) {
  return (
    <div>
      {selectedUser ? (
        <div className="flex gap-2 justify-between w-full">
          <div className="flex flex-col gap-2">
            <span className="flex gap-2">
              <p className="text-secondary text-sm font-semibold">Nome:</p>
              <p className="text-secondary text-sm">{selectedUser.name}</p>
            </span>
            <span className="flex gap-2">
              <p className="text-secondary text-sm font-semibold">Documento:</p>
              <p className="text-secondary text-sm">{selectedUser.document}</p>
            </span>
          </div>
          <button onClick={() => setSelectedUser(undefined)}>
            <UnknownUserIcon fill="#b94848" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            icon={<FindUserIcon fill="#FFF" />}
            text="Buscar"
            className="border bg-tertiary text-white"
            onClick={() => setShowFindUser(true)}
          />
          <Button
            icon={<NewUserIcon fill="#FFF" />}
            text="Cadastrar"
            className="border bg-tertiary text-white"
            onClick={() => setShowRegisterUser(true)}
          />
          <Button
            icon={<UnknownUserIcon fill="#FFF" />}
            text="Não identificar"
            onClick={() => setSelectedUser(defaultUser)}
          />
        </div>
      )}
    </div>
  );
}
