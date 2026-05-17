import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronsRight, BookOpenText, History } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useStories } from "../../hooks/useStories";
import type { LastModifiedStory } from "../../../core/domain/models/stories/StoryModel";
import { getLastModifiedTime } from "../../pages/utils/time.util";

const LoadLastEditionModal = () => {
  const { authUser } = useAuth();
  const { loadLastModifiedStoryForAuthUser, loading } = useStories();
  const [lastStory, setLastStory] = useState<LastModifiedStory | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLastStory = async () => {
      if (authUser) {
        const responseStory = await loadLastModifiedStoryForAuthUser(authUser.userId);
        if (responseStory === null) {
          navigate("/network-lost");
        }
        if (responseStory.userId !== authUser.userId) {
          navigate("/forbidden")
        }
        setLastStory(responseStory);
      }
    };

    loadLastStory();
  }, [authUser?.userId, loadLastModifiedStoryForAuthUser]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 bg-black/30 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-search-bg rounded-2xl flex-col p-8 h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-fujiWhite tracking-tight">
            Continúa editando tu última historia
          </h2>
        </div>

        <div className="group flex items-center justify-between p-6 rounded-2xl bg-surface-container-low border border-transparent hover:border-primary/20 transition-all cursor-default">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-display font-black text-on-surface-variant/50 italic">
              <History size={30} />
            </span>
            <div>
              <h4 className={`text-lg ${lastStory?.title ? "font-bold text-on-surface group-hover:text-primary transition-colors" : "font-light text-on-surface-variant/40 italic"}`}>
                {loading ? "Cargando historia..." : lastStory?.title ?? "No tienes una historia reciente"}
              </h4>
              <p className="text-xs text-on-surface-variant">
                {lastStory ? `${lastStory.hidden ? "Borrador" : "Publicado"} • Última Edición ${getLastModifiedTime(lastStory.updatedAt)} • ${lastStory.totalChapters} capítulos` : "Aún no hay una historia reciente para mostrar"}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center my-8">
          <h2 className="text-xl font-bold text-fujiWhite tracking-tight">
            <p className="text-on-surface-variant/60">
              Retoma tu trabajo donde lo dejaste y sigue construyendo tu historia.
            </p>
          </h2>
        </div>

        <div className="flex items-center justify-center">
          <Link
            to="/library"
            className="group relative w-min rounded-2xl bg-toolbar-bg cursor-pointer hover:scale-95 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent"></div>
            <div className="relative z-10 p-6 flex flex-row gap-4 items-center h-full justify-start">
              <span className="text-4xl text-high-enfasis">
                <BookOpenText size={40} />
              </span>
              <span className="text-2xl font-bold text-fujiWhite tracking-tight">
                Edita alguna de tus otras historias
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center my-8">
          <h2 className="text-xl font-bold text-fujiWhite tracking-tight">
            <p className="text-on-surface-variant/60">
              Tu última versión quedó guardada y lista para continuar cuando quieras.
            </p>
          </h2>
        </div>

        <div className="flex items-center justify-around">
          <div className="group relative w-min rounded-2xl bg-toolbar-bg cursor-default overflow-hidden opacity-70">
            <div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent"></div>
            <div className="relative z-10 p-6 flex flex-row gap-4 items-center h-full justify-start">
              <span className="text-4xl text-high-enfasis">
                <ChevronsRight size={40} />
              </span>
              <span className="text-2xl font-bold text-fujiWhite tracking-tight">
                Sigue editando
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadLastEditionModal;
