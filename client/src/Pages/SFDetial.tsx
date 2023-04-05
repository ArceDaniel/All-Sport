import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import PrimaryButton from "../Components/PrimaryButton";

const SFDetail = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate("/reservas/:sport/canchas");
  const handleConfirm = () => {
    alert("Cancha confirmada");
    navigate("/reservas/:sport/canchas");
  };

  return (
    <Layout title="Detalles de la reserva">
      <div className="mx-[5%] my-5 flex flex-col w-[90%] bg-gradone px-5 py-2 rounded-md">
        <span className="opacity-70">Titulo</span>
        <span>Ubicacion</span>
      </div>
      <span>Informacion del partido:</span>
      <div className="flex flex-col gap-5 bg-white pb-2 mb-10">
        <div className="bg-gradone">
          <span className="block">Cancha 4 - Polvo y ladrillo</span>
          <span className="block">Dobles</span>
        </div>
        <div className="bg-gradone">
          <div className="flex flex-row justify-between w-full">
            <span>Dia</span>
            <span>Miercoles 30/3</span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <span>Hora</span>
            <span>17:00 hs</span>
          </div>
          <div className="flex flex-row justify-between w-full">
            <span>Duracion</span>
            <span>60 minutos</span>
          </div>
        </div>
        <span>
          Importante: Este complejo no exigio una carga monetaria como garantia. Se solicita en caso
          de cancelar la reserva, hacerlo con 24 horas de antelacion.
        </span>
      </div>
      <div className="flex flex-row justify-evenly w-full">
        <PrimaryButton text="Cancelar" onClick={handleCancel} />
        <PrimaryButton text="Confirmar" onClick={handleConfirm} />
      </div>
    </Layout>
  );
};

export default SFDetail;