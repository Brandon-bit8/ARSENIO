import { create } from 'zustand';
import type { Producto, Venta } from '../types';

interface Estado {
  productos: Producto[];
  ventas: Venta[];
  agregarProducto: (producto: Producto) => void;
  actualizarProducto: (id: string, producto: Producto) => void;
  registrarVenta: (venta: Venta) => void;
  obtenerEstadisticas: () => { fecha: string; ventas: number; }[];
}

export const useStore = create<Estado>((set, get) => ({
  productos: [],
  ventas: [],
  
  agregarProducto: (producto) => 
    set((state) => ({ productos: [...state.productos, producto] })),
  
  actualizarProducto: (id, producto) =>
    set((state) => ({
      productos: state.productos.map((p) => 
        p.id === id ? producto : p
      ),
    })),
  
  registrarVenta: (venta) =>
    set((state) => {
      // Actualizar el stock de los productos vendidos
      const productosActualizados = state.productos.map(producto => {
        const productoEnVenta = venta.productos.find(p => p.producto.id === producto.id);
        if (productoEnVenta) {
          return {
            ...producto,
            stock: producto.stock - productoEnVenta.cantidad
          };
        }
        return producto;
      });

      return {
        productos: productosActualizados,
        ventas: [...state.ventas, venta]
      };
    }),
  
  obtenerEstadisticas: () => {
    const { ventas } = get();
    return ventas.reduce((acc: { fecha: string; ventas: number; }[], venta) => {
      const fecha = new Date(venta.fecha).toLocaleDateString();
      const existente = acc.find((item) => item.fecha === fecha);
      
      if (existente) {
        existente.ventas += venta.total;
      } else {
        acc.push({ fecha, ventas: venta.total });
      }
      
      return acc;
    }, []);
  },
}));