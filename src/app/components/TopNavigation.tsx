import { useNavigate, useLocation } from 'react-router';
import {
  TruckIcon,
  LayoutDashboard,
  Package,
  Route,
  FileText,
  Settings,
  User
} from 'lucide-react';

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/entrada-dados', label: 'Produtos', icon: Package },
    { path: '/rotas', label: 'Rotas', icon: Route },
    { path: '/qa-testes', label: 'QA e Testes', icon: FileText },
    { path: '/configuracoes', label: 'Configurações', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <TruckIcon className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">
              Robô Logístico Inteligente
            </span>
          </div>

          {/* Menu Horizontal */}
          <nav className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors
                    ${active
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Ícone de Usuário */}
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
