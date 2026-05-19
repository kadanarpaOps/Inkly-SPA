import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, Star, Search } from "lucide-react";
import { useSearchStories } from "../../hooks/useSearchStories";
import { useStories } from "../../hooks/useStories";
import type { StorySearchFormValues } from "../../schemas/stories/search.schema";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";

const getRandomCover = (): string => {
    const covers = [
        "https://images.pexels.com/photos/1179652/pexels-photo-1179652.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600",
    ];
    return covers[Math.floor(Math.random() * covers.length)];
};

export default function ExploreStories() {
    const navigate = useNavigate();
    const { genres } = useStories();
    const { searchForm, results, loading, handleSearch, resetSearch } = useSearchStories("explore");
    const [expandedFilters, setExpandedFilters] = useState(false);

    const { register, handleSubmit, reset } = searchForm;

    // Initial load
    useEffect(() => {
        const initialSearch = async () => {
            await handleSearch({
                offset: 0,
                limit: 12,
                title: null,
                genreName: null,
                secondaryGenreName: null,
                status: null,
                tagNames: null,
                newestFirst: false,
            });
        };
        initialSearch();
    }, []);

    // On Submit
    const onSubmit = async (data: StorySearchFormValues) => {
        data.offset = 0; // Reset to first page
        await handleSearch(data);
    };

    // Pagination handlers
    const handleNextPage = async () => {
        const currentValues = searchForm.getValues();
        currentValues.offset = (currentValues.offset || 0) + (currentValues.limit || 12);
        await handleSearch(currentValues);
    };

    const handlePrevPage = async () => {
        const currentValues = searchForm.getValues();
        const newOffset = Math.max(0, (currentValues.offset || 0) - (currentValues.limit || 12));
        currentValues.offset = newOffset;
        await handleSearch(currentValues);
    };

    return (
        <main className="relative h-full">
            <div className="min-h-screen bg-background-global py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-global mb-2">Explora Historias</h1>
                        <p className="text-several-light">Descubre nuevas historias de escritores talentosos</p>
                    </div>

                    {/* Search and Filters Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-12 bg-surface rounded-xl p-6 space-y-6">
                        <div className="space-y-4">
                            {/* Title Search */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                    Buscar por Nombre
                                </label>
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-several-light opacity-50" />
                                    <input
                                        type="text"
                                        {...register("title")}
                                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-highest rounded-lg border border-toolbar-bg/10 text-global placeholder:text-several-light/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                        placeholder="Ej: El Viaje Perdido..."
                                    />
                                </div>
                            </div>

                            {/* Collapsible Advanced Filters */}
                            <button
                                type="button"
                                onClick={() => setExpandedFilters(!expandedFilters)}
                                className="text-primary font-semibold text-sm hover:text-primary/80 transition flex items-center space-x-2"
                            >
                                <span>{expandedFilters ? "▼" : "▶"} Filtros Avanzados</span>
                            </button>

                            {expandedFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Genre */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                            Género Principal
                                        </label>
                                        <select
                                            {...register("genreName")}
                                            className="w-full px-4 py-2.5 bg-surface-container-highest rounded-lg border border-toolbar-bg/10 text-global focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                        >
                                            <option value="">Todos los géneros</option>
                                            {genres?.map((genre) => (
                                                <option key={genre.id} value={genre.name}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Secondary Genre */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                            Género Secundario
                                        </label>
                                        <select
                                            {...register("secondaryGenreName")}
                                            className="w-full px-4 py-2.5 bg-surface-container-highest rounded-lg border border-toolbar-bg/10 text-global focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                        >
                                            <option value="">Todos los géneros</option>
                                            {genres?.map((genre) => (
                                                <option key={genre.id} value={genre.name}>
                                                    {genre.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-primary/80 uppercase tracking-wide">
                                            Estado
                                        </label>
                                        <select
                                            {...register("status")}
                                            className="w-full px-4 py-2.5 bg-surface-container-highest rounded-lg border border-toolbar-bg/10 text-global focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                        >
                                            <option value="">Cualquier estado</option>
                                            <option value="IN_PROGRESS">En Progreso</option>
                                            <option value="COMPLETED">Completada</option>
                                            <option value="PAUSED">Pausada</option>
                                            <option value="ABANDONED">Abandonada</option>
                                        </select>
                                    </div>

                                    {/* Newest First */}
                                    <div className="flex items-center space-x-2 md:col-span-1 lg:col-span-3">
                                        <input
                                            type="checkbox"
                                            {...register("newestFirst")}
                                            className="w-4 h-4 rounded border-toolbar-bg/10 text-primary focus:ring-primary/50 cursor-pointer"
                                        />
                                        <label className="text-sm text-global cursor-pointer">
                                            Mostrar Más Recientes Primero
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    resetSearch();
                                    reset();
                                }}
                                className="px-4 py-2 rounded-lg border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5 transition"
                            >
                                Limpiar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2.5 bg-primary rounded-lg text-surface font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
                            >
                                {loading ? "Buscando..." : "Buscar"}
                            </button>
                        </div>
                    </form>

                    {/* Results Grid */}
                    {results && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                                {results.data.length > 0 ? (
                                    results.data.map((story: StoryInfo) => (
                                        <div key={story.id} className="group cursor-pointer">
                                            <div
                                                onClick={() => navigate(`/story/${story.id}`)}
                                                className="aspect-3/4 overflow-hidden rounded-xl shadow-2xl relative group-hover:-translate-y-2 transition-transform duration-500"
                                            >
                                                <img
                                                    src={story.coverUrl || getRandomCover()}
                                                    alt="Portada de Historia"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 right-3 bg-background-global/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold uppercase">
                                                    {story.genre.name}
                                                </div>
                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                    <div className="flex items-center space-x-4 text-white text-xs">
                                                        <span className="flex items-center space-x-1">
                                                            <span className="text-sm">
                                                                <Eye size={20} />
                                                            </span>
                                                            <span>{story.totalViews}</span>
                                                        </span>
                                                        <span className="flex items-center space-x-1">
                                                            <span className="text-sm">
                                                                <Star size={20} />
                                                            </span>
                                                            <span>{story.totalRating}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 px-2">
                                                <h3 className="text-global font-bold text-lg line-clamp-1">
                                                    {story.title}
                                                </h3>
                                                <p className="text-several-light text-sm mt-1">
                                                    {story.totalChapters} Capítulos
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full flex items-center justify-center py-12">
                                        <p className="text-several-light">No se encontraron historias con esos criterios</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {results.data.length > 0 && (
                                <div className="flex items-center justify-center space-x-4 pb-12">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={results.meta.numberPage <= 1 || loading}
                                        className="px-4 py-2 rounded-lg border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5 disabled:opacity-30 transition"
                                    >
                                        ← Anterior
                                    </button>
                                    <span className="text-several-light text-sm">
                                        Página {results.meta.numberPage}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={results.meta.numberPage >= results.meta.totalPages || loading}
                                        className="px-4 py-2 rounded-lg border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5 disabled:opacity-30 transition"
                                    >
                                        Siguiente →
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-24">
                            <div className="loading-button" />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
