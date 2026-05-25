import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Package, MapPin, Clock, RotateCcw, ArrowDown, Download } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';

interface Product {
  id: string;
  name: string;
  sector: string;
  x: number;
  y: number;
}

// Fictional scale: 1 coordinate unit = 20 meters
const KM_PER_UNIT = 0.02;
// Robot speed: 4 km/h (AGV de armazém)
const SPEED_KMH = 4;

// Grid-based pathfinding: robot follows streets (Manhattan distance)
// Calcula a distância real seguindo as ruas (horizontal + vertical)
function manhattanDist(a: Product, b: Product) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

// Gera o caminho real que o robô percorre entre dois pontos
// seguindo as ruas (primeiro horizontal, depois vertical, ou vice-versa)
function generatePath(from: Product, to: Product): Array<{ x: number; y: number }> {
  const path: Array<{ x: number; y: number }> = [];
  path.push({ x: from.x, y: from.y });
  
  // Decide se vai primeiro horizontal ou vertical baseado em qual movimento é maior
  // Isso dá uma variação natural nas rotas
  const deltaX = Math.abs(to.x - from.x);
  const deltaY = Math.abs(to.y - from.y);
  
  if (deltaX >= deltaY) {
    // Primeiro horizontal, depois vertical
    if (from.x !== to.x) {
      path.push({ x: to.x, y: from.y });
    }
    if (from.y !== to.y) {
      path.push({ x: to.x, y: to.y });
    }
  } else {
    // Primeiro vertical, depois horizontal
    if (from.y !== to.y) {
      path.push({ x: from.x, y: to.y });
    }
    if (from.x !== to.x) {
      path.push({ x: to.x, y: to.y });
    }
  }
  
  return path;
}

