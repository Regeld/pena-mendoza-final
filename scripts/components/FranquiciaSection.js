// scripts/components/FranquiciaSection.js

const FranchiseItem = ({ title, imageSrc, navigate }) => (
    <div 
        onClick={() => navigate(title.toLowerCase().replace(/\s/g, ''))} // Navegación a la ruta de la franquicia
        className="relative overflow-hidden cursor-pointer group rounded-lg shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-[1.02]"
    >
        <div className="w-full h-40 md:h-52 overflow-hidden">
            <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
            />
        </div>
        
        {/* Fondo del título: Se oscurece en Dark Mode */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gray-200 dark:bg-gray-700 bg-opacity-90 flex justify-center items-center">
            {/* Texto: Se vuelve blanco en Dark Mode */}
            <p className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-widest">{title}</p>
        </div>
    </div>
);


function FranquiciaSection({ navigate }) {
    const franchises = [
        { title: "ONE PIECE", image: "images/franquicias/one_piece_thumb.jpg" },
        { title: "NARUTO", image: "images/franquicias/naruto_thumb.jpg" },
        { title: "DRAGON BALL", image: "images/franquicias/dragon_ball_thumb.jpg" },
        { title: "POKEMON", image: "images/franquicias/pokemon_thumb.jpg" },
        { title: "BLEACH", image: "images/franquicias/bleach_thumb.jpg" },
        { title: "KIMETSU NO YAIBA", image: "images/franquicias/kimetsu_no_yaiba_thumb.jpg" },
    ];

    return (
        // Contenedor principal: Se invierte el color de fondo y texto
        <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 md:px-16 py-10">
            {/* Título: Aseguramos que el texto sea claro en modo oscuro */}
            <h2 className="text-3xl font-normal mb-8 uppercase dark:text-white">FRANQUICIA</h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {franchises.map((item, index) => (
                    <FranchiseItem 
                        key={index}
                        title={item.title} 
                        imageSrc={item.image} 
                        navigate={navigate}
                    />
                ))}
            </div>
        </section>
    );
}

window.FranquiciaSection = FranquiciaSection;