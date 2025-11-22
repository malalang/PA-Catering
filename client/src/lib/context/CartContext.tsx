'use client';

import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';



interface CartContextType {
	cartItems: CartItem[];
	addItem: (item: ProductType) => void;
	removeFromCart: (ProductID: ProductType['ProductID']) => void;
	clearCart: () => void;
	minisItemQuantity: (item: ProductType) => void;
	totalPrice: number;
	totalQuantity: number;
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addItem = (item: ProductType) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((cartItem) => cartItem.ProductID === item.ProductID);
			if (existingItem) {
				return prevItems.map((cartItem) =>
					cartItem.ProductID === item.ProductID
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				const newItem: CartItem = { ...item, quantity: 1 };
				return [...prevItems, newItem];
			}
		});
	};

	const removeFromCart = (ProductID: ProductType['ProductID']) => {
		const updatedItems = cartItems.filter((item) => item.ProductID !== ProductID);
		setCartItems(updatedItems);
	};

	const minisItemQuantity = (item: ProductType) => {
		setCartItems((prevItems) => {
			return prevItems.map((cartItem) =>
				cartItem.Name === item.Name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
			);
		});
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const totalPrice = cartItems.reduce((sum, item) => sum + item.Price * item.quantity, 0);
	const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				totalPrice,
				totalQuantity,
				addItem,
				removeFromCart,
				minisItemQuantity,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};

// Ensure CartItem has ProductID, Name, Price, quantity, and Image properties

// Toast Context for notifications
interface ToastContextType {
	showToast: (message: string) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toast, setToast] = useState<string | null>(null);
	const showToast = (message: string) => {
		setToast(message);
		setTimeout(() => setToast(null), 2500); // 4 seconds
	};
	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<div className='fixed bottom-8 right-8 z-50 bg-black border-2 border-yellow-500  font-bold text-lg px-6 py-3 rounded-md shadow-2xl animate-fadein min-w-[180px] text-center'>
					{toast}
				</div>
			)}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) throw new Error('useToast must be used within a ToastProvider');
	return context;
};
