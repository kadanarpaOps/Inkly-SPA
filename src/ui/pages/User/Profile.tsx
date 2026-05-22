import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ImageCropperModal from "../../components/images/ImageCropperModal";
import { Pen, ImageMinus, SquarePen, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useStories } from "../../hooks/useStories";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import { getRandomCover } from "../utils/covers.util";

export default function Profile() {

    const navigate = useNavigate();
    const { authUser, updateUserImage, deleteUserImage, loading } = useAuth();
    const { loadStoriesForAuthUser } = useStories();
    const [ userStories, setUserStories ] = useState<PageResponse<StoryInfo> | null>(null);

    useEffect(() => {
        const loadUserStories = async () => {
            if (authUser) {
                const responseUserStories = await loadStoriesForAuthUser(
                    { offset: 1, limit: 7, newestFirst: true },
                    authUser.userId
                );
                setUserStories(responseUserStories);
            }
        };
        loadUserStories();
    }, [authUser, loadStoriesForAuthUser]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [ selectedImage, setSelectedImage ] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => setSelectedImage(reader.result as string);
        }
    };

    const handleImageUpload = async (blob: Blob) => {
        if (authUser) {
            const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
            const success = await updateUserImage(authUser.userId, file);
            if (success) setSelectedImage(null);
        }
    };

    const handleDeleteImage = async () => {
        if (authUser) await deleteUserImage(authUser.userId);
    };

    return (
        <main className="relative h-full">
            {selectedImage && (
                <ImageCropperModal
                    image={selectedImage}
                    aspect={1/1}
                    onCropComplete={handleImageUpload}
                    onCancel={() => setSelectedImage(null)}
                    loading={loading}
                />
            )}

            {authUser ? (
                <>
                    {/* ── Banner ── */}
                    <div className="relative w-full h-40 sm:h-48 md:h-55 overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/29253139/pexels-photo-29253139.jpeg"
                            alt="Banner de paisaje oscuro montañoso"
                            className="w-full h-full object-cover grayscale opacity-40"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background-global to-transparent z-10">
                            {/* Badges de rol — posición adaptada */}
                            <div className="absolute right-4 sm:right-8 md:right-12 top-4 sm:top-6 md:top-8 z-20 flex flex-col items-end space-y-2">
                                {authUser.role.roleName === "INKLY_USER" ? (
                                    <>
                                        <div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
                                            Escritor
                                        </div>
                                        <div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
                                            Lector
                                        </div>
                                    </>
                                ) : (
                                    <div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
                                        Administrador
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── Contenido principal ── */}
                    <div className="px-4 sm:px-8 md:px-12 -mt-10 sm:-mt-12 relative z-20">

                        {/* ── Header de perfil ── */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                            {/* Avatar + nombre */}
                            <div className="flex items-end space-x-4 sm:space-x-6">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-background-global overflow-hidden bg-background-global shadow-2xl cursor-pointer shrink-0"
                                >
                                    <img
                                        src={
                                            authUser.profileImageUrl
                                                ? authUser.profileImageUrl
                                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.userName)}&background=dcd7ba&color=16161d`
                                        }
                                        alt="Imagen de Perfil"
                                        className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                                    />
                                    <div className="absolute text-several-light inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Pen size={26} />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="pb-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-global truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
                                        {authUser.userName}
                                    </h1>
                                    <p className="text-several-light font-medium text-sm sm:text-base truncate max-w-[180px] sm:max-w-xs">
                                        {authUser.email}
                                    </p>
                                </div>
                            </div>

                            {/* Botón eliminar foto */}
                            {authUser.profileImageUrl !== null && (
                                <div className="pb-2 self-start sm:self-auto">
                                    {!loading ? (
                                        <button
                                            onClick={handleDeleteImage}
                                            className="px-5 py-2.5 text-sm bg-primary-container text-white font-semibold rounded-full hover:scale-95 transition-transform flex items-center gap-2 cursor-pointer"
                                        >
                                            <ImageMinus size={18} />
                                            <span>Eliminar Foto</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-center w-10 h-10">
                                            <div className="loading-button" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* ── Descripción + Stats ── */}
                        <div className="mt-5 max-w-3xl">
                            <p className="text-global/60 leading-relaxed text-sm sm:text-base">
                                Bienvenido a tu perfil, gestiona tus historias o introdúcete en otros mundos, tú decides.
                            </p>

                            {/* Stats — wrap en móvil */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-several-light text-sm">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">
                                        {userStories?.meta !== undefined ? userStories.meta.totalItems : 0}
                                    </span>
                                    <span>Historias</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-toolbar-bg/50 hidden sm:block" />
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">0</span>
                                    <span>Vistas</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-toolbar-bg/50 hidden sm:block" />
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">0</span>
                                    <span>Historias Guardadas</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Tab de sección ── */}
                        <div className="mt-10 flex space-x-10 border-b border-toolbar-bg/10">
                            <span className="pb-4 text-high-enfasis font-bold border-b-2 border-high-enfasis px-2">
                                Tus Historias
                            </span>
                        </div>

                        {/* ── Grid de historias ── */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 pb-24">

                            {/* Crear nueva historia */}
                            <div
                                onClick={() => navigate("/story/create")}
                                className="aspect-3/4 col-span-1 overflow-hidden rounded-xl border-2 border-dashed border-high-enfasis/30 flex flex-col items-center justify-center space-y-3 hover:bg-high-enfasis/5 hover:border-high-enfasis transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-high-enfasis/10 flex items-center justify-center text-high-enfasis group-hover:scale-110 transition-transform">
                                    <SquarePen size={22} />
                                </div>
                                <span className="text-global font-bold text-sm sm:text-lg text-center px-2">
                                    Nueva Historia
                                </span>
                            </div>

                            {/* Lista de historias */}
                            {userStories && userStories.data.map(story => (
                                <div key={story.id} className="group cursor-pointer">
                                    <div
                                        onClick={() => navigate(`/story/edit/${story.id}`)}
                                        className="aspect-3/4 col-span-1 overflow-hidden rounded-xl shadow-2xl relative group-hover:-translate-y-2 transition-transform duration-500"
                                    >
                                        <img
                                            src={story.coverUrl !== null ? story.coverUrl : getRandomCover()}
                                            alt="Portada de Historia"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-background-global/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold uppercase">
                                            {story.genre.name}
                                        </div>
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-6">
                                            <div className="flex items-center space-x-3 text-white text-xs">
                                                <span className="flex items-center space-x-1">
                                                    <Eye size={16} />
                                                    <span>{story.totalViews}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Star size={16} />
                                                    <span>{story.totalRating}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 px-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h3 className="text-global font-bold text-sm sm:text-lg line-clamp-1">
                                            {story.title}
                                        </h3>
                                        <p className="text-several-light text-xs sm:text-sm shrink-0">
                                            {story.totalChapters} Cap.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="loading-button" />
                </div>
            )}
        </main>
    );
}