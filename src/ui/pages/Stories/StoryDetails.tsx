import { useNavigate, useParams } from "react-router"
import { useStories } from "../../hooks/useStories";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";
import { getRandomCover } from "../utils/covers.util";
import { useUsers } from "../../hooks/useUsers";
import type { UserInfo } from "../../../core/domain/models/users/UserModel";
import { Bookmark, BookOpen, Clock, Info, List, MessageSquareText, Pencil } from "lucide-react";

const StoryDetails = () => {

  const navigate = useNavigate();
  const { authUser } = useAuth();
  const { loadStoryById } = useStories();
  const { findUserById } = useUsers();
  const { storyId } = useParams<{ storyId: string }>();
  const [ story, setStory ] = useState<StoryInfo | null>(null);
  const [ author, setAuthor ] = useState<UserInfo | null>(null);


  useEffect(() => {
    const loadStory = async () => {
      if (storyId) {
        const responseStory = await loadStoryById(storyId);
        if (responseStory === null) { navigate("*"); return; }
        const responseAuthor = await findUserById(responseStory.userId);
        setStory(responseStory);
        setAuthor(responseAuthor);
      }
    };
    loadStory();
  }, [storyId, loadStoryById, findUserById, navigate]);

  return (
    <main className="relative h-full">
      {story ? (
        <div className="p-5 sm:p-8 md:p-12 md:px-16 lg:px-24 xl:px-30 max-w-7xl mx-auto w-full">

          {/* ── Sección info principal ── */}
          <section className="relative mb-12 sm:mb-16" id="info">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">

              {/* Portada */}
              <div className="w-full sm:w-64 lg:w-72 shrink-0 group relative mx-auto sm:mx-0">
                <div className="aspect-[2/3] w-full bg-surface-container-high rounded-xl overflow-hidden shadow-2xl relative">
                  <img
                    src={story.coverUrl ? story.coverUrl : getRandomCover()}
                    alt="Portada de Historia"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 font-headline font-extrabold text-4xl text-on-surface/5 pointer-events-none select-none">
                  {story.status.replace("_", " ")}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-5 sm:space-y-6 pt-2 sm:pt-4 w-full">
                {/* Géneros */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                    {story.genre.name}
                  </span>
                  <span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                    {story.secondaryGenre.name}
                  </span>
                </div>

                {/* Título */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter text-on-surface leading-[1.1]">
                  {story.title}
                </h2>

                {/* Autor + fecha — se apila en móvil muy pequeño */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <Pencil size={18} fill="currentColor" />
                    <span className="text-sm font-medium">{author?.userName}</span>
                  </div>
                  <div className="w-1 h-1 bg-outline-variant/30 rounded-full hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span className="text-xs sm:text-sm">
                      {story.updatedAt !== null
                        ? "No se ha modificado"
                        : `Última modificación ${new Date(story.createdAt.toLocaleString()).toLocaleString()}`
                      }
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-base sm:text-lg text-on-surface-variant/80 max-w-2xl leading-relaxed italic border-l-2 border-primary/20 pl-4 sm:pl-6">
                  {story.description}
                </p>

                {/* Botones CTA */}
                <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <button className="bg-primary-container text-on-primary px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 cursor-pointer text-sm sm:text-base">
                    <BookOpen size={18} strokeWidth={3} />
                    Comenzar
                  </button>
                  <button className="border border-outline-variant/30 bg-surface-container-low text-on-surface px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all cursor-pointer text-sm sm:text-base">
                    <Bookmark size={18} strokeWidth={3} />
                    Guardar
                  </button>
                </div>
              </div>

              {/* Nav flotante — solo xl+ */}
              <nav className="hidden xl:flex flex-col gap-2 p-2 bg-surface-container-high/40 rounded-2xl sticky top-24 border border-outline-variant/5 shrink-0">
                <a href="#info" className="p-4 rounded-xl text-on-surface-variant hover:bg-primary-container hover:text-on-primary hover:shadow-lg hover:shadow-primary-container/10 transition-all" title="Info">
                  <Info size={20} />
                </a>
                <a href="#chapters" className="p-4 rounded-xl text-on-surface-variant hover:bg-primary-container hover:text-on-primary hover:shadow-lg hover:shadow-primary-container/10 transition-all" title="Capítulos">
                  <List size={20} />
                </a>
                <a href="#comments" className="p-4 rounded-xl text-on-surface-variant hover:bg-primary-container hover:text-on-primary hover:shadow-lg hover:shadow-primary-container/10 transition-all" title="Comentarios">
                  <MessageSquareText size={20} />
                </a>
              </nav>
            </div>

            {/* Nav horizontal — móvil/tablet (< xl) */}
            <nav className="xl:hidden flex items-center gap-2 mt-8 border-b border-outline-variant/10 pb-2">
              <a href="#info" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-on-surface-variant hover:bg-surface-container-high transition-all">
                <Info size={16} /> Info
              </a>
              <a href="#chapters" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-on-surface-variant hover:bg-surface-container-high transition-all">
                <List size={16} /> Capítulos
              </a>
              <a href="#comments" className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-on-surface-variant hover:bg-surface-container-high transition-all">
                <MessageSquareText size={16} /> Opiniones
              </a>
            </nav>
          </section>

          {/* ── Capítulos + Comentarios + Metadata ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">

              {/* Capítulos */}
              <section className="bg-surface-container-low/30 rounded-3xl p-5 sm:p-8 border border-outline-variant/5" id="chapters">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface">
                    Capítulos
                  </h3>
                  <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-3 sm:px-4 py-1 rounded-full">
                    12 Capítulos
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="group flex items-center justify-between p-4 sm:p-5 bg-surface-container-lowest/50 hover:bg-surface-container-high/50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-2xl sm:text-3xl font-display font-black text-on-surface/5 group-hover:text-primary/20 transition-colors shrink-0">
                        01
                      </span>
                      <div>
                        <h4 className="font-bold text-on-surface text-sm sm:text-base">Prueba 1</h4>
                        <p className="text-xs text-on-surface-variant/60 mt-0.5">
                          Publicado el 26/07/2026 • 2.4k palabras
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Comentarios */}
              <section className="space-y-6 sm:space-y-8" id="comments">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-on-surface whitespace-nowrap">
                    Opiniones de Lectores
                  </h3>
                  <div className="flex-1 h-px bg-outline-variant/10" />
                </div>

                {authUser && (
                  <div className="bg-surface-container-low rounded-3xl p-5 sm:p-6 border border-outline-variant/5">
                    <textarea
                      className="w-full bg-surface-container-lowest border-none rounded-2xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary/20 min-h-[100px] resize-none mb-4 focus:outline-none text-sm sm:text-base"
                      placeholder="Escribe tus pensamientos..."
                    />
                    <div className="flex justify-end">
                      <button className="bg-primary text-on-primary px-5 sm:px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer text-sm sm:text-base">
                        Publicar
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAViHy49kRFM-I-4243T5qCLN9P6g39st7Ga3crtZ9EIwL6eXENC7s3EmTswArbc0Ib-Cv_WLjgk2Iosff-dDwh0t4ru4WYcaDneUrMJLdk34gpq8wdV9rJQLnArmfxpoXwLZuoxleVoKCMSVrgz-0eF4hf5RvL324VPJ4mFu9p1cMg7sBbF-1sSYt9DK5KoboTR0p1-RA_sC2pWBdvEsleMHR33a89ETxr1K6CDUX-UeVYKWjJ55V9PAaqp_B7vxzd7KqR8MF2U0Q"
                      alt="Imagen de Perfil"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 bg-surface-container-low/40 rounded-2xl p-4 sm:p-5 border border-outline-variant/5">
                      <div className="flex justify-between items-center mb-2 gap-2">
                        <h5 className="font-bold text-on-surface text-sm sm:text-base">NombreUsuario</h5>
                        <span className="text-xs text-on-surface-variant shrink-0">Hace una hora</span>
                      </div>
                      <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                        Ejemplo Comentario...
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Metadata lateral */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface-container-high rounded-3xl p-6 sm:p-8 border border-outline-variant/10 shadow-xl overflow-hidden relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                <h4 className="text-lg uppercase tracking-widest text-primary font-bold mb-6">Datos</h4>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { value: story.totalViews,    label: "Lecturas Totales" },
                    { value: story.ratingSum,     label: "Estrellas Totales" },
                    { value: story.totalRating,   label: "Calificación" },
                    { value: story.totalFavorites, label: "Guardados" },
                  ].map(({ value, label }) => (
                    <div key={label} className="space-y-1">
                      <p className="text-2xl sm:text-3xl font-headline font-bold">{value}</p>
                      <p className="text-[11px] sm:text-[12px] text-on-surface-variant uppercase tracking-tighter">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full min-h-screen">
          <div className="loading-button" />
        </div>
      )}
    </main>
  );
};

export default StoryDetails;