import React from 'react';
import { Building2, BarChart3, Package, ShoppingCart } from 'lucide-react';

interface NavProps {
  setVista: (vista: string) => void;
  vistaActual: string;
}

export const Navbar: React.FC<NavProps> = ({ setVista, vistaActual }) => {
  const navItems = [
    { id: 'inventario', icon: Package, label: 'Inventario' },
    { id: 'ventas', icon: ShoppingCart, label: 'Ventas' },
    { id: 'reportes', icon: BarChart3, label: 'Reportes' },
  ];

  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          <span className="text-xl font-bold">Ferretería El Constructor</span>
        </div>
        <div className="flex gap-6">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setVista(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${vistaActual === id ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};