// scripts/components/CartModal.js

// 🚨 ESTO DEBE SER LA PRIMERA LÍNEA para cargar los hooks de React
const { useState, useEffect } = React; 

const CartModal = ({ cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, checkout }) => {
    if (!isCartOpen) return null;

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="fixed inset-0 bg-sj-dark bg-opacity-70 z-[100] flex justify-end transition-opacity duration-300" onClick={toggleCart}>
            <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 h-full overflow-y-auto shadow-2xl p-6 transition-transform duration-300" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-400 dark:border-gray-600 pb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tu Carrito</h3>
                    <button onClick={toggleCart} className="text-gray-600 dark:text-gray-400 text-2xl hover:text-sj-red">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">El carrito está vacío. ¡Añade productos de anime!</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-700 p-3 shadow-sm rounded">
                                    
                                    <div className="flex-1 mb-2 sm:mb-0">
                                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">S/. {item.price.toFixed(2)}</p>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        
                                        {/* Botón MENOS (-) */}
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-600 dark:text-gray-300 hover:text-sj-red p-1 text-sm">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{item.quantity}</span>

                                        {/* Botón MÁS (+) */}
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-600 dark:text-gray-300 hover:text-sj-red p-1 text-sm">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        
                                        <p className="font-bold text-sm text-gray-900 dark:text-white mx-3">S/. {(item.price * item.quantity).toFixed(2)}</p>
                                        
                                        <button onClick={() => removeFromCart(item.id)} className="text-sj-red hover:text-[#a01010] text-lg">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Total y Botón de Compra */}
                {cartItems.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-400 dark:border-gray-600">
                        <div className="flex justify-between text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            <span>TOTAL:</span>
                            <span className="text-sj-red">S/. {calculateTotal()}</span>
                        </div>
                        
                        <button onClick={checkout} className="w-full bg-sj-red text-white py-3 rounded font-semibold uppercase hover:bg-[#a01010] transition duration-300">
                            <i className="fas fa-credit-card mr-2"></i> PROCEDER AL PAGO
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 🚨 REGISTRO GLOBAL: Esto es lo que permite que app.js lo encuentre
window.CartModal = CartModal;