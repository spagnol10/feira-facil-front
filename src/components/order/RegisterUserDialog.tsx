export default function RegisterUserDialog() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="font-bold text-lg">Registrar usuário</h2>
        <input type="text" placeholder="Nome" className="w-full border rounded p-1 mt-2" />
        <input type="text" placeholder="Documento" className="w-full border rounded p-1 mt-2" />
        <button className="btn btn-primary mt-2">Registrar</button>
      </div>
    </div>
  );
}