function toKm(units: number) {
  return units * KM_PER_UNIT;
}
function toMinutes(km: number) {
  return (km / SPEED_KMH) * 60;
}
function formatDist(km: number) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(2)} km`;
}
function formatTime(min: number) {
  if (min < 1) return `${Math.round(min * 60)} seg`;
  if (min < 60) return `${Math.round(min)} min`;
  return `${(min / 60).toFixed(1)} h`;
}

function optimizeRoute(products: Product[]): { route: Product[]; totalDistance: number } {
  const route: Product[] = [];
  const remaining = [...products];
  let current = remaining.reduce((best, p) =>
    Math.sqrt(p.x ** 2 + p.y ** 2) < Math.sqrt(best.x ** 2 + best.y ** 2) ? p : best
  );
  route.push(current);
  remaining.splice(remaining.indexOf(current), 1);
  while (remaining.length > 0) {
    let nearest = remaining[0];
    let minD = manhattanDist(current, nearest);
    for (const p of remaining) {
      const d = manhattanDist(current, p);
      if (d < minD) { minD = d; nearest = p; }
    }
    route.push(nearest);
    current = nearest;
    remaining.splice(remaining.indexOf(nearest), 1);
  }
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) totalDistance += manhattanDist(route[i], route[i + 1]);
  return { route, totalDistance };
}

// Google Maps-style pin shape
function MapPin2({ cx, cy, color, label }: { cx: number; cy: number; color: string; label: string }) {
  const r = 13;
  const tipH = 10;
  return (
    <g>
      {/* Drop shadow */}
      <ellipse cx={cx} cy={cy + r + tipH + 2} rx={6} ry={3} fill="rgba(0,0,0,0.15)" />
      {/* Pin body */}
      <circle cx={cx} cy={cy} r={r + 2} fill="rgba(0,0,0,0.18)" />
      <circle cx={cx} cy={cy} r={r} fill={color} />
      {/* Pin tip */}
      <polygon
        points={`${cx - 5},${cy + r - 2} ${cx + 5},${cy + r - 2} ${cx},${cy + r + tipH}`}
        fill={color}
      />
      {/* Label */}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="white" fontWeight="bold">
        {label}
      </text>
    </g>
  );
}

function GoogleMap({ route }: { route: Product[] }) {
  const W = 640, H = 440;
  const PAD = 40;

  if (route.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-sm bg-[#E8E0D0] rounded-lg">
        Sem dados para visualizar
      </div>
    );
  }

  const xs = route.map(p => p.x);
  const ys = route.map(p => p.y);
  const rawMinX = Math.min(...xs), rawMaxX = Math.max(...xs);
  const rawMinY = Math.min(...ys), rawMaxY = Math.max(...ys);
  const px = (rawMaxX - rawMinX || 10) * 0.22;
  const py = (rawMaxY - rawMinY || 10) * 0.22;
  const minX = rawMinX - px, maxX = rawMaxX + px;
  const minY = rawMinY - py, maxY = rawMaxY + py;
  const rangeX = maxX - minX, rangeY = maxY - minY;

  const sx = (x: number) => PAD + ((x - minX) / rangeX) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - ((y - minY) / rangeY) * (H - 2 * PAD);

  // Decorative street grid - fixed divisions (5 cols x 4 rows of blocks)
  const cols = 5, rows = 4;
  const roadW = 10;
  const innerW = W - 2 * PAD, innerH = H - 2 * PAD;
  const blockW = (innerW - (cols + 1) * roadW) / cols;
  const blockH = (innerH - (rows + 1) * roadW) / rows;

  const streetXs = Array.from({ length: cols + 1 }, (_, i) => PAD + i * (blockW + roadW) + roadW / 2);
  const streetYs = Array.from({ length: rows + 1 }, (_, i) => PAD + i * (blockH + roadW) + roadW / 2);

  // Park/green area indices (fictional touches)
  const greenBlocks: [number, number][] = [[1, 1], [3, 2], [0, 3]];
  const isGreen = (ci: number, ri: number) => greenBlocks.some(([c, r]) => c === ci && r === ri);

  // Arrow on segment midpoint
  function arrowPoly(x1: number, y1: number, x2: number, y2: number) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len, uy = dy / len;
    const px2 = -uy, py2 = ux;
    const s = 8;
    return `${mx + ux * s},${my + uy * s} ${mx - ux * s + px2 * s * 0.55},${my - uy * s + py2 * s * 0.55} ${mx - ux * s - px2 * s * 0.55},${my - uy * s - py2 * s * 0.55}`;
  }

  // Gera os segmentos de rota reais seguindo as ruas
  const routeSegments: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  for (let i = 0; i < route.length - 1; i++) {
    const path = generatePath(route[i], route[i + 1]);
    for (let j = 0; j < path.length - 1; j++) {
      routeSegments.push({
        x1: sx(path[j].x),
        y1: sy(path[j].y),
        x2: sx(path[j + 1].x),
        y2: sy(path[j + 1].y),
      });
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl" style={{ height: 440 }}>
      {/* Map background */}
      <rect width={W} height={H} fill="#E8E0D0" />

      {/* Building blocks */}
      {Array.from({ length: cols }, (_, ci) =>
        Array.from({ length: rows }, (_, ri) => {
          const bx = PAD + roadW + ci * (blockW + roadW);
          const by = PAD + roadW + ri * (blockH + roadW);
          return (
            <rect
              key={`blk-${ci}-${ri}`}
              x={bx} y={by}
              width={blockW} height={blockH}
              fill={isGreen(ci, ri) ? '#BDD9A8' : '#D8D4C8'}
              rx={3}
            />
          );
        })
      )}

      {/* Streets - horizontal */}
      {streetYs.map((y, i) => (
        <line key={`hs-${i}`} x1={PAD} y1={y} x2={PAD + innerW} y2={y} stroke="white" strokeWidth={roadW} />
      ))}
      {/* Streets - vertical */}
      {streetXs.map((x, i) => (
        <line key={`vs-${i}`} x1={x} y1={PAD} x2={x} y2={PAD + innerH} stroke="white" strokeWidth={roadW} />
      ))}

      {/* Street center dashes */}
      {streetYs.map((y, i) => (
        <line key={`hd-${i}`} x1={PAD} y1={y} x2={PAD + innerW} y2={y}
          stroke="#E8D8B0" strokeWidth={1.5} strokeDasharray="12 10" />
      ))}
      {streetXs.map((x, i) => (
        <line key={`vd-${i}`} x1={x} y1={PAD} x2={x} y2={PAD + innerH}
          stroke="#E8D8B0" strokeWidth={1.5} strokeDasharray="12 10" />
      ))}

      {/* Park labels */}
      {greenBlocks.map(([ci, ri], i) => {
        const bx = PAD + roadW + ci * (blockW + roadW) + blockW / 2;
        const by = PAD + roadW + ri * (blockH + roadW) + blockH / 2;
        return (
          <text key={`pk-${i}`} x={bx} y={by} textAnchor="middle" dominantBaseline="middle"
            fontSize={9} fill="#6B9A50" fontStyle="italic">
            Área verde
          </text>
        );
      })}

      {/* Block labels (sector names) */}
      {Array.from({ length: cols }, (_, ci) =>
        Array.from({ length: rows }, (_, ri) => {
          if (isGreen(ci, ri)) return null;
          const bx = PAD + roadW + ci * (blockW + roadW) + blockW / 2;
          const by = PAD + roadW + ri * (blockH + roadW) + blockH / 2;
          return (
            <text key={`lbl-${ci}-${ri}`} x={bx} y={by} textAnchor="middle" dominantBaseline="middle"
              fontSize={8} fill="#A0998C">
              Setor {String.fromCharCode(65 + ci * rows + ri)}
            </text>
          );
        })
      )}

      {/* Route shadow */}
      {routeSegments.map((seg, i) => (
        <line key={`rsh-${i}`}
          x1={seg.x1} y1={seg.y1}
          x2={seg.x2} y2={seg.y2}
          stroke="rgba(0,0,0,0.18)" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round"
        />
      ))}

      {/* Route line */}
      {routeSegments.map((seg, i) => (
        <line key={`rl-${i}`}
          x1={seg.x1} y1={seg.y1}
          x2={seg.x2} y2={seg.y2}
          stroke="#4285F4" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
        />
      ))}

      {/* Direction arrows */}
      {routeSegments.map((seg, i) => (
        <polygon key={`arr-${i}`}
          points={arrowPoly(seg.x1, seg.y1, seg.x2, seg.y2)}
          fill="white"
        />
      ))}

      {/* Segment distance labels */}
      {route.slice(0, -1).map((pt, i) => {
        const mx = (sx(pt.x) + sx(route[i + 1].x)) / 2;
        const my = (sy(pt.y) + sy(route[i + 1].y)) / 2;
        const d = manhattanDist(pt, route[i + 1]);
        const label = formatDist(toKm(d));
        const w = label.length * 6 + 10;
        return (
          <g key={`dl-${i}`}>
            <rect x={mx - w / 2} y={my - 10} width={w} height={16} rx={4}
              fill="white" stroke="#C0C0C0" strokeWidth={0.5}
            />
            <text x={mx} y={my + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize={9} fill="#444" fontWeight="500">
              {label}
            </text>
          </g>
        );
      })}

      {/* Pins */}
      {route.map((pt, i) => {
        const isFirst = i === 0, isLast = i === route.length - 1;
        const color = isFirst ? '#16A34A' : isLast ? '#DC2626' : '#4285F4';
        return (
          <MapPin2
            key={`pin-${i}`}
            cx={sx(pt.x)} cy={sy(pt.y)}
            color={color}
            label={isFirst ? 'S' : isLast ? 'F' : String(i + 1)}
          />
        );
      })}

      {/* Map border */}
      <rect x={0} y={0} width={W} height={H} fill="none" stroke="#C0B8A8" strokeWidth={2} rx={12} />

      {/* Legend card */}
      <rect x={W - 130} y={H - 68} width={118} height={56} rx={6} fill="white" fillOpacity={0.95} stroke="#D0C8B8" strokeWidth={1} />
      <circle cx={W - 116} cy={H - 52} r={6} fill="#16A34A" />
      <text x={W - 106} y={H - 52} dominantBaseline="middle" fontSize={10} fill="#444">Início</text>
      <circle cx={W - 116} cy={H - 36} r={6} fill="#4285F4" />
      <text x={W - 106} y={H - 36} dominantBaseline="middle" fontSize={10} fill="#444">Parada</text>
      <circle cx={W - 116} cy={H - 20} r={6} fill="#DC2626" />
      <text x={W - 106} y={H - 20} dominantBaseline="middle" fontSize={10} fill="#444">Fim</text>
    </svg>
  );
}

export function Results() {
  const navigate = useNavigate();
  const [route, setRoute] = useState<Product[]>([]);
  const [totalDist, setTotalDist] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('logistic-products');
    if (!saved) { navigate('/entrada-dados'); return; }
    const products: Product[] = JSON.parse(saved);
    if (products.length === 0) { navigate('/entrada-dados'); return; }
    const result = optimizeRoute(products);
    setRoute(result.route);
    setTotalDist(result.totalDistance);

    // Incrementa o contador de rotas calculadas
    const currentCount = parseInt(localStorage.getItem('route-history-count') || '0');
    localStorage.setItem('route-history-count', String(currentCount + 1));
  }, [navigate]);

  const segments = route.slice(0, -1).map((pt, i) => ({
    from: pt,
    to: route[i + 1],
    distUnits: manhattanDist(pt, route[i + 1]),
  }));

  const totalKm = toKm(totalDist);
  const totalMin = toMinutes(totalKm);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => navigate('/') },
            { label: 'Rotas', onClick: () => navigate('/entrada-dados') },
            { label: 'Resultado' }
          ]}
        />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Resultado da Otimização</h1>
            <p className="text-sm text-slate-500 mt-1">
              Algoritmo: <span className="font-medium text-slate-700">Nearest Neighbor (Manhattan Distance)</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500">Tempo de Processamento</div>
              <div className="text-sm font-semibold text-slate-700">124 ms</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar Relatório
            </button>
          </div>
        </div>

        <div className="space-y-6">

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Produtos coletados</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{route.length}</div>
            <div className="text-xs text-slate-400 mt-1">{segments.length} {segments.length === 1 ? 'deslocamento' : 'deslocamentos'}</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Distância total</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{formatDist(totalKm)}</div>
            <div className="text-xs text-slate-400 mt-1">percurso completo do robô</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tempo estimado</span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{formatTime(totalMin)}</div>
            <div className="text-xs text-slate-400 mt-1">a {SPEED_KMH} km/h (AGV)</div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">Mapa da Rota</h2>
            <span className="text-xs text-slate-400">Escala fictícia · 1 unidade = 20 m</span>
          </div>
          <GoogleMap route={route} />
        </div>

        {/* Route sequence */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-6">Sequência de Coleta</h2>
          {route.length === 0 ? (
            <div className="text-sm text-slate-400 text-center py-8">Nenhuma rota calculada</div>
          ) : (
            <div>
              {route.map((product, index) => {
                const seg = segments[index];
                const isLast = index === route.length - 1;
                const isFirst = index === 0;
                return (
                  <div key={product.id}>
                    <div className="flex items-center gap-4">
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                        style={{ background: isFirst ? '#16A34A' : isLast ? '#DC2626' : '#4285F4' }}
                      >
                        {isFirst ? 'S' : isLast ? 'F' : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-slate-800">{product.name}</span>
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Setor {product.sector}</span>
                          {isFirst && <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded">início</span>}
                          {isLast && <span className="text-xs text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded">fim</span>}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-mono">x = {product.x} · y = {product.y}</div>
                      </div>
                      {!isLast && seg && (
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-semibold text-slate-700">{formatDist(toKm(seg.distUnits))}</div>
                          <div className="text-xs text-slate-400">{formatTime(toMinutes(toKm(seg.distUnits)))}</div>
                        </div>
                      )}
                    </div>
                    {!isLast && (
                      <div className="flex items-stretch gap-4 h-7">
                        <div className="flex-shrink-0 w-9 flex justify-center">
                          <div className="w-px bg-slate-200 h-full" />
                        </div>
                        <div className="flex items-center">
                          <ArrowDown className="w-3 h-3 text-slate-300" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Sobre o Algoritmo</h3>
              <p className="text-xs text-slate-600">
                O algoritmo <strong>Nearest Neighbor com Manhattan Distance</strong> simula o comportamento real de um robô AGV em armazém.
                O robô segue os corredores (não atravessa setores) e escolhe o próximo produto mais próximo a cada passo,
                calculando distâncias em padrão L (horizontal + vertical).
              </p>
            </div>
            <button
              onClick={() => navigate('/entrada-dados')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2.5 rounded-lg transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Nova Rota
            </button>
          </div>
        </div>

        {/* Logs do Sistema */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Logs da Execução</h3>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:16</span>
              <span className="text-green-600 font-semibold">[INFO]</span>
              <span className="text-slate-700">Rota otimizada calculada com sucesso.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:15</span>
              <span className="text-blue-600 font-semibold">[DEBUG]</span>
              <span className="text-slate-700">Distância total: {formatDist(totalKm)} | Tempo estimado: {formatTime(totalMin)}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:14</span>
              <span className="text-blue-600 font-semibold">[DEBUG]</span>
              <span className="text-slate-700">Processando {route.length} produtos com Nearest Neighbor.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:14</span>
              <span className="text-green-600 font-semibold">[INFO]</span>
              <span className="text-slate-700">Cálculo de rota iniciado.</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}