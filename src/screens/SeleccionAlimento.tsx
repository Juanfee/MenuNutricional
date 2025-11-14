import { useParams, useNavigate } from "react-router-dom";
import { usePlato } from "./PlatoContext";
// import brocoli from "../assets/img/brocoli.jpg";
// import zanahoria from "../img/zanahoria.jpg";
// import espinaca from "../img/espinaca.jpg";
import pan from "../img/pan.png";
import arroz from "../img/arroz.png";
import papa from "../img/papa.png";
import pollo from "../img/pollo.png";
import carne from "../img/carne.png";
import pescado from "../img/pescado.png";
import huevos from "../img/huevos.png";
import frijoles from "../img/frijoles.png";
import fideos from "../img/fideos.png";
import pepino from "../img/pepino.png";
import cebolla from "../img/cebolla.png";
import lechuga from "../img/lechuga.png";
import kiwi from "../img/kiwi.png";
import manzana from "../img/manzana.png";


const brocoli = new URL("../img/brocoli.png", import.meta.url).href;
const zanahoria = new URL("../img/zanahoria.png", import.meta.url).href;
const espinaca = new URL("../img/espinaca.png", import.meta.url).href;
console.log("brocoli:", brocoli);
console.log("zanahoria:", zanahoria);
console.log("espinaca:", espinaca);

const opciones: Record<string, { label: string; image: string }[]> = {
  
  verduras: [
    { label: "Brócoli", image: brocoli },
    { label: "Zanahoria", image: zanahoria },
    { label: "Espinaca", image: espinaca},
    { label: "Pepino", image: pepino },
    { label: "Cebolla", image: cebolla },
    { label: "Lechuga", image: lechuga },
    { label: "Kiwi", image: kiwi },
    { label: "Manzana", image: manzana },
  ],
  carbohidratos: [
    { label: "Pan", image: pan },
    { label: "Arroz", image: arroz },
    { label: "Papa", image: papa },
    { label: "Fideos", image: fideos },
  ],
  proteínas: [
    { label: "Pollo", image: pollo },
    { label: "Carne", image:carne },
    { label: "Pescado", image:pescado },
    { label: "Huevos", image:huevos },
    { label: "Frijoles", image:frijoles },
  ],
};


export default function SeleccionAlimento() {
  const { tipo } = useParams<{ tipo: string }>();
  const navigate = useNavigate();
  const { seleccionados, setSeleccionado } = usePlato();

  const lista = opciones[tipo || ""] || [];
  const seleccionado = seleccionados[tipo || ""] || "";

  return (
    <div className="flex flex-col p-20 w-full h-full justify-center items-center">
      <h1 className="text-5xl font-bold mb-6">Elige {tipo}</h1>

      <ul className="flex flex-row flex-wrap justify-center items-center gap-10">
        {lista.map((op, idx) => {
          const isActive = seleccionado === op.label as unknown as { nombre: string; imagen: string };
          return (
            <li
              key={idx}
              onClick={() => setSeleccionado(tipo!, op.label, op.image)}

              className={`relative w-32 h-32 rounded-full shadow-lg cursor-pointer overflow-hidden 
                transition-all duration-300 
                ${isActive ? "ring-4 ring-blue-500 scale-110" : "hover:scale-105"}
              `}
            >
              <img
                src={op.image}
                alt={op.label}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex justify-center items-center text-white font-bold text-lg">

                {op.label}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        className="text-xl mt-10 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        onClick={() => navigate("/plato")}
      >
        ← Volver al plato
      </button>
    </div>
  );
}
