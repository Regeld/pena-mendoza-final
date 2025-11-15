// scripts/components/ContactoSection.js

const { useState } = React;

function ContactoSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const storeInfo = {
        ubicacion: "Av. Gral. Juan Antonio Álvarez de Arenales 1737, Lince 15046",
        telefono: "+51 921 083 007",
        email: "shōnenjump@gmail.com",
        horario: {
            lunes_viernes: "9:30 am a 2:00 pm", 
            sabado_domingo: "11:00 am a 6:00 pm",
        },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🚨 CONFIGURA LA URL REAL DE TU SERVIDOR AQUÍ 🚨
        const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/no7denokedvmq2ybkvlh96olt2ia6rwf';

        // Los entry.XXXXX en un proyecto real deben coincidir con tu Google Form
        const dataToSend = new URLSearchParams({
            'entry.name': formData.name,      
            'entry.email': formData.email,     
            'entry.phone': formData.phone,
            'entry.message': formData.message
        });

        try {
            // Este fetch es solo una simulación, el servidor real debe estar configurado
            await fetch(SERVER_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) 
            });

            alert(`¡Mensaje enviado con éxito al servidor! (Simulación)`);
            setFormData({ name: '', email: '', phone: '', message: '' });

        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert(`Hubo un error al contactar al servidor. Revisa la consola.`);
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 md:px-16 py-10 min-h-[70vh]">
            <h2 className="text-3xl font-normal mb-8 uppercase dark:text-white">CONTACTO</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Columna 1: Formulario */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Envíanos un mensaje</h3>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg"> 
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            {/* Input Nombre */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Nombre</label>
                                <input type="text" id="name" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sj-red bg-white dark:bg-gray-700 dark:text-white" required/>
                            </div>

                            {/* Input Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Email</label>
                                <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sj-red bg-white dark:bg-gray-700 dark:text-white" required/>
                            </div>

                            {/* Input Teléfono */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Teléfono</label>
                                <input type="tel" id="phone" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sj-red bg-white dark:bg-gray-700 dark:text-white"/>
                            </div>

                            {/* Textarea Mensaje */}
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-sm">Mensaje</label>
                                <textarea id="message" name="message" rows="6" placeholder="Mensaje" value={formData.message} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-sj-red bg-white dark:bg-gray-700 dark:text-white resize-none" required></textarea>
                            </div>

                            <button type="submit" className="bg-sj-red text-white px-6 py-3 rounded hover:bg-[#a01010] font-medium w-full uppercase text-sm">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Columna 2: Información y Mapa */}
                <div className="md:pl-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Información de la tienda</h3>
                    
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start space-x-3">
                            <i className="fas fa-location-dot mt-1 text-sj-red text-lg"></i>
                            <div><p className="font-semibold text-sm">Dirección</p><p className="text-sm">{storeInfo.ubicacion}</p></div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-phone text-sj-red text-lg"></i>
                            <div><p className="font-semibold text-sm">Teléfono</p><p className="text-sm">{storeInfo.telefono}</p></div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-envelope text-sj-red text-lg"></i>
                            <div><p className="font-semibold text-sm">Correo</p><p className="text-sm">{storeInfo.email}</p></div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <i className="fas fa-clock mt-1 text-sj-red text-lg"></i>
                            <div>
                                <p className="font-semibold text-sm">Horario</p>
                                <p className="text-sm">Lunes a Viernes: {storeInfo.horario.lunes_viernes}</p>
                                <p className="text-sm">Sábado y Domingo: {storeInfo.horario.sabado_domingo}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* MAPA GOOGLE IFRAME (Sustituyendo el placeholder de imagen) */}
                    <div className="mt-8">
                        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4395091001984!2d-77.03844952405021!3d-12.082035242560275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f4f1248b67%3A0x34070bb28d15e887!2sCentro%20Comerciales%2C%20Av.%20Gral.%20Juan%20Antonio%20%C3%81lvarez%20de%20Arenales%201737%2C%20Lince%2015046!5e0!3m2!1ses-419!2spe!4v1763178795098!5m2!1ses-419!2spe" 
                                width="100%" 
                                height="100%"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.ContactoSection = ContactoSection;