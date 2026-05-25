import { useNavigate } from 'react-router';
import {
  Package,
  TruckIcon,
  MapPin,
  Clock,
  Activity,
  TrendingUp,
  Download,
  CheckCircle,
  AlertCircle,
  Circle
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Product {
  id: string;
  name: string;
  sector: string;
  x: number;
  y: number;
}

export function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [routeCount, setRouteCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('logistic-products');
    if (saved) {
      const loadedProducts: Product[] = JSON.parse(saved);
      setProducts(loadedProducts);
    }

    const routeHistory = localStorage.getItem('route-history-count');
    if (routeHistory) {
      setRouteCount(parseInt(routeHistory));
    }
  }, []);

  const mockPerformanceData = [
    { mes: 'Jan', rotas: 12, tempo: 45 },
    { mes: 'Fev', rotas: 18, tempo: 42 },
    { mes: 'Mar', rotas: 25, tempo: 38 },
    { mes: 'Abr', rotas: 22, tempo: 40 },
    { mes: 'Mai', rotas: 30, tempo: 35 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em coleta': return 'text-blue-600 bg-blue-50';
      case 'Coletado': return 'text-green-600 bg-green-50';
      case 'Pendente': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const mockStatus = ['Pendente', 'Em coleta', 'Coletado'];
  const productsWithStatus = products.slice(0, 5).map((p, i) => ({
    ...p,
    status: mockStatus[i % 3]
  }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{products.length}</div>
            <div className="text-xs text-slate-500 mt-1">Produtos Cadastrados</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{routeCount}</div>
            <div className="text-xs text-slate-500 mt-1">Rotas Calculadas</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">2.4 km</div>
            <div className="text-xs text-slate-500 mt-1">Distância Total</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">36 min</div>
            <div className="text-xs text-slate-500 mt-1">Tempo Médio</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-cyan-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">94%</div>
            <div className="text-xs text-slate-500 mt-1">Eficiência Logística</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Tabela de Produtos */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Produtos Recentes</h2>
              <button
                onClick={() => navigate('/entrada-dados')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos
              </button>
            </div>

            {productsWithStatus.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm mb-4">Nenhum produto cadastrado</p>
                <button
                  onClick={() => navigate('/entrada-dados')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors"
                >
                  Cadastrar Produto
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Produto</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Setor</th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-slate-600 uppercase">X</th>
                      <th className="text-center py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Y</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-slate-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsWithStatus.map((product) => (
                      <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-2 text-sm text-slate-800 font-medium">{product.name}</td>
                        <td className="py-3 px-2 text-sm text-slate-600">{product.sector}</td>
                        <td className="py-3 px-2 text-sm text-slate-600 text-center font-mono">{product.x}</td>
                        <td className="py-3 px-2 text-sm text-slate-600 text-center font-mono">{product.y}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            {product.status === 'Coletado' && <CheckCircle className="w-3 h-3" />}
                            {product.status === 'Em coleta' && <Circle className="w-3 h-3 animate-pulse" />}
                            {product.status === 'Pendente' && <AlertCircle className="w-3 h-3" />}
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Última Rota e Ações */}
          <div className="space-y-6">
            {/* Informações da Última Rota */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Última Rota Calculada</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Data</span>
                  <span className="text-xs text-slate-800 font-medium">25/05/2026 14:32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Produtos</span>
                  <span className="text-xs text-slate-800 font-medium">{products.length} itens</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Tempo Processamento</span>
                  <span className="text-xs text-slate-800 font-medium">124 ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Algoritmo</span>
                  <span className="text-xs text-slate-800 font-medium">Nearest Neighbor</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/resultados')}
                className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Ver Detalhes
              </button>
            </div>

            {/* Botão Exportar */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Relatórios</h3>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Exportar Relatório
              </button>
            </div>
          </div>
        </div>

        {/* Gráfico de Desempenho */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Desempenho Logístico</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  key="xaxis"
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  key="yaxis-left"
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  key="yaxis-right"
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip
                  key="tooltip"
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  key="line-rotas"
                  yAxisId="left"
                  type="monotone"
                  dataKey="rotas"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Rotas Calculadas"
                  dot={{ fill: '#2563eb', r: 4 }}
                />
                <Line
                  key="line-tempo"
                  yAxisId="right"
                  type="monotone"
                  dataKey="tempo"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Tempo Médio (min)"
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Logs do Sistema */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Logs do Sistema</h2>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:15</span>
              <span className="text-green-600 font-semibold">[INFO]</span>
              <span className="text-slate-700">Rota calculada com sucesso. {products.length} produtos processados.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:32:14</span>
              <span className="text-blue-600 font-semibold">[DEBUG]</span>
              <span className="text-slate-700">Algoritmo Nearest Neighbor iniciado com Manhattan distance.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:31:58</span>
              <span className="text-green-600 font-semibold">[INFO]</span>
              <span className="text-slate-700">Produtos carregados do storage local.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-slate-400">14:31:42</span>
              <span className="text-green-600 font-semibold">[INFO]</span>
              <span className="text-slate-700">Sistema inicializado com sucesso.</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
