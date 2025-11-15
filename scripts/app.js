// scripts/app.js (CÓDIGO FINAL CONSOLIDADO)

const { useState, useEffect } = React;

// --- 1. DEFINICIONES DE COMPONENTES GLOBALES ---

const Header = ({ navigate, cartItemCount, toggleCart, darkMode, toggleDarkMode, toggleMobileMenu, showMobileMenu }) => ( 
    <header className="fixed top-0 left-0 right-0 bg-sj-red shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex justify-between items-center">
            {/* LOGO */}
            <div className="text-white text-3xl font-extrabold cursor-pointer uppercase tracking-widest flex items-center" onClick={() => navigate('franquicia')}>
                <img src="images/shonen_jump_skull.png" alt="Logo Shōnen Jump" className="w-12 h-12 mr-2" />
                SHŌNEN JUMP
            </div>
            
            {/* MENÚ DESKTOP */}
            <nav className="hidden md:flex space-x-6 text-white text-sm font-semibold uppercase">
                <a onClick={() => navigate('novedades')} className="hover:text-sj-yellow cursor-pointer transition duration-300">NOVEDADES</a>
                <a onClick={() => navigate('franquicia')} className="hover:text-sj-yellow cursor-pointer transition duration-300">FRANQUICIA</a>
                <a onClick={() => navigate('productos')} className="hover:text-sj-yellow cursor-pointer transition duration-300">PRODUCTOS</a>
                <a onClick={() => navigate('juego')} className="hover:text-sj-yellow cursor-pointer transition duration-300">GAME</a>
                <a onClick={() => navigate('contacto')} className="hover:text-sj-yellow cursor-pointer transition duration-300">CONTACTO</a>
            </nav>
            
            {/* ÍCONOS DE ACCIÓN */}
            <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="text-white hover:text-sj-yellow transition duration-300 p-2">
                    {darkMode ? (<i className="fas fa-sun text-xl"></i>) : (<i className="fas fa-moon text-xl"></i>)}
                </button>
                <button onClick={toggleCart} className="relative text-white hover:text-sj-yellow transition duration-300 p-2">
                    <i className="fas fa-shopping-cart text-xl"></i>
                    {cartItemCount > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-sj-red transform translate-x-1/2 -translate-y-1/2 bg-sj-yellow rounded-full">{cartItemCount}</span>)}
                </button>
                
                {/* 🚨 BOTÓN DE HAMBURGUESA (Solo visible en móvil) */}
                <button 
                    onClick={toggleMobileMenu} 
                    className="md:hidden text-white hover:text-sj-yellow transition duration-300 p-2"
                >
                    <i className={`fas ${showMobileMenu ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>
        </div>
    </header>
);

const Footer = () => ( 
    <footer className="bg-sj-dark text-gray-400 mt-10 pt-10"> 
        <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-6">
                <div><h3 className="text-xl font-extrabold uppercase text-white dark:text-white mb-4">SHŌNEN JUMP</h3> <div className="flex items-center mb-4"><i className="fas fa-fire text-5xl text-sj-yellow mr-2"></i></div><h4 className="text-lg font-bold text-white mb-2 uppercase">NOSOTROS</h4><p className="text-sm">La mejor tienda para tener a tus animes favoritos no solo en tu corazón sino de manera física</p></div>
                <div><h4 className="text-xl font-bold text-white mb-4 uppercase">CONTACTO</h4><ul className="space-y-3 text-sm"><li className="flex items-start space-x-2"><i className="fas fa-location-dot mt-1 text-sj-red"></i><span>Av. Gral. Juan Antonio Álvarez de Arenales 1737, Lince 15046</span></li><li className="flex items-start space-x-2"><i className="fas fa-phone text-sj-red"></i><span>+51 921 083 007</span></li><li className="flex items-start space-x-2"><i className="fas fa-envelope text-sj-red"></i><span>shōnenjump@gmail.com</span></li></ul></div>
                <div className="md:col-span-2"><h4 className="text-xl font-bold text-white mb-4 uppercase">SÍGUENOS</h4><div className="flex space-x-4 text-2xl mb-4"><a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-twitter"></i></a><a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-facebook-f"></i></a><a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-instagram"></i></a><a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i class="fab fa-tiktok"></i></a></div><p className="text-sm mb-2">Suscribite a nuestro newsletter</p><div className="flex w-full max-w-xs"><input type="email" placeholder="Tu email" className="px-3 py-2 rounded-l text-gray-800 w-full text-sm"/><button className="bg-sj-red px-4 py-2 rounded-r hover:bg-[#a01010]"><i class="fas fa-paper-plane text-white"></i></button></div></div>
            </div>
            <div className="pt-4 mt-8 text-center text-xs border-t border-gray-700"><p className="text-gray-400">&copy; 2025 Shōnen Jump. Todos los derechos reservados</p></div>
        </div>
        <div className="bg-sj-red py-3 text-center text-xs text-white">SHŌNEN JUMP</div>
    </footer>
);

// 🚨 1. MODAL DEL CARRITO INTEGRADO DIRECTAMENTE (Solución al "Cargando...")
const CartModal = ({ cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, checkout }) => {
    if (!isCartOpen) return null;

    const calculateTotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

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
                    {cartItems.length === 0 ? (<p className="text-gray-600 dark:text-gray-400 text-center py-8">El carrito está vacío. ¡Añade productos de anime!</p>) : (
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-700 p-3 shadow-sm rounded">
                                    <div className="flex-1 mb-2 sm:mb-0">
                                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">S/. {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-600 dark:text-gray-300 hover:text-sj-red p-1 text-sm"><i className="fas fa-minus"></i></button>
                                        <span className="font-bold text-sm text-gray-900 dark:text-white">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-600 dark:text-gray-300 hover:text-sj-red p-1 text-sm"><i className="fas fa-plus"></i></button>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white mx-3">S/. {(item.price * item.quantity).toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="text-sj-red hover:text-[#a01010] text-lg"><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

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



// --- 2. COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function ShonenJumpApp() {
    const [currentSection, setCurrentSection] = useState('franquicia');
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    
    // 🚨 ESTADO DE MENÚ MÓVIL
    const [showMobileMenu, setShowMobileMenu] = useState(false); 
    
    // Lógica Dark Mode
    useEffect(() => { 
        const root = document.documentElement; 
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => { setDarkMode(prev => !prev); };

    // Lógica de Navegación y Toggle de Menú
    const navigate = (section) => { 
        setCurrentSection(section); 
        setShowMobileMenu(false); // Cierra el menú al navegar
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(prev => !prev);
    };
    
    // LÓGICA DE CARRITO (FINAL Y ROBUSTA)
   // Dentro de function ShonenJumpApp() { ... }

// FUNCIÓN PARA AÑADIR (Robusta)
const addToCart = (product) => {
    if (!product || !product.id || !product.price) {
        console.error("Error: El producto no tiene ID o precio válido.", product);
        alert("No se pudo añadir el producto. Faltan datos clave.");
        return; 
    }

    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
            return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
};

// FUNCIÓN PARA ACTUALIZAR CANTIDAD (+ / -)
const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    setCartItems(prevItems =>
        prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
    );
};

// FUNCIÓN PARA ELIMINAR
const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
};
    const toggleCart = () => { setIsCartOpen(prev => !prev); };
    const checkout = () => { 
        alert('¡Compra finalizada con éxito! Total: S/. ' + cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
        setCartItems([]); 
        setIsCartOpen(false); 
    };
    
    // Mapeo DEFINITIVO para Rutas
    const componentNameMap = {
        'onepiece': 'OnePieceSection', 'naruto': 'NarutoSection', 'dragonball': 'DragonBallSection',
        'pokemon': 'PokemonSection', 'bleach': 'BleachSection', 'kimetsunoyaiba': 'KimetsuNoVaibaSection',
        'novedades': 'NovedadesSection', 'productos': 'ProductosSection', 'juego': 'JuegoSection', 
        'contacto': 'ContactoSection', 'franquicia': 'FranquiciaSection'
    };

    // Lógica de Rutas CORREGIDA
    const renderSection = () => {
        let componentKey = currentSection.toLowerCase();
        const ComponentName = componentNameMap[componentKey];
        const Component = window[ComponentName];

        if (Component) {
            return <Component addToCart={addToCart} navigate={navigate} updateQuantity={updateQuantity} />;
        }
        
        return <div className="p-10 text-xl dark:text-white">Sección "{currentSection}" no encontrada.</div>;
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-sj-dark"> 
            <Header 
                navigate={navigate} 
                cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} 
                toggleCart={toggleCart} 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode}
                toggleMobileMenu={toggleMobileMenu} // 🚨 Pasamos la función al Header
                showMobileMenu={showMobileMenu} // 🚨 Pasamos el estado al Header
            />
            
            {/* 🚨 PANEL MÓVIL DESPLEGABLE 🚨 */}
            {showMobileMenu && (
                <div className="md:hidden bg-sj-red text-white shadow-xl pt-2 pb-4 px-5 z-40 fixed top-[68px] w-full">
                    <div className="flex flex-col space-y-2 text-sm font-semibold uppercase">
                        <button onClick={() => navigate('novedades')} className="py-2 text-left hover:bg-[#a01010] px-3 transition duration-150">NOVEDADES</button>
                        <button onClick={() => navigate('franquicia')} className="py-2 text-left hover:bg-[#a01010] px-3 transition duration-150">FRANQUICIA</button>
                        <button onClick={() => navigate('productos')} className="py-2 text-left hover:bg-[#a01010] px-3 transition duration-150">PRODUCTOS</button>
                        <button onClick={() => navigate('juego')} className="py-2 text-left hover:bg-[#a01010] px-3 transition duration-150">GAME</button>
                        <button onClick={() => navigate('contacto')} className="py-2 text-left hover:bg-[#a01010] px-3 transition duration-150">CONTACTO</button>
                    </div>
                </div>
            )}
            {/* ----------------------------- */}

            <main className="flex-1 pt-[68px]"> 
                {renderSection()}
            </main>

            {window.CartModal && (
                <window.CartModal 
                    isCartOpen={isCartOpen} 
                    toggleCart={toggleCart} 
                    cartItems={cartItems} 
                    removeFromCart={removeFromCart} 
                    updateQuantity={updateQuantity}
                    checkout={checkout}
                />
            )}
            <Footer />
        </div>
    );
}

ReactDOM.render(<ShonenJumpApp />, document.getElementById('root'));