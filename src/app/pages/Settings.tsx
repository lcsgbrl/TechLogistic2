import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  User,
  Globe,
  Palette,
  Package,
  Settings as SettingsIcon,
  Bell,
  Clock,
  Server,
  CheckCircle,
  Save
} from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    projectName: 'Robô Logístico Inteligente',
    language: 'pt-BR',
    theme: 'light',
    maxProducts: 50,
    algorithm: 'nearest-neighbor',
    notifications: true,
    historyEnabled: true,
  });

  const handleSave = () => {
    localStorage.setItem('system-settings', JSON.stringify(settings));
    alert('Configurações salvas com sucesso!');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => navigate('/') },
            { label: 'Configurações' }
          ]}
        />

        <h1 className="text-2xl font-bold text-slate-800 mb-6">Configurações do Sistema</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Configurações */}
          <div className="lg:col-span-2 space-y-6">
            {/* Perfil da Equipe/Projeto */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Perfil do Projeto</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome do Projeto
                  </label>
                  <input
                    type="text"
                    value={settings.projectName}
                    onChange={(e) => setSettings({ ...settings, projectName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Equipe Responsável
                  </label>
                  <input
                    type="text"
                    defaultValue="Sistemas de Informação - TSP"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Configurações Gerais */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <SettingsIcon className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Configurações Gerais</h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-700">Idioma</div>
                      <div className="text-xs text-slate-500">Selecione o idioma do sistema</div>
                    </div>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pt-BR">Português (BR)</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium text-slate-700">Tema do Sistema</div>
                      <div className="text-xs text-slate-500">Aparência da interface</div>
                    </div>
                  </div>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Configurações do Algoritmo */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Otimização de Rotas</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Algoritmo de Otimização
                  </label>
                  <select
                    value={settings.algorithm}
                    onChange={(e) => setSettings({ ...settings, algorithm: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="nearest-neighbor">Nearest Neighbor (Manhattan)</option>
                    <option value="dijkstra">Dijkstra</option>
                    <option value="a-star">A* (A-Star)</option>
                    <option value="genetic">Algoritmo Genético</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Algoritmo utilizado para calcular a rota mais eficiente
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Limite Máximo de Produtos por Rota
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={settings.maxProducts}
                      onChange={(e) => setSettings({ ...settings, maxProducts: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm font-semibold text-slate-700 w-12 text-right">
                      {settings.maxProducts}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Número máximo de produtos processados em uma única rota
                  </p>
                </div>
              </div>
            </div>

            {/* Notificações e Histórico */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Notificações e Histórico</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Ativar Notificações</div>
                    <div className="text-xs text-slate-500">Receber alertas sobre rotas calculadas</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Histórico de Otimizações</div>
                    <div className="text-xs text-slate-500">Salvar histórico de rotas calculadas</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.historyEnabled}
                      onChange={(e) => setSettings({ ...settings, historyEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Configurações
              </button>
            </div>
          </div>

          {/* Coluna Lateral - Informações do Sistema */}
          <div className="space-y-6">
            {/* Informações do Sistema */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-cyan-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Informações do Sistema</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Versão do Sistema</span>
                  <span className="text-sm font-semibold text-slate-800">v1.2.4</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Status do Servidor</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Online</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Última Otimização</span>
                  <span className="text-sm font-semibold text-slate-800">Há 2 horas</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-600">Tempo Médio</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-800">124 ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas Rápidas */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Estatísticas do Mês</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Rotas Calculadas</span>
                  <span className="text-sm font-bold text-blue-700">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Produtos Processados</span>
                  <span className="text-sm font-bold text-blue-700">1,284</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Eficiência Média</span>
                  <span className="text-sm font-bold text-green-700">94.2%</span>
                </div>
              </div>
            </div>

            {/* Suporte */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">Suporte Técnico</h3>
              <p className="text-xs text-slate-600 mb-4">
                Precisa de ajuda com o sistema? Entre em contato com nossa equipe.
              </p>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors">
                Abrir Ticket de Suporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
