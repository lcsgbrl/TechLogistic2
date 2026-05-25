import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  Clock,
  Activity,
  Download,
  RefreshCw,
  Sparkles,
  Package,
  CheckCircle,
  Circle,
  AlertCircle,
  Truck,
  Navigation,
  Target,
  Award
} from 'lucide-react';

interface RobotData {
  id: string;
  name: string;
  region: string;
  deliveries: number;
  distance: string;
  avgTime: string;
  efficiency: number;
  status: 'Em rota' | 'Coletando' | 'Disponível' | 'Finalizado';
  currentLocation: string;
}

interface DeliveryPoint {
  id: string;
  location: string;
  address: string;
  status: 'Entregue' | 'Em Trânsito' | 'Pendente';
  robot: string;
  time: string;
}

export function Routes() {
  const navigate = useNavigate();

  const robots: RobotData[] = [
    {
      id: '1',
      name: 'Robo-01',
      region: 'Região Sul',
      deliveries: 12,
      distance: '8.4 km',
      avgTime: '18 min',
      efficiency: 96,
      status: 'Em rota',
      currentLocation: 'Av. Calama'
    },
    {
      id: '2',
      name: 'Robo-02',
      region: 'Região Leste',
      deliveries: 15,
      distance: '11.2 km',
      avgTime: '22 min',
      efficiency: 94,
      status: 'Coletando',
      currentLocation: 'Av. Jorge Teixeira'
    },
    {
      id: '3',
      name: 'Robo-03',
      region: 'Região Central',
      deliveries: 18,
      distance: '6.8 km',
      avgTime: '15 min',
      efficiency: 98,
      status: 'Em rota',
      currentLocation: 'Rua da Beira'
    },
    {
      id: '4',
      name: 'Robo-04',
      region: 'Região Norte',
      deliveries: 10,
      distance: '9.6 km',
      avgTime: '20 min',
      efficiency: 92,
      status: 'Disponível',
      currentLocation: 'Base Central'
    },
  ];

  const deliveryPoints: DeliveryPoint[] = [
    { id: '1', location: 'Porto Velho Shopping', address: 'Av. Rio Madeira, 3288', status: 'Entregue', robot: 'Robo-01', time: '14:32' },
    { id: '2', location: 'Bairro Nova Porto Velho', address: 'Av. Jatuarana, 1542', status: 'Em Trânsito', robot: 'Robo-02', time: '14:45' },
    { id: '3', location: 'Bairro Embratel', address: 'Av. Carlos Gomes, 892', status: 'Em Trânsito', robot: 'Robo-03', time: '14:50' },
    { id: '4', location: 'Bairro Cohab', address: 'Av. Calama, 2156', status: 'Pendente', robot: 'Robo-01', time: '15:10' },
    { id: '5', location: 'Bairro Areal', address: 'Av. Jorge Teixeira, 3421', status: 'Pendente', robot: 'Robo-02', time: '15:20' },
    { id: '6', location: 'Bairro Industrial', address: 'Rua Industrial, 756', status: 'Pendente', robot: 'Robo-04', time: '15:30' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'text-green-600 bg-green-50 border-green-200';
      case 'Em Trânsito': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Pendente': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getRobotStatusColor = (status: string) => {
    switch (status) {
      case 'Em rota': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Coletando': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Disponível': return 'text-green-600 bg-green-50 border-green-200';
      case 'Finalizado': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Entregue':
        return <CheckCircle className="w-3 h-3" />;
      case 'Em Trânsito':
        return <Navigation className="w-3 h-3" />;
      case 'Pendente':
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'Região Sul': return 'bg-red-500';
      case 'Região Leste': return 'bg-blue-500';
      case 'Região Central': return 'bg-green-500';
      case 'Região Norte': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  const totalDeliveries = robots.reduce((sum, robot) => sum + robot.deliveries, 0);
  const mostActiveRobot = robots.reduce((prev, current) =>
    (current.deliveries > prev.deliveries) ? current : prev
  );
  const avgDeliveryTime = Math.round(
    robots.reduce((sum, robot) => sum + parseInt(robot.avgTime), 0) / robots.length
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => navigate('/') },
            { label: 'Rotas Urbanas - Porto Velho' }
          ]}
        />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Central Logística - Porto Velho/RO</h1>
            <p className="text-sm text-slate-500 mt-1">
              Monitoramento de entregas urbanas em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/entrada-dados')}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Nova Rota
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar Relatório
            </button>
          </div>
        </div>

        {/* Painel de Monitoramento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{totalDeliveries}</div>
            <div className="text-xs text-slate-500 mt-1">Total de Entregas do Dia</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">Central</div>
            <div className="text-xs text-slate-500 mt-1">Região Mais Movimentada</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{mostActiveRobot.name}</div>
            <div className="text-xs text-slate-500 mt-1">Robô Mais Eficiente</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{avgDeliveryTime} min</div>
            <div className="text-xs text-slate-500 mt-1">Tempo Médio de Entrega</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Área Principal - Mapa e Rotas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mapa de Porto Velho */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800">Mapa de Rotas - Porto Velho/RO</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Circle className="w-3 h-3 text-green-500 animate-pulse" />
                  <span>Atualizado em tempo real</span>
                </div>
              </div>

              {/* Mapa Urbano Moderno e Clean */}
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '500px' }}>
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  <defs>
                    {/* Grid sutil de fundo */}
                    <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>

                  {/* Fundo Claro */}
                  <rect width="800" height="500" fill="#f8fafc" />
                  <rect width="800" height="500" fill="url(#grid-light)" />

                  {/* Divisões Regionais com Contornos Suaves */}
                  {/* Região Norte - apenas contorno */}
                  <path d="M 0,0 L 800,0 L 800,150 L 600,180 L 400,140 L 200,120 L 0,100 Z"
                    fill="#e0e7ff" fillOpacity="0.15"
                    stroke="#818cf8" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />
                  <text x="400" y="70" textAnchor="middle" fontSize="12" fill="#6366f1" fontWeight="500" opacity="0.7">REGIÃO NORTE</text>

                  {/* Região Central */}
                  <path d="M 200,120 L 600,180 L 600,320 L 400,340 L 200,300 Z"
                    fill="#d1fae5" fillOpacity="0.15"
                    stroke="#34d399" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />
                  <text x="400" y="240" textAnchor="middle" fontSize="12" fill="#10b981" fontWeight="500" opacity="0.7">REGIÃO CENTRAL</text>

                  {/* Região Leste */}
                  <path d="M 600,180 L 800,150 L 800,380 L 700,400 L 600,320 Z"
                    fill="#dbeafe" fillOpacity="0.15"
                    stroke="#60a5fa" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />
                  <text x="690" y="270" textAnchor="middle" fontSize="12" fill="#3b82f6" fontWeight="500" opacity="0.7">REGIÃO LESTE</text>

                  {/* Região Sul */}
                  <path d="M 0,100 L 200,120 L 200,300 L 400,340 L 600,320 L 700,400 L 800,380 L 800,500 L 0,500 Z"
                    fill="#fee2e2" fillOpacity="0.15"
                    stroke="#f87171" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />
                  <text x="400" y="420" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="500" opacity="0.7">REGIÃO SUL</text>

                  {/* Ruas e Avenidas - Linhas Finas e Discretas */}
                  {/* Avenida Jatuarana */}
                  <line x1="50" y1="90" x2="750" y2="90" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
                  <text x="400" y="82" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="400">Av. Jatuarana</text>

                  {/* Avenida Carlos Gomes */}
                  <line x1="100" y1="160" x2="700" y2="160" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
                  <text x="400" y="152" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="400">Av. Carlos Gomes</text>

                  {/* Avenida Rio Madeira - Principal */}
                  <line x1="50" y1="240" x2="750" y2="240" stroke="#475569" strokeWidth="2" opacity="0.6" />
                  <text x="400" y="232" textAnchor="middle" fontSize="9" fill="#334155" fontWeight="500">Av. Rio Madeira</text>

                  {/* Rua da Beira */}
                  <line x1="100" y1="360" x2="600" y2="360" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
                  <text x="350" y="352" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="400">Rua da Beira</text>

                  {/* Avenida Calama - Vertical */}
                  <line x1="150" y1="50" x2="150" y2="450" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
                  <text x="142" y="250" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="400" transform="rotate(-90 142 250)">Av. Calama</text>

                  {/* Avenida Jorge Teixeira - Vertical */}
                  <line x1="650" y1="80" x2="650" y2="420" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5" />
                  <text x="642" y="250" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="400" transform="rotate(-90 642 250)">Av. Jorge Teixeira</text>

                  {/* Marcadores de Localização - Estilo Moderno */}
                  {/* Porto Velho Shopping */}
                  <g transform="translate(400, 120)">
                    <circle r="18" fill="white" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M -6,-6 L -6,6 L 6,6 L 6,-6 Z M -4,-4 L -4,0 L 0,0 L 0,-4 Z M 2,-4 L 2,0 L 6,0 L 6,-4 Z M -4,2 L -4,4 L 0,4 L 0,2 Z M 2,2 L 2,4 L 6,4 L 6,2 Z"
                      fill="#3b82f6" transform="scale(0.8)" />
                    <text y="32" textAnchor="middle" fontSize="9" fill="#1e293b" fontWeight="500">PV Shopping</text>
                  </g>

                  {/* Bairros - Marcadores Simples */}
                  {/* Bairro Embratel */}
                  <g transform="translate(350, 190)">
                    <circle r="8" fill="white" stroke="#10b981" strokeWidth="2" />
                    <circle r="3" fill="#10b981" />
                    <text y="20" textAnchor="middle" fontSize="9" fill="#1e293b" fontWeight="500">Embratel</text>
                  </g>

                  {/* Bairro Cohab */}
                  <g transform="translate(150, 380)">
                    <circle r="8" fill="white" stroke="#ef4444" strokeWidth="2" />
                    <circle r="3" fill="#ef4444" />
                    <text y="20" textAnchor="middle" fontSize="9" fill="#1e293b" fontWeight="500">Cohab</text>
                  </g>

                  {/* Bairro Areal */}
                  <g transform="translate(650, 280)">
                    <circle r="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
                    <circle r="3" fill="#3b82f6" />
                    <text y="20" textAnchor="middle" fontSize="9" fill="#1e293b" fontWeight="500">Areal</text>
                  </g>

                  {/* Bairro Nova Porto Velho */}
                  <g transform="translate(650, 200)">
                    <circle r="8" fill="white" stroke="#3b82f6" strokeWidth="2" />
                    <circle r="3" fill="#3b82f6" />
                    <text y="20" textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="500">Nova PVH</text>
                  </g>

                  {/* Bairro Industrial */}
                  <g transform="translate(280, 410)">
                    <circle r="8" fill="white" stroke="#ef4444" strokeWidth="2" />
                    <circle r="3" fill="#ef4444" />
                    <text y="20" textAnchor="middle" fontSize="9" fill="#1e293b" fontWeight="500">Industrial</text>
                  </g>

                  {/* Rotas dos Robôs - Linhas Coloridas Modernas */}
                  {/* Rota Região Sul (Robo-01) */}
                  <line x1="150" y1="380" x2="220" y2="360" stroke="#ef4444" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="220" y1="360" x2="280" y2="410" stroke="#ef4444" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>

                  {/* Rota Região Leste (Robo-02) */}
                  <line x1="650" y1="200" x2="650" y2="280" stroke="#3b82f6" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>

                  {/* Rota Região Central (Robo-03) */}
                  <line x1="280" y1="240" x2="350" y2="190" stroke="#10b981" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="350" y1="190" x2="400" y2="240" stroke="#10b981" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>

                  {/* Rota Região Norte (Robo-04) */}
                  <line x1="300" y1="90" x2="400" y2="120" stroke="#6366f1" strokeWidth="3" opacity="0.8" strokeLinecap="round" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                  </line>

                  {/* Robôs - Ícones Modernos e Limpos */}
                  {/* Robo-01 (Sul) */}
                  <g transform="translate(150, 380)">
                    <circle r="16" fill="white" opacity="0.9" />
                    <circle r="14" fill="#ef4444" opacity="0.2">
                      <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="10" fill="#ef4444" />
                    <text y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">01</text>
                  </g>

                  {/* Robo-02 (Leste) */}
                  <g transform="translate(650, 280)">
                    <circle r="16" fill="white" opacity="0.9" />
                    <circle r="14" fill="#3b82f6" opacity="0.2">
                      <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="10" fill="#3b82f6" />
                    <text y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">02</text>
                  </g>

                  {/* Robo-03 (Central) */}
                  <g transform="translate(350, 240)">
                    <circle r="16" fill="white" opacity="0.9" />
                    <circle r="14" fill="#10b981" opacity="0.2">
                      <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="10" fill="#10b981" />
                    <text y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">03</text>
                  </g>

                  {/* Robo-04 (Norte) */}
                  <g transform="translate(400, 90)">
                    <circle r="16" fill="white" opacity="0.9" />
                    <circle r="14" fill="#6366f1" opacity="0.2">
                      <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle r="10" fill="#6366f1" />
                    <text y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="600">04</text>
                  </g>

                  {/* Pontos de Entrega - Minimalistas */}
                  {/* Concluída */}
                  <g transform="translate(220, 360)">
                    <circle r="5" fill="#22c55e" stroke="white" strokeWidth="2" />
                  </g>

                  {/* Em Trânsito */}
                  <g transform="translate(650, 200)">
                    <circle r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                  <g transform="translate(350, 190)">
                    <circle r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Pendente */}
                  <g transform="translate(280, 410)">
                    <circle r="5" fill="#94a3b8" stroke="white" strokeWidth="2" />
                  </g>

                  {/* Legenda Clean */}
                  <g transform="translate(20, 465)">
                    <rect width="760" height="28" fill="white" opacity="0.95" rx="6" stroke="#e2e8f0" strokeWidth="1" />

                    <circle cx="20" cy="14" r="4" fill="#ef4444" />
                    <text x="30" y="18" fontSize="9" fill="#475569" fontWeight="500">Sul</text>

                    <circle cx="70" cy="14" r="4" fill="#3b82f6" />
                    <text x="80" y="18" fontSize="9" fill="#475569" fontWeight="500">Leste</text>

                    <circle cx="130" cy="14" r="4" fill="#10b981" />
                    <text x="140" y="18" fontSize="9" fill="#475569" fontWeight="500">Central</text>

                    <circle cx="200" cy="14" r="4" fill="#6366f1" />
                    <text x="210" y="18" fontSize="9" fill="#475569" fontWeight="500">Norte</text>

                    <line x1="260" y1="5" x2="260" y2="23" stroke="#e2e8f0" strokeWidth="1" />

                    <circle cx="280" cy="14" r="3" fill="#22c55e" />
                    <text x="290" y="18" fontSize="9" fill="#475569" fontWeight="400">Entregue</text>

                    <circle cx="360" cy="14" r="3" fill="#3b82f6" />
                    <text x="370" y="18" fontSize="9" fill="#475569" fontWeight="400">Em Trânsito</text>

                    <circle cx="455" cy="14" r="3" fill="#94a3b8" />
                    <text x="465" y="18" fontSize="9" fill="#475569" fontWeight="400">Pendente</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Distribuição de Robôs por Região */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Distribuição de Robôs por Região</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Robô</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Região</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Entregas</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {robots.map((robot) => (
                      <tr key={robot.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-800">{robot.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getRegionColor(robot.region)}`}></div>
                            <span className="text-sm text-slate-700">{robot.region}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm font-bold text-slate-800">{robot.deliveries}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getRobotStatusColor(robot.status)}`}>
                            {robot.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-sm font-mono text-slate-600">{robot.avgTime}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Painel Lateral - Pontos de Entrega e Detalhes */}
          <div className="space-y-6">
            {/* Pontos de Entrega */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Pontos de Entrega</h2>

              <div className="space-y-3">
                {deliveryPoints.map((point) => (
                  <div
                    key={point.id}
                    className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 mb-1">{point.location}</div>
                        <div className="text-xs text-slate-600">{point.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{point.robot}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{point.time}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(point.status)}`}>
                        {getStatusIcon(point.status)}
                        {point.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors font-medium">
                  Ver Todas as Entregas
                </button>
              </div>
            </div>

            {/* Cards de Métricas dos Robôs */}
            {robots.filter(r => r.status === 'Em rota').map((robot) => (
              <div key={robot.id} className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">{robot.name}</h3>
                  <Truck className="w-5 h-5 opacity-80" />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-90">Localização Atual</span>
                    <span className="text-sm font-bold">{robot.currentLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-90">Distância Percorrida</span>
                    <span className="text-sm font-bold">{robot.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-90">Eficiência</span>
                    <span className="text-sm font-bold">{robot.efficiency}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-90">Entregas Realizadas</span>
                    <span className="text-sm font-bold">{robot.deliveries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
