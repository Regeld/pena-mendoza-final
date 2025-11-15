// scripts/components/NovedadesSection.js

const { useState, useEffect } = React;

// Componente de tarjeta de producto reutilizable
const ProductCard = ({ product, addToCart }) => (
    // Fondo general de tarjeta: De gris claro (bg-gray-200) a oscuro (dark:bg-gray-800)
    <div key={product.id} className="w-full bg-gray-200 dark:bg-gray-800 shadow-md overflow-hidden product-card">
        
        {/* Fondo de la Imagen: De gris medio (bg-gray-300) a oscuro (dark:bg-gray-700) */}
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img 
                src={product.image || 'placeholder.jpg'} 
                alt={product.name} 
                className="w-full h-full object-cover"
            />
        </div>
        
        <div className="p-2 pt-0 bg-gray-200 dark:bg-gray-800">
            {/* Contenedor de Info/Precio: De gris medio (bg-gray-300) a oscuro (dark:bg-gray-700) */}
            <div className="bg-gray-300 dark:bg-gray-700 p-2 pt-3">
                {/* Texto del Producto: Inversión de color */}
                <p className="text-xs text-gray-800 dark:text-white uppercase mb-2 h-10 flex items-center">{product.name}</p>
                <div className="flex justify-between items-center mt-2">
                    {/* Precio: Inversión de color */}
                    <span className="font-bold text-gray-900 dark:text-white">S/. {product.price.toFixed(2)}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-sj-red text-white px-4 py-2 rounded text-xs font-semibold uppercase hover:bg-[#a01010] transition duration-300"
                    >
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    </div>
);


function NovedadesSection({ addToCart }) {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('./data/novedades.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error loading Novedades:', error));
    }, []);

    return (
        // Contenedor principal: De blanco (bg-white) a oscuro (dark:bg-gray-900)
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 md:px-16 py-10">
            {/* Título: Aseguramos que el texto sea claro en modo oscuro */}
            <h2 className="text-3xl font-normal mb-8 uppercase dark:text-white">NOVEDADES</h2>
            
            <div className="grid product-grid gap-6"> 
                {products.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

window.NovedadesSection = NovedadesSection;