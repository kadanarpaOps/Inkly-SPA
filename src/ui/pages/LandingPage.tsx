import { Home, Languages, AlignJustify, Search, MessageCircle, User } from 'lucide-react';

function Navbar() {
    return (
        <nav className="navbar">
        <div className="navbar-left">
            <button className="nav-icon-btn" aria-label="Inicio"><Home size={20} /></button>
            <button className="nav-icon-btn" aria-label="Idioma"><Languages size={20} /></button>
            <button className="nav-icon-btn" aria-label="Menú"><AlignJustify size={20} /></button>
        </div>
        <div className="navbar-search">
            <input type="text" placeholder="" aria-label="Buscar" />
            <button aria-label="Buscar"><Search size={18} /></button>
        </div>
        <div className="navbar-right">
            <button className="nav-icon-btn" aria-label="Mensajes"><MessageCircle size={20} /></button>
            <button className="nav-icon-btn" aria-label="Perfil"><User size={20} /></button>
        </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="hero">
        <div className="kana kana-left" aria-hidden="true">
            <span className="kana-char kana-top">デ</span>
            <span className="kana-char kana-mid">イ</span>
            <div className="kana-drop"></div>
            <span className="kana-char kana-bottom">ジ</span>
            <span className="kana-line" aria-hidden="true"></span>
        </div>
        <div className="hero-content">
            <p className="hero-welcome">Bienvenido</p>
            <h1 className="hero-title">A TU TINTA</h1>
            <div className="hero-description">
            <p>
                Descubre historias que te atraparán desde la primera página. Lee, escribe y comparte
                narrativas únicas creadas por una comunidad apasionada de escritores y lectores.
            </p>
            <p>
                Desde romance hasta fantasía épica, encuentra tu próxima historia favorita
                o comparte la tuya con el mundo. Tu tinta, tu historia, tu comunidad.
            </p>
            </div>
        </div>
        <div className="kana kana-right" aria-hidden="true">
            <span className="kana-char kana-top">イ</span>
            <span className="kana-char kana-mid">ン</span>
            <div className="kana-blob"></div>
        </div>
        <div className="geo-squares" aria-hidden="true">
            <div className="geo-sq geo-sq-1"></div>
            <div className="geo-sq geo-sq-2"></div>
            <div className="geo-sq geo-sq-3"></div>
        </div>
        <div className="sparkle sparkle-1" aria-hidden="true">✦</div>
        <div className="sparkle sparkle-2" aria-hidden="true">✦</div>
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
        <div className="book-card">
        <div className="book-cover" style={{ background: coverColor }}>
            <div className="book-cover-overlay">
            <span className="book-cover-tag">{genre}</span>
            </div>
            <div className="book-spine"></div>
            <div className="book-dot book-dot-tl"></div>
            <div className="book-dot book-dot-br"></div>
        </div>
        <div className="book-info">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">{author}</p>
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
        <section className="featured">
        <div className="featured-inner">
            <h2 className="featured-title">Historias Destacadas</h2>
            <div className="books-grid">
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
        <div className="landing">
        <Navbar />
        <main>
            <Hero />
            <FeaturedSection />
        </main>
        </div>
    );
}