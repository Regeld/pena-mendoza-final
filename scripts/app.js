// scripts/app.js

const { useState, useEffect } = React;

// --- DEFINICIONES DE COMPONENTES GLOBALES (HEADER Y FOOTER) ---

const Header = ({ navigate, cartItemCount, toggleCart, darkMode, toggleDarkMode }) => ( 
    <header className="fixed top-0 left-0 right-0 bg-sj-red shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex justify-between items-center">
            
            {/* INICIO DEL LOGO CON IMAGEN */}
            <div className="text-white text-3xl font-extrabold cursor-pointer uppercase tracking-widest flex items-center" onClick={() => navigate('franquicia')}>
                <img 
                    src="images/shonen_jump_skull.png" 
                    alt="Logo Shōnen Jump" 
                    className="w-15 h-20 mr-2" 
                />
                SHŌNEN JUMP
            </div>
            {/* FIN DEL LOGO CON IMAGEN */}
            <nav className="hidden md:flex space-x-6 text-white text-sm font-semibold uppercase">
                <a onClick={() => navigate('novedades')} className="hover:text-sj-yellow cursor-pointer transition duration-300">NOVEDADES</a>
                <a onClick={() => navigate('franquicia')} className="hover:text-sj-yellow cursor-pointer transition duration-300">FRANQUICIA</a>
                <a onClick={() => navigate('productos')} className="hover:text-sj-yellow cursor-pointer transition duration-300">PRODUCTOS</a>
                <a onClick={() => navigate('juego')} className="hover:text-sj-yellow cursor-pointer transition duration-300">GAME</a>
                <a onClick={() => navigate('contacto')} className="hover:text-sj-yellow cursor-pointer transition duration-300">CONTACTO</a>
            </nav>
            <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="text-white hover:text-sj-yellow transition duration-300 p-2">
                    {darkMode ? (<i className="fas fa-sun text-xl"></i>) : (<i className="fas fa-moon text-xl"></i>)}
                </button>
                <button onClick={toggleCart} className="relative text-white hover:text-sj-yellow transition duration-300 p-2">
                    <i className="fas fa-shopping-cart text-xl"></i>
                    {cartItemCount > 0 && (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-sj-red transform translate-x-1/2 -translate-y-1/2 bg-sj-yellow rounded-full">{cartItemCount}</span>)}
                </button>
            </div>
        </div>
    </header>
);

// scripts/app.js (Reemplazar la definición de Footer)

const Footer = () => (
    <footer className="bg-sj-dark text-gray-400 pt-10"> 
        <div className="max-w-7xl mx-auto px-5 md:px-8">
            
            {/* 1. CUATRO COLUMNAS ORIGINALES (SHONEN JUMP | NOSOTROS | CONTACTO | SÍGUENOS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-6">
                
                {/* COLUMNA 1: SHŌNEN JUMP (Solo Título y Logo) */}
              <div>
                    <h3 className="text-xl font-extrabold uppercase text-white dark:text-white mb-4">SHŌNEN JUMP</h3> 
                    {/* Imagen del Logo */}
                    <div className="flex items-center mb-4">
                        <img 
                            src="images/shonen_jump_skull.png" 
                            alt="Logo Shōnen Jump" 
                            className="w-15 h-20" 
                        />
                    </div>
                </div>
                
                {/* COLUMNA 2: NOSOTROS (Solo texto descriptivo) */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-4 uppercase">NOSOTROS</h4>
                    <p className="text-sm">La mejor tienda para tener a tus animes favoritos no solo en tu corazón sino de manera física</p>
                </div>

                {/* COLUMNA 3: CONTACTO */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-4 uppercase">CONTACTO</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start space-x-2">
                            <i className="fas fa-location-dot mt-1 text-sj-red"></i>
                            <span>Av. Gral. Juan Antonio Álvarez de Arenales 1737, Lince 15046</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <i className="fas fa-phone text-sj-red"></i>
                            <span>+51 921 083 007</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <i className="fas fa-envelope text-sj-red"></i>
                            <span>shōnenjump@gmail.com</span>
                        </li>
                    </ul>
                </div>

                {/* COLUMNA 4: SÍGUENOS Y NEWSLETTER */}
                <div>
                    <h4 className="text-lg font-bold text-white mb-4 uppercase">SÍGUENOS</h4>
                    <div className="flex space-x-4 text-2xl mb-4">
                        <a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="hover:text-sj-yellow transition duration-300 text-white"><i className="fab fa-tiktok"></i></a>
                    </div>
                    <p className="text-sm mb-2">Suscribite a nuestro newsletter</p>
                    <div className="flex w-full max-w-xs">
                        <input type="email" placeholder="Tu email" className="px-3 py-2 rounded-l text-gray-800 w-full text-sm"/>
                        <button className="bg-sj-red px-4 py-2 rounded-r hover:bg-[#a01010]">
                            <i className="fas fa-paper-plane text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* COPYRIGHT CENTRADO (Debajo de las 4 columnas, como se ve en la imagen) */}
            <div className="pt-4 mt-8 text-center text-xs border-t border-gray-700">
                <p className="text-gray-400">&copy; 2025 Shōnen Jump. Todos los derechos reservados</p>
            </div>
        </div>

        {/* BARRA ROJA INFERIOR */}
        <div className="bg-sj-red py-3 text-center text-xs text-white">
            SHŌNEN JUMP
        </div>
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


// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
function ShonenJumpApp() {
    const [currentSection, setCurrentSection] = useState('franquicia');
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false); 
    
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

    // Lógica de Navegación
    const navigate = (section) => { setCurrentSection(section); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    
    // LÓGICA DE CARRITO FINAL Y ROBUSTA
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

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

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

    const toggleCart = () => { setIsCartOpen(prev => !prev); };
    const checkout = () => { 
        alert('¡Compra finalizada con éxito! Total: S/. ' + cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
        setCartItems([]); 
        setIsCartOpen(false); 
    };
    
    // Mapeo DEFINITIVO para Rutas
    const componentNameMap = {
        'onepiece': 'OnePieceSection',
        'naruto': 'NarutoSection',
        'dragonball': 'DragonBallSection',
        'pokemon': 'PokemonSection',
        'bleach': 'BleachSection',
        'kimetsunoyaiba': 'KimetsuNoVaibaSection',
        'novedades': 'NovedadesSection',
        'productos': 'ProductosSection',
        'juego': 'JuegoSection',
        'contacto': 'ContactoSection',
        'franquicia': 'FranquiciaSection'
    };

    // Lógica de Rutas CORREGIDA
    const renderSection = () => {
        let componentKey = currentSection.toLowerCase();
        
        const ComponentName = componentNameMap[componentKey];
        const Component = window[ComponentName];

        if (Component) {
            return <Component addToCart={addToCart} navigate={navigate} updateQuantity={updateQuantity} />;
        }
        
        // Fallback si la ruta no existe
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
            />
            
            <main className="flex-1 pt-[68px]"> 
                {renderSection()}
            </main>

            {/* 🚨 MODAL INTEGRADO DIRECTAMENTE EN app.js (Solución Final a la Carga) */}
            <CartModal 
                isCartOpen={isCartOpen} 
                toggleCart={toggleCart} 
                cartItems={cartItems} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity}
                checkout={checkout}
            />
            <Footer />
        </div>
    );
}

ReactDOM.render(<ShonenJumpApp />, document.getElementById('root'));