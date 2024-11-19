import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Inventario } from './components/Inventario';
import { Ventas } from './components/Ventas';
import { Reportes } from './components/Reportes';

function App() {
  const [vistaActual, setVistaActual] = useState('inventario');

  const renderVista = () => {
    switch (vistaActual) {
      case 'inventario':
        return <Inventario />;
      case 'ventas':
        return <Ventas />;
      case 'reportes':
        return <Reportes />;
      default:
        return <Inventario />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setVista={setVistaActual} vistaActual={vistaActual} />
      <main className="container mx-auto py-6">
        {renderVista()}
      </main>
    </div>
  );
}

export default App;