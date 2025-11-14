import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlato } from "./PlatoContext";

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", cx, cy,
    "L", start.x, start.y,
    "A", r, r, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
}

export default function PlatoInteractivo() {
  const navigate = useNavigate();
  const [verduras, setVerduras] = useState(50);
  const [carbohidratos, setCarbohidratos] = useState(25);
  const [proteinas, setProteinas] = useState(25);
  const { seleccionados } = usePlato();

  const ajustar = (nuevoValor: number, tipo: "verduras" | "carbohidratos" | "proteinas") => {
    let v = verduras, c = carbohidratos, p = proteinas;

    if (tipo === "verduras") {
      v = nuevoValor;
      const resto = 100 - v;
      const totalOtros = c + p;
      if (totalOtros > 0) {
        c = Math.round((c / totalOtros) * resto);
        p = resto - c;
      }
    } else if (tipo === "carbohidratos") {
      c = nuevoValor;
      const resto = 100 - c;
      const totalOtros = v + p;
      if (totalOtros > 0) {
        v = Math.round((v / totalOtros) * resto);
        p = resto - v;
      }
    } else if (tipo === "proteinas") {
      p = nuevoValor;
      const resto = 100 - p;
      const totalOtros = v + c;
      if (totalOtros > 0) {
        v = Math.round((v / totalOtros) * resto);
        c = resto - v;
      }
    }

    setVerduras(v);
    setCarbohidratos(c);
    setProteinas(p);
  };

  let startAngle = 0;
  const slices = [
    { color: "green", label: "Verduras", value: verduras },
    { color: "orange", label: "Carbohidratos", value: carbohidratos },
    { color: "gold", label: "Proteínas", value: proteinas },
  ].map((slice) => {
    const endAngle = startAngle + (slice.value / 100) * 360;
    const path = describeArc(100, 100, 92, startAngle, endAngle);
    startAngle = endAngle;
    return { ...slice, path };
  });

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-5xl font-bold mb-8 text-center">🍽️ Diseña tu Plato Saludable</h1>

      <div className="flex flex-row justify-center items-center gap-4">
        <svg width="auto" height="700" viewBox="0 -30 200 250" className="cursor-pointer">
          <circle cx="100" cy="100" r="98" fill="gray" stroke="gray" strokeWidth="5" />
          <circle cx="100" cy="100" r="92" fill="white" />

          {(() => {
            let startAngle = 0;
            return slices.map((s, i) => {
              const endAngle = startAngle + (s.value / 100) * 360;
              const path = describeArc(100, 100, 92, startAngle, endAngle);
              const midAngle = startAngle + (endAngle - startAngle) / 2;
              const textPos = polarToCartesian(100, 100, 60, midAngle);
              const labelPos = polarToCartesian(100, 100, 130, midAngle);
              const connectorPos = polarToCartesian(100, 100, 92, midAngle);
              startAngle = endAngle;

              const seleccionado = seleccionados[s.label.toLowerCase()];
                const key = s.label.toLowerCase();
              return (
                <g key={i} onClick={() => navigate(`/seleccion/${s.label.toLowerCase()}`)}>
                  <path d={path} fill={s.color} stroke="white" strokeWidth="2" />
                  
                  {!seleccionado && (
                    <text
                      x={textPos.x}
                      y={textPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-black font-bold text-sm"
                    >
                      {s.value}%
                    </text>
                  )}

                  {seleccionado?.imagen ? (
                    <>
                    <defs>
                      {seleccionado?.imagen && (
                        <pattern
                          id={`pattern-${key}`}
                          patternUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          

                        <image
                          href={seleccionado.imagen}
                          x={key === "verduras" ? "5"  : key === "carbohidratos" ? "20" : "22"}
                          y={key === "verduras" ? "30" : key === "carbohidratos" ? "0" : "8"}
                          width= {key === "verduras" ? 80 : 70}
                          height={key === "verduras" ? 90 : 70}
                          preserveAspectRatio="xMidYMid cover"
                          clipPath={`url(#clip-${key})`}
                        />
                        </pattern>
                      )}
                    </defs>

                    <path
                      d={path}
                      fill={
                        seleccionado?.imagen
                          ? `url(#pattern-${key})`
                          : s.color
                      }
                      stroke="white"
                      strokeWidth="2"
                    />

                    <path
                      d={path}
                      fill="rgba(0,0,0,0.25)"
                    />

                    {seleccionado?.nombre && (
                      <text
                        x= {key === "verduras" ? textPos.x -10 : key === "carbohidratos" ? textPos.x + 0 : textPos.x + 0}
                        y={key === "verduras" ? textPos.y +20 : key === "carbohidratos" ? textPos.y + 25 : textPos.y + 25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white font-semibold text-xs"
                      >
                        {seleccionado.nombre}
                      </text>
                    )}
                  </>
                  ) : (
                    <path
                      d={path}
                      fill={s.color} 
                      stroke="white"
                      strokeWidth="2"
                    />
                  )}

                  <path
                    d={`M ${connectorPos.x},${connectorPos.y} 
                        L ${connectorPos.x},${labelPos.y} 
                        L ${labelPos.x},${labelPos.y}`}
                    stroke={s.color}
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    fill="none"
                  />

                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor={labelPos.x > 100 ? "start" : "end"}
                    dominantBaseline="middle"
                    className="fill-gray-700 font-medium text-xs"
                  >
                    {s.label} ({s.value}%)
                  </text>
                </g>
              );
            });
          })()}
        </svg>

        <div className="flex flex-col justify-center items-center bg-purple-200 rounded-md p-4 gap-4">
          <div className="w-full flex flex-col items-center">
            <label className="font-medium">🥦 Verduras: {verduras}%</label>
            <input type="range" min="0" max="100" value={verduras} onChange={(e) => ajustar(Number(e.target.value), "verduras")} />
          </div>

          <div className="w-full flex flex-col items-center">
            <label className="font-medium">🍞 Carbohidratos: {carbohidratos}%</label>
            <input type="range" min="0" max="100" value={carbohidratos} onChange={(e) => ajustar(Number(e.target.value), "carbohidratos")} />
          </div>

          <div className="w-full flex flex-col items-center">
            <label className="font-medium">🍗 Proteínas: {proteinas}%</label>
            <input type="range" min="0" max="100" value={proteinas} onChange={(e) => ajustar(Number(e.target.value), "proteinas")} />
          </div>
        </div>
      </div>
    </div>
  );
}
