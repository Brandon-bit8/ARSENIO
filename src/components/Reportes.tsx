import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useStore } from '../store/useStore';

export const Reportes: React.FC = () => {
  const { productos, ventas, obtenerEstadisticas } = useStore();
  const estadisticas = obtenerEstadisticas();

  const productosStockBajo = productos.filter(
    (producto) => producto.stock <= producto.minimo
  );

  const ventasPorCategoria = productos.reduce((acc: Record<string, number>, producto) => {
    const ventasProducto = ventas.reduce((sum, venta) => {
      const item = venta.productos.find((p) => p.producto.id === producto.id);
      return sum + (item ? item.cantidad : 0);
    }, 0);

    acc[producto.categoria] = (acc[producto.categoria] || 0) + ventasProducto;
    return acc;
  }, {});

  const dataCategoria = Object.entries(ventasPorCategoria).map(([categoria, total]) => ({
    categoria,
    total,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reportes y Estadísticas</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Ventas Diarias</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={estadisticas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Ventas por Categoría</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Productos con Stock Bajo</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Actual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Mínimo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productosStockBajo.map((producto) => (
                  <tr key={producto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">
                      {producto.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {producto.minimo}
                    </td>
                  </tr>
                ))}
                {productosStockBajo.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No hay productos con stock bajo
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};