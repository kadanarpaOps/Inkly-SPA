import Navbar from '../components/navigation/Navbar';

function Hero() {
    return (
            <section className="relative min-h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden bg-[url('/images/hero-bg.webp')] bg-cover bg-position-[center_top] bg-no-repeat bg-[#1a1a24]">
            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-linear-to-b from-[#14141e]/65 via-[#14141e]/45 to-[#14141e]/80 z-10" />

            {/* Kana Left */}
            <div className="absolute inset-y-0 left-0 z-20 flex flex-col items-start justify-center px-[1.5vw] gap-1 pointer-events-none select-none sm:flex" aria-hidden="true">
                <span className="text-[clamp(4rem,8vw,9rem)] font-extralight text-[#c8b97a]/20 leading-none tracking-tighter animate-kana-float">デ</span>
                <span className="text-[clamp(3.5rem,7vw,8rem)] font-extralight text-[#c8b97a]/20 leading-none tracking-tighter animate-kana-float [animation-delay:1s]">イ</span>
                <div className="w-[clamp(70px,11vw,140px)] h-[clamp(90px,15vw,180px)] my-3 bg-[#c8b97a]/10 border-[1.5px] border-[#c8b97a]/20 kana-drop-shape -rotate-15 flex items-center justify-center after:content-['ジ'] after:text-[clamp(2rem,5vw,4.5rem)] after:text-[#c8b97a]/30 after:rotate-15" />
                <span className="text-[clamp(3rem,6vw,7rem)] opacity-70 font-extralight text-[#c8b97a]/20 leading-none tracking-tighter animate-kana-float [animation-delay:2s]">ジ</span>
                <span className="block w-[clamp(50px,9vw,120px)] h-0.5 bg-[#c8b97a]/25 mt-2" />
            </div>

            {/* Hero Content */}
            <div className="relative z-30 text-center max-w-145 px-8 flex flex-col items-center gap-5 mt-[-6vh] animate-hero-fade">
                <p className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-light text-[#7ab3c8] tracking-widest">Bienvenido</p>
                <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold text-[#e8e0d0] tracking-[0.12em] uppercase leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                    A TU TINTA
                </h1>
                <div className="max-w-115 text-left flex flex-col gap-4 mt-2 [animation-delay:0.3s]">
                    <p className="text-[clamp(0.8rem,1.4vw,0.95rem)] text-[#9a9080] leading-relaxed font-light">
                        Descubre historias que te atraparán desde la primera página. Lee, escribe y comparte
                        narrativas únicas creadas por una comunidad apasionada de escritores y lectores.
                    </p>
                    <p className="text-[clamp(0.8rem,1.4vw,0.95rem)] text-[#9a9080] leading-relaxed font-light">
                        Desde romance hasta fantasía épica, encuentra tu próxima historia favorita
                        o comparte la tuya con el mundo. Tu tinta, tu historia, tu comunidad.
                    </p>
                </div>
            </div>

            {/* Kana Right */}
            <div className="absolute inset-y-0 right-0 z-20 flex flex-col items-end justify-center px-[1.5vw] gap-1 pointer-events-none select-none sm:flex" aria-hidden="true">
                <span className="text-[clamp(4rem,8vw,9rem)] font-extralight text-[#c8b97a]/20 leading-none tracking-tighter animate-kana-float">イ</span>
                <span className="text-[clamp(3.5rem,7vw,8rem)] font-extralight text-[#c8b97a]/20 leading-none tracking-tighter animate-kana-float [animation-delay:1s]">ン</span>
                <div className="w-[clamp(100px,16vw,210px)] h-[clamp(100px,16vw,210px)] mt-4 bg-[#c8b97a]/10 border-[1.5px] border-[#c8b97a]/15 animate-blob-morph" />
            </div>

            {/* Geo Squares */}
            <div className="absolute bottom-[8%] right-[8%] z-20 pointer-events-none" aria-hidden="true">
                <div className="absolute border-[1.5px] border-[#c8b97a]/35 w-30 h-30 top-0 right-0 animate-geo-rotate" />
                <div className="absolute border-[1.5px] border-[#c8b97a]/35 w-20 h-20 top-7.5 right-7.5 animate-geo-rotate-reverse" />
                <div className="absolute border-[1.5px] border-[#c8b97a]/20 w-11.25 h-11.25 top-13.75 right-13.75" />
            </div>

            <div className="absolute bottom-[20%] right-[22%] z-20 text-[#c8b97a]/40 text-xl animate-sparkle-pulse" aria-hidden="true">✦</div>
            <div className="absolute bottom-[35%] right-[6%] z-20 text-[#c8b97a]/40 text-[0.8rem] animate-sparkle-pulse [animation-delay:1.5s]" aria-hidden="true">✦</div>
        </section>
    );
}

interface BookCardProps {
    title: string;
    author: string;
    genre: string;
    coverColor: string;
}

function BookCard({ title, author, genre, coverColor }: BookCardProps) {
    return (
        <div className="flex flex-col gap-3 cursor-pointer group transition-transform hover:-translate-y-1.5">
            <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-shadow" style={{ background: coverColor }}>
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-3">
                    <span className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#d4c98a] bg-black/40 border border-[#c8b97a]/40 px-2 py-0.5 rounded-full">
                        {genre}
                    </span>
                </div>
                <div className="book-spine-effect" />
                <div className="absolute w-2 h-2 rounded-full bg-[#c8b97a]/60 top-2 left-3" />
                <div className="absolute w-2 h-2 rounded-full bg-[#c8b97a]/60 bottom-2 right-2" />
            </div>
            <div className="px-1">
                <h3 className="text-[0.82rem] font-semibold text-[#e8e0d0] leading-tight truncate mb-0.5">{title}</h3>
                <p className="text-[0.72rem] text-[#6a6458] font-light">{author}</p>
            </div>
        </div>
    );
}

const FEATURED_BOOKS: BookCardProps[] = [
    { title: 'Ecos del Abismo',      author: 'Valeria Montoya', genre: 'Fantasía',       coverColor: 'linear-gradient(135deg, #2c1810, #8b4513)' },
    { title: 'Cartas al Viento',     author: 'Santiago Reyes',  genre: 'Romance',         coverColor: 'linear-gradient(135deg, #1a1a2e, #0f3460)' },
    { title: 'La Última Madrugada', author: 'Camila Torres',   genre: 'Drama',           coverColor: 'linear-gradient(135deg, #0d1b2a, #2d3a4a)' },
    { title: 'Sombras de Papel',     author: 'Andrés Ruiz',     genre: 'Misterio',        coverColor: 'linear-gradient(135deg, #1c0a2e, #4a1a8a)' },
    { title: 'Entre Mundos',         author: 'Laura Pérez',     genre: 'Sci-Fi',          coverColor: 'linear-gradient(135deg, #0a1628, #103a5e)' },
    { title: 'Flor de Ceniza',       author: 'Daniel Mora',     genre: 'Fantasía Oscura', coverColor: 'linear-gradient(135deg, #1a0a0a, #6b2020)' },
];

function FeaturedSection() {
    return (
        <section className="bg-background-global py-20 px-8">
            <div className="max-w-275 mx-auto">
                <h2 className="text-center text-[clamp(1.3rem,3vw,2rem)] font-normal text-[#e8e0d0] tracking-wider mb-12 relative after:content-[''] after:block after:w-15 after:h-[0.5px] after:bg-[#c8b97a] after:mx-auto after:mt-3 after:rounded-full">
                    Historias Destacadas
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-x-6 gap-y-8 max-[768px]:grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
                    {FEATURED_BOOKS.map((book) => (
                        <BookCard key={book.title} {...book} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#1a1a24] text-[#e8e0d0] font-['Poppins'] overflow-x-hidden">
                <Navbar isSidebarOpen={null} toggleSidebar={() => {}} />
            <main>
                <Hero />
                <FeaturedSection />
            </main>
        </div>
    );
}