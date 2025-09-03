export default function WaitingPaymentDialog() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="font-bold text-lg">Aguardando pagamento...</h2>
        <p className="mt-2">Verificando status do pagamento em tempo real.</p>
      </div>
    </div>
  );
}
