import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (items: CartItem[], shippingAddress: Order['shippingAddress'], paymentMethod: string) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('pokemonOrders');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      setOrders(
        parsed.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }))
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonOrders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (
    items: CartItem[],
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string
  ): Order => {
    const newOrder: Order = {
      id: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      items,
      totalPrice: items.reduce((total, item) => {
        const conditionMultiplier = {
          'Mint': 1.0,
          'Near Mint': 0.9,
          'Excellent': 0.75,
          'Good': 0.6,
          'Played': 0.45,
        }[item.condition];
        return total + item.price * item.quantity * conditionMultiplier;
      }, 0),
      status: 'pending',
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
