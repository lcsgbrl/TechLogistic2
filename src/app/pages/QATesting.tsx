import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useNavigate } from 'react-router';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface TestCase {
  id: string;
  category: string;
  description: string;
  status: 'OK' | 'Erro' | 'Aviso';
  responseTime: string;
  details: string;
}

export function QATesting() {
  const navigate = useNavigate();

  const testCases: TestCase[] = [
    {
      id: 'TC001',
      category: 'Validação de Entrada',
      description: 'Validação de coordenadas vazias',
      status: 'OK',
      responseTime: '12 ms',
      details: 'Sistema rejeita corretamente campos vazios'
    },
    {
      id: 'TC002',
      category: 'Validação de Entrada',
      description: 'Teste com pontos com coordenadas iguais',
      status: 'OK',
      responseTime: '8 ms',
      details: 'Produtos no mesmo local tratados adequadamente'
    },
    {
      id: 'TC003',
      category: 'Cálculo de Rota',
      description: 'Teste com distância zero (mesmo ponto)',
      status: 'OK',
      responseTime: '15 ms',
      details: 'Algoritmo identifica corretamente distância zero'
    },
    {
      id: 'TC004',
      category: 'Cálculo de Rota',
      description: 'Otimização com 2 produtos',
      status: 'OK',
      responseTime: '22 ms',
      details: 'Rota calculada: menor distância manhattan'
    },
    {
      id: 'TC005',
      category: 'Cálculo de Rota',
      description: 'Otimização com 10 produtos',
      status: 'OK',
      responseTime: '85 ms',
      details: 'Nearest Neighbor executado com sucesso'
    },
    {
      id: 'TC006',
      category: 'Performance',
      description: 'Tempo de resposta do sistema (carga normal)',
      status: 'OK',
      responseTime: '124 ms',
      details: 'Dentro do limite esperado (<200ms)'
    },
    {
      id: 'TC007',
      category: 'Validação de Entrada',
      description: 'Caracteres especiais no nome do produto',
      status: 'OK',
      responseTime: '5 ms',
      details: 'Sistema aceita corretamente entrada alfanumérica'
    },
    {
      id: 'TC008',
      category: 'Validação de Entrada',
      description: 'Coordenadas negativas',
      status: 'Aviso',
      responseTime: '7 ms',
      details: 'Coordenadas negativas aceitas, pode causar visualização inesperada'
    },
    {
      id: 'TC009',
      category: 'Visualização',
      description: 'Renderização do mapa com 5 produtos',
      status: 'OK',
      responseTime: '156 ms',
      details: 'SVG renderizado corretamente com todos os elementos'
    },
    {
      id: 'TC010',
      category: 'Persistência',
      description: 'Salvamento em localStorage',
      status: 'OK',
      responseTime: '3 ms',
      details: 'Dados persistidos corretamente entre sessões'
    },
    {
      id: 'TC011',
      category: 'Navegação',
      description: 'Redirecionamento sem dados cadastrados',
      status: 'OK',
      responseTime: '18 ms',
      details: 'Sistema redireciona para entrada de dados'
    },
    {
      id: 'TC012',
      category: 'Algoritmo',
      description: 'Manhattan distance vs Euclidiana',
      status: 'OK',
      responseTime: '31 ms',
      details: 'Manhattan distance aplicada corretamente (segue ruas)'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OK':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Erro':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Aviso':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OK':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Erro':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Aviso':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const totalTests = testCases.length;
  const passedTests = testCases.filter(t => t.status === 'OK').length;
  const errorTests = testCases.filter(t => t.status === 'Erro').length;
  const warningTests = testCases.filter(t => t.status === 'Aviso').length;
  const successRate = ((passedTests / totalTests) * 100).toFixed(1);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => navigate('/') },
            { label: 'QA e Testes' }
          ]}
        />

        <h1 className="text-2xl font-bold text-slate-800 mb-6">QA e Testes do Sistema</h1>

        {/* Métricas de Teste */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{totalTests}</div>
            <div className="text-xs text-slate-500 mt-1">Total de Testes</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-700">{passedTests}</div>
            <div className="text-xs text-slate-500 mt-1">Testes Aprovados</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-amber-700">{warningTests}</div>
            <div className="text-xs text-slate-500 mt-1">Avisos</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">{successRate}%</div>
            <div className="text-xs text-slate-500 mt-1">Taxa de Sucesso</div>
          </div>
        </div>

        {/* Tabela de Testes */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Resultados dos Testes</h2>
            <span className="text-sm text-slate-500">
              Última execução: 25/05/2026 14:35
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Categoria</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Descrição</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Tempo</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((test, index) => (
                  <tr
                    key={test.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className="text-sm font-mono text-slate-700 font-medium">{test.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600">{test.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-800 font-medium">{test.description}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(test.status)}
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(test.status)}`}>
                          {test.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-mono text-slate-600">{test.responseTime}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs text-slate-500">{test.details}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumo Técnico */}
        <div className="mt-6 bg-slate-100 rounded-lg border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Resumo Técnico</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600 mb-2">
                <span className="font-semibold text-slate-700">Framework de Teste:</span> Validação Manual
              </p>
              <p className="text-slate-600 mb-2">
                <span className="font-semibold text-slate-700">Ambiente:</span> Desenvolvimento
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Navegador:</span> Chrome 126.x
              </p>
            </div>
            <div>
              <p className="text-slate-600 mb-2">
                <span className="font-semibold text-slate-700">Algoritmo Testado:</span> Nearest Neighbor (Manhattan)
              </p>
              <p className="text-slate-600 mb-2">
                <span className="font-semibold text-slate-700">Cobertura:</span> Interface, Lógica, Performance
              </p>
              <p className="text-slate-600">
                <span className="font-semibold text-slate-700">Próxima Execução:</span> 26/05/2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
