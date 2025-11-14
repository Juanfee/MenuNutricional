import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AlimentoSeleccionado = {
  nombre: string;
  imagen: string;
};

type PlatoContextType = {
  seleccionados: Record<string, AlimentoSeleccionado>;
  setSeleccionado: (tipo: string, nombre: string, imagen: string) => void;
};

const PlatoContext = createContext<PlatoContextType | undefined>(undefined);

export function PlatoProvider({ children }: { children: ReactNode }) {
  const [seleccionados, setSeleccionados] = useState<Record<string, AlimentoSeleccionado>>({
    verduras: { nombre: "", imagen: "" },
    carbohidratos: { nombre: "", imagen: "" },
    proteínas: { nombre: "", imagen: "" },
  });

  const setSeleccionado = (tipo: string, nombre: string, imagen: string) => {
    setSeleccionados((prev) => ({
      ...prev,
      [tipo]: { nombre, imagen },
    }));
  };

  return (
    <PlatoContext.Provider value={{ seleccionados, setSeleccionado }}>
      {children}
    </PlatoContext.Provider>
  );
}

export function usePlato() {
  const context = useContext(PlatoContext);
  if (!context) throw new Error("usePlato debe usarse dentro de PlatoProvider");
  return context;
}
