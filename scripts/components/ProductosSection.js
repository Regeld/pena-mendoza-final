// scripts/components/ProductosSection.js

const { useState } = React; 

// 1. Tarjeta para las Categorías (El selector de Manga, Figura, etc.)
const CategoryCard = ({ title, imageSrc, onClick }) => (
    <div 
        onClick={onClick}
        className="w-full bg-gray-300 shadow-md cursor-pointer overflow-hidden relative group transition-transform duration-300 transform hover:scale-[1.02]"
    >
        <div className="w-full h-48 sm:h-64 flex items-center justify-center overflow-hidden">
            <img 
                src={imageSrc || 'placeholder.jpg'} 
                alt={title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
            />
        </div>
        
        {/* Fondo del título: Se oscurece en Dark Mode */}
        <div className="absolute bottom-0 left-0 right-0 p-3 py-4 bg-gray-400 dark:bg-gray-700 bg-opacity-90 flex justify-center items-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-white uppercase tracking-wider">{title}</p>
        </div>
    </div>
);


function ProductosSection({ addToCart }) {
    // Estado para manejar qué sub-sección estamos viendo: 'categories', 'manga', 'figura', etc.
    const [subSection, setSubSection] = useState('categories'); 

    // Definición de las 4 categorías principales de tu diseño (figma 8.png)
    const categories = [
        { id: 'manga', title: "MANGA", image: "images/productos/manga_library.jpg" },
        { id: 'figura', title: "FIGURA DE ACCIÓN", image: "images/productos/figura_goku_broly.jpg" },
        { id: 'peluche', title: "PELUCHE", image: "images/productos/peluche_peluche_chibi.jpg" },
        { id: 'accesorios', title: "ACCESORIOS", image: "images/productos/accesorio_kunai.jpg" },
    ];

    // 2. Lógica para Renderizar el Contenido (El punto que soluciona el fallo)
    const renderContent = () => {
        switch(subSection) {
            // Se asume que los componentes globales (window.MangaSection) existen
            case 'manga':
                return window.MangaSection ? <window.MangaSection addToCart={addToCart} /> : <div>Cargando sección de Manga...</div>;
            case 'figura':
                return window.FiguraAccionSection ? <window.FiguraAccionSection addToCart={addToCart} /> : <div>Cargando sección de Figuras de Acción...</div>;
            case 'peluche':
                return window.PelucheSection ? <window.PelucheSection addToCart={addToCart} /> : <div>Cargando sección de Peluches...</div>;
            case 'accesorios':
                return window.AccesoriosSection ? <window.AccesoriosSection addToCart={addToCart} /> : <div>Cargando sección de Accesorios...</div>;
            case 'categories':
            default:
                // Vista principal: Muestra la cuadrícula de tarjetas de categorías
                return (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {categories.map(cat => (
                            <CategoryCard
                                key={cat.id}
                                title={cat.title}
                                imageSrc={cat.image}
                                onClick={() => setSubSection(cat.id)} // Cambia el estado para cargar el componente
                            />
                        ))}
                    </div>
                );
        }
    };

    return (
        // Contenedor principal: De blanco (bg-white) a oscuro (dark:bg-gray-900)
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 md:px-16 py-10 min-h-[60vh]">
            
            {/* Botón para volver a la vista de categorías (visible si no estamos en 'categories') */}
            {subSection !== 'categories' && (
                <button 
                    onClick={() => setSubSection('categories')} 
                    className="mb-4 text-sm text-sj-red dark:text-sj-yellow hover:text-[#a01010] flex items-center"
                >
                    <i className="fas fa-arrow-left mr-2"></i> Volver a Productos
                </button>
            )}

            <h2 className="text-3xl font-normal mb-8 uppercase dark:text-white">PRODUCTOS</h2>
            
            {renderContent()}
        </div>
    );
}

// 🔑 Registro Global (Esencial para que app.js lo encuentre)
window.ProductosSection = ProductosSection;