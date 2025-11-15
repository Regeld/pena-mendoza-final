// scripts/components/JuegoSection.js

const { useState, useEffect, useRef } = React;

// Dimensiones originales (usadas para cálculos internos)
const GAME_WIDTH = 550;
const GAME_HEIGHT = 350;

const PLAYER_SIZE = 50; 
const DRAGON_BALL_SIZE = 40; 
const MOVEMENT_SPEED = 20; 

const generateId = () => Math.random().toString(36).substring(7);

// Genera esferas en posiciones aleatorias
const generateDragonBalls = (count) => {
    const balls = [];
    for (let i = 0; i < count; i++) {
        balls.push({
            id: generateId(),
            x: Math.random() * (GAME_WIDTH - DRAGON_BALL_SIZE),
            y: Math.random() * (GAME_HEIGHT - DRAGON_BALL_SIZE),
        });
    }
    return balls;
};

function JuegoSection() {
    const [gameState, setGameState] = useState('menu');
    const [score, setScore] = useState(0);
    const [countdown, setCountdown] = useState(30);
    const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
    const [dragonBalls, setDragonBalls] = useState([]);
    const gameAreaRef = useRef(null);
    
    // Función para mover al jugador
    const movePlayer = (dx, dy) => {
        setPlayerPosition(prev => {
            let newX = prev.x + dx;
            let newY = prev.y + dy;

            // Limitar al área de juego
            newX = Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, newX));
            newY = Math.max(0, Math.min(GAME_HEIGHT - PLAYER_SIZE, newY));
            
            return { x: newX, y: newY };
        });
    };
    
    // 1. Inicializar y Empezar Juego
    const startGame = () => {
        setPlayerPosition({ x: GAME_WIDTH / 2 - PLAYER_SIZE / 2, y: GAME_HEIGHT / 2 - PLAYER_SIZE / 2 }); 
        setDragonBalls(generateDragonBalls(5));
        setScore(0);
        setCountdown(30);
        setGameState('playing');
    };
    
    // 2. Control de Movimiento del Jugador (Teclado)
    useEffect(() => {
        if (gameState !== 'playing') return;
        
        const handleKeyDown = (e) => {
            let dx = 0;
            let dy = 0;

            switch (e.key) {
                case 'ArrowUp': case 'w': dy = -MOVEMENT_SPEED; break;
                case 'ArrowDown': case 's': dy = MOVEMENT_SPEED; break;
                case 'ArrowLeft': case 'a': dx = -MOVEMENT_SPEED; break;
                case 'ArrowRight': case 'd': dx = MOVEMENT_SPEED; break;
                default: return;
            }
            // Mueve el jugador directamente
            setPlayerPosition(prev => {
                let newX = Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, prev.x + dx));
                let newY = Math.max(0, Math.min(GAME_HEIGHT - PLAYER_SIZE, prev.y + dy));
                return { x: newX, y: newY };
            });
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);
    
    // 3. Game Loop: Colisiones y Temporizador
    useEffect(() => {
        let timer;
        let loop;

        if (gameState === 'playing') {
            timer = setInterval(() => {
                setCountdown(prev => (prev === 1 ? 0 : prev - 1));
            }, 1000);

            loop = setInterval(() => {
                checkCollisions();
            }, 100);
        }
        
        if (countdown === 0 && gameState === 'playing') {
            setGameState('finished');
        }

        return () => {
            clearInterval(timer);
            clearInterval(loop);
        };
    }, [gameState, countdown, playerPosition]);
    
    // 4. Lógica de Colisión
    const checkCollisions = () => {
        setDragonBalls(prevBalls => {
            const newBalls = prevBalls.filter(ball => {
                const isColliding = (
                    playerPosition.x < ball.x + DRAGON_BALL_SIZE &&
                    playerPosition.x + PLAYER_SIZE > ball.x &&
                    playerPosition.y < ball.y + DRAGON_BALL_SIZE &&
                    playerPosition.y + PLAYER_SIZE > ball.y
                );
                
                if (isColliding) {
                    setScore(s => s + 100); 
                    return false; 
                }
                return true;
            });

            if (newBalls.length === 0) {
                return generateDragonBalls(5); 
            }

            return newBalls;
        });
    };
    
    // 5. Renderizado del Contenido
    const renderGameContent = () => {
        // ... (Menú y pantalla de fin - sin cambios) ...
        if (gameState === 'menu') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <img src="images/game/goku_chibi_standing.png" alt="Goku Chibi" className="w-24 h-24 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                        Usa las teclas de flecha (o WASD) para moverte y ¡captura todas las Esferas del Dragón!
                    </p>
                </div>
            );
        }
        
        if (gameState === 'finished') {
             return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h3 className="text-4xl font-black text-sj-red dark:text-sj-yellow mb-4">¡TIEMPO AGOTADO!</h3>
                    <p className="text-2xl text-gray-800 dark:text-white font-bold mb-6">Puntuación Final: <span className="text-sj-red dark:text-sj-yellow">{score}</span></p>
                    <button 
                        onClick={() => setGameState('menu')}
                        className="bg-sj-red text-white px-6 py-2 rounded-md hover:bg-[#a01010] transition"
                    >
                        Volver a Intentar
                    </button>
                </div>
            );
        }

        // Estado 'playing'
        return (
            // 🚨 NUEVA INTERACCIÓN: Click para mover
            <div 
                className="relative w-full h-full"
                onClick={(e) => {
                    if (gameState === 'playing' && gameAreaRef.current) {
                        const rect = gameAreaRef.current.getBoundingClientRect();
                        // Ajuste de las coordenadas del clic al sistema de coordenadas del juego (0-550, 0-350)
                        const scaleX = GAME_WIDTH / rect.width;
                        const scaleY = GAME_HEIGHT / rect.height;

                        const clickX = (e.clientX - rect.left) * scaleX;
                        const clickY = (e.clientY - rect.top) * scaleY;
                        
                        // Mueve el personaje al punto de clic
                        setPlayerPosition({ 
                            x: Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, clickX - PLAYER_SIZE / 2)),
                            y: Math.max(0, Math.min(GAME_HEIGHT - PLAYER_SIZE, clickY - PLAYER_SIZE / 2)) 
                        });
                    }
                }}
            >
                {/* 5a. Renderizado del Jugador (Goku con Imagen) */}
                <div 
                    className="absolute rounded-full flex items-center justify-center"
                    style={{
                        left: `${playerPosition.x}px`,
                        top: `${playerPosition.y}px`,
                        width: `${PLAYER_SIZE}px`,
                        height: `${PLAYER_SIZE}px`,
                        backgroundImage: `url(images/game/goku_sprite.png)`, 
                        backgroundSize: 'contain', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                </div>
                
                {/* 5b. Renderizado de las Esferas del Dragón (con Imagen) */}
                {dragonBalls.map(ball => (
                    <div
                        key={ball.id}
                        className="absolute animate-pulse" 
                        style={{
                            left: `${ball.x}px`,
                            top: `${ball.y}px`,
                            width: `${DRAGON_BALL_SIZE}px`,
                            height: `${DRAGON_BALL_SIZE}px`,
                            backgroundImage: `url(images/game/dragon_ball_4star.png)`, 
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-5 md:px-16 py-10 min-h-[70vh]">
            <h2 className="text-3xl font-normal mb-8 uppercase dark:text-white">GAME: CAPTURA Z</h2>
            
            <div className="flex flex-col md:flex-row gap-10">
                
                {/* Columna Izquierda: Área de Juego (Optimizado para Mobile/Desktop) */}
                <div 
                    ref={gameAreaRef} // 🚨 AÑADIDO EL REF AQUÍ
                    className="w-full md:w-2/3 bg-gray-200 dark:bg-gray-700 relative rounded-md overflow-hidden shadow-2xl"
                    // 🚨 TAMAÑO: Usamos un tamaño fijo para los cálculos internos, pero permitimos que se escale en móvil con w-full
                    style={{ maxWidth: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px`, margin: '0 auto' }}
                >
                    {renderGameContent()}
                </div>
                
                {/* Columna Derecha: Marcador y Controles */}
                <div className="w-full md:w-1/3 p-4">
                    <img src="images/game/dragon_ball_text_logo.png" alt="Dragon Ball Logo" className="w-full mb-8 max-w-[200px] mx-auto"/>
                    
                    {/* Botón de Inicio/Reinicio */}
                    {gameState !== 'playing' && (
                        <button 
                            onClick={startGame}
                            className="w-full bg-sj-red text-white px-4 py-3 font-bold uppercase tracking-wider rounded-md hover:bg-[#a01010] transition duration-300 mb-6"
                        >
                            INICIAR PARTIDA
                        </button>
                    )}

                    {/* Marcadores */}
                    <div className="w-full mb-6">
                        <p className="text-lg font-normal uppercase text-gray-700 dark:text-gray-300">TIEMPO RESTANTE:</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 py-3 mt-1 text-center rounded">
                            <span className={`text-4xl font-extrabold ${countdown <= 5 && gameState === 'playing' ? 'text-sj-red animate-pulse' : 'text-gray-800 dark:text-white'}`}>{countdown}s</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="text-lg font-normal uppercase text-gray-700 dark:text-gray-300">PUNTAJE :</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 py-3 mt-1 text-center rounded">
                            <span className="text-4xl font-extrabold text-sj-red dark:text-sj-yellow">{score}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

window.JuegoSection = JuegoSection;