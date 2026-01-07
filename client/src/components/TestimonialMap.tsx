import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { MapPin } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface Location {
  name: string;
  coordinates: [number, number];
  count: number;
  names: string[];
}

const locations: Location[] = [
  {
    name: "Nederland",
    coordinates: [4.9041, 52.3676],
    count: 12,
    names: ["Suzanne Mol", "Sofie Porro", "Angela", "Elisa Bisschop", "Serge R", "Kim Wedding", "Anke de Bruijn", "Gary Veerman", "Niels Langedijk", "Franka van der Linden", "Kees de Boer", "Maria"]
  },
  {
    name: "Eindhoven",
    coordinates: [5.4697, 51.4416],
    count: 3,
    names: ["Marjon", "Simon Porro", "Lonneke van Houten"]
  },
  {
    name: "Dortmund",
    coordinates: [7.4653, 51.5136],
    count: 2,
    names: ["Hans Korteweg", "Patrick Wedding"]
  },
  {
    name: "France",
    coordinates: [2.2137, 46.2276],
    count: 1,
    names: ["Anne Hopkins"]
  }
];

export default function TestimonialMap() {
  return (
    <div className="w-full bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Deelnemers uit heel Europa
        </h2>
        <p className="text-gray-600">
          Ontdek waar onze deelnemers vandaan komen
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            scale: 1400
          }}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F3F4F6"
                  stroke="#E5E7EB"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#FEE2E2" },
                    pressed: { outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map((location) => (
            <Marker key={location.name} coordinates={location.coordinates}>
              <g className="group cursor-pointer">
                {/* Marker circle */}
                <circle
                  r={6 + location.count * 1.5}
                  fill="#DC2626"
                  fillOpacity={0.8}
                  stroke="#fff"
                  strokeWidth={2}
                  className="transition-all duration-200 group-hover:r-[20] group-hover:fill-opacity-100"
                />
                
                {/* Tooltip */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect
                    x={-80}
                    y={-100}
                    width={160}
                    height={location.count > 3 ? 90 : 70}
                    fill="white"
                    stroke="#DC2626"
                    strokeWidth={2}
                    rx={8}
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                  />
                  <text
                    x={0}
                    y={-75}
                    textAnchor="middle"
                    className="fill-gray-900 font-bold text-sm"
                  >
                    {location.name}
                  </text>
                  <text
                    x={0}
                    y={-55}
                    textAnchor="middle"
                    className="fill-red-600 font-semibold text-base"
                  >
                    {location.count} testimonial{location.count > 1 ? 's' : ''}
                  </text>
                  {location.count <= 3 && (
                    <text
                      x={0}
                      y={-35}
                      textAnchor="middle"
                      className="fill-gray-600 text-xs"
                    >
                      {location.names.slice(0, 2).join(', ')}
                      {location.count > 2 && '...'}
                    </text>
                  )}
                </g>
              </g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {locations.map((location) => (
          <div
            key={location.name}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <div
              className="w-3 h-3 rounded-full bg-red-600"
              style={{ transform: `scale(${1 + location.count * 0.15})` }}
            />
            <span className="text-sm font-medium text-gray-700">
              {location.name}
            </span>
            <span className="text-sm text-gray-500">
              ({location.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
