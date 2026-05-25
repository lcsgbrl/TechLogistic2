import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Trash2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';

interface Product {
  id: string;
  name: string;
  sector: string;
  x: number;
  y: number;
}

export function DataEntry() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    x: '',
    y: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sector || !formData.x || !formData.y) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      sector: formData.sector,
      x: parseFloat(formData.x),
      y: parseFloat(formData.y),
    };

    setProducts([...products, newProduct]);
    setFormData({ name: '', sector: '', x: '', y: '' });
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleCalculateRoute = () => {
    if (products.length < 2) {
      alert('Adicione pelo menos 2 produtos para calcular a rota');
      return;
    }

    // Salva os produtos no localStorage para usar na próxima tela
    localStorage.setItem('logistic-products', JSON.stringify(products));
    navigate('/resultados');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb
          items={[
            { label: 'Dashboard', onClick: () => navigate('/') },
            { label: 'Produtos' }
          ]}
        />

        <h1 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Produtos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-slate-800 mb-6">Adicionar Produto</h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Peça A123"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">
                  Setor
                </label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: A1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Coordenada X
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.x}
                    onChange={(e) => setFormData({ ...formData, x: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-700 mb-1">
                    Coordenada Y
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.y}
                    onChange={(e) => setFormData({ ...formData, y: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Produto
              </button>
            </form>
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-slate-800 mb-6">Produtos Cadastrados</h2>

            {products.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Nenhum produto cadastrado ainda
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-2 text-sm text-slate-700">Produto</th>
                        <th className="text-left py-3 px-2 text-sm text-slate-700">Setor</th>
                        <th className="text-center py-3 px-2 text-sm text-slate-700">X</th>
                        <th className="text-center py-3 px-2 text-sm text-slate-700">Y</th>
                        <th className="text-center py-3 px-2 text-sm text-slate-700">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-slate-100">
                          <td className="py-3 px-2 text-sm text-slate-800">{product.name}</td>
                          <td className="py-3 px-2 text-sm text-slate-600">{product.sector}</td>
                          <td className="py-3 px-2 text-sm text-slate-600 text-center">{product.x}</td>
                          <td className="py-3 px-2 text-sm text-slate-600 text-center">{product.y}</td>
                          <td className="py-3 px-2 text-center">
                            <button
                              onClick={() => handleRemoveProduct(product.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Total: {products.length} produto(s)
                    </div>
                    <button
                      onClick={handleCalculateRoute}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
                    >
                      Calcular Rota
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
