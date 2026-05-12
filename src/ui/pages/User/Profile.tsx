import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ImageCropperModal from "../../components/images/ImageCropperModal";
import { Pen, ImageMinus, SquarePen, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useStories } from "../../hooks/useStories";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import { getRandomString } from "./utils/util";

export default function Profile() {

    // Use Navigate
    const navigate = useNavigate();
    // Use Auth
    const { authUser, updateUserImage, deleteUserImage, loading } = useAuth();
    // Use Stories
    const { loadStoriesForAuthUser } = useStories();
    // Search Stories
    const [ userStories, setUserStories ] = useState<PageResponse<StoryInfo> | null>(null);
    useEffect(() => {
        const loadUserStories = async () => {
            if (authUser) {
                const responseUserStories = await loadStoriesForAuthUser({ offset: 1, limit: 7, newestFirst: true }, authUser!.userId);
                setUserStories(responseUserStories);
            }
        };
        loadUserStories();
    }, [authUser, loadStoriesForAuthUser]);
    const defaultCovers = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBi_kMQ_BggKRrkmCfPH-cR6BxPLGopvWXhVpw7CCe5RAD7NFmAaHPxnQkDxcDhPHNCM2Jbv7AFF6SGmmkWzyLHff0Wzg_nYG836y6LqCkYwFiixPluy41c12pMe9eeRJ5L8QeKYepNBAqyUOujFUb6TX0JiF02Rx01nC0YyHLUIqrNrCyw-b2PoUVKqSTzBkAcKBv6dUHH-7LriifzG2yvflGsAxzqpdZBhBwtHoFRZ8HofszZbJTQ1tWUTYBiLVa8gMxX1kW4D78",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNHnoGe4LoiQkJqvnbBND14-SvwMgpaRRjbE5jeHh88I0cFtcxmYLQJHSuSHq3U5pt58KXFy-cMSMC8uUyj4G0GT1eae8V47Yiji3rA3i9GMh92DM6lAE1kRIX1Z76cs6yx10Z_jQPZTTTIFsi3jtWA0qOHE0y5rUugmNj3rp1DQ6h_ZJ2nAanU9r3_J0dxWGpNVNqcHtUEz6ZkIw3iCkD3qMSZBTsRL8-2_lLoeTS2AAT6qtFcZ2ByvtePQ6rePwz0Do_7iGHvk0"
    ];
    // File Input Management
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
            if (success) {
                setSelectedImage(null);
            }
        }
    }
    const handleDeleteImage = async () => {
        if (authUser) {
            await deleteUserImage(authUser.userId);
        }
    }

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

            { authUser ? (
                <>
                    <div className="relative w-full h-55 overflow-hidden">
                        <img
                            src="https://images.pexels.com/photos/29253139/pexels-photo-29253139.jpeg"
                            alt="Banner de paisaje oscuro montañoso"
                            className="w-full h-full object-cover grayscale opacity-40"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background-global to-transparent z-10">
                            <div className="absolute right-12 top-8 z-20 flex flex-col items-end space-y-3">
                                {authUser.role.roleName == "INKLY_USER" ? (
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
                    <div className="px-12 -mt-12 relative z-20">
                        <div className="flex items-end justify-between">
                            <div className="flex items-end space-x-6">
                                {/** Element to Select an Image to Update */}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative w-32 h-32 rounded-full border-4 border-background-global overflow-hidden bg-background-global shadow-2xl cursor-pointer"
                                >
                                    {authUser.profileImageUrl ? (
                                        <img
                                            src={authUser.profileImageUrl}
                                            alt="Imagen de Perfil"
                                            className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                                        />
                                    ) : (
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.userName)}&background=dcd7ba&color=16161d`}
                                            alt="Imagen de Perfil"
                                            className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                                        />
                                    )}
                                    {/** Icon that shows when hover the Image Profile */}
                                    <div className="absolute text-several-light inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Pen size={30} />
                                    </div>
                                    {/** Input to select Image */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/png, image/jpeg"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="pb-2">
                                    <h1 className="text-3xl font-bold text-global">
                                        {authUser.userName}
                                    </h1>
                                    <p className="text-several-light font-medium">{authUser.email}</p>
                                </div>
                            </div>
                            { authUser.profileImageUrl !== null && (
                                <div className="flex items-center justify-center min-w-43 pb-2">
                                    { !loading ? (
                                        <button
                                            onClick={() => handleDeleteImage()}
                                            className="px-6 py-2.5 space-x-3 text-sm bg-primary-container text-white font-semibold rounded-full hover:scale-95 transition-transform flex items-center cursor-pointer"
                                        >
                                            <ImageMinus size={20} />
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
                        <div className="mt-6 max-w-3xl">
                            <p className="text-global/60 leading-relaxed">
                                Bienvenido a tu perfil, gestiona tus historias o introducete en otros mundos, tú decides.
                            </p>
                            <div className="flex items-center space-x-6 mt-6 text-several-light text-sm">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">
                                        {userStories && userStories.meta.totalItems}
                                    </span>
                                    <span>
                                        Historias
                                    </span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-toolbar-bg/50"></div>
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">
                                        0
                                    </span>
                                    <span>
                                        Vistas
                                    </span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-toolbar-bg/50"></div>
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-global font-bold">
                                        0
                                    </span>
                                    <span>
                                        Historias Guardadas
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex space-x-10 border-b border-toolbar-bg/10">
                            <span className="pb-4 text-high-enfasis font-bold border-b-2 border-high-enfasis px-2">
                                Tus Historias
                            </span>
                        </div>
                        {/** Auth User Stories */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 pb-24">
                            {/** Create new Story */}
                            <div
                                onClick={() => navigate("/story/create")}
                                className="aspect-3/4 col-span-1 overflow-hidden rounded-xl border-2 border-dashed border-high-enfasis/30 flex flex-col items-center justify-center space-y-4 hover:bg-high-enfasis/5 hover:border-high-enfasis transition-all cursor-pointer group"
                            >
                                <div className="w-16 h-16 rounded-full bg-high-enfasis/10 flex items-center justify-center text-high-enfasis group-hover:scale-110 transition-transform">
                                    <span><SquarePen size={24} /></span>
                                </div>
                                <span className="text-global font-bold text-lg">
                                    Nueva Historia
                                </span>
                            </div>
                            {/** List of Stories */}
                            { userStories && userStories.data.map(story => (
                                <div
                                    key={story.id}
                                    className="group cursor-pointer"
                                >
                                    <div
                                        key={story.id}
                                        onClick={() => navigate("/story/create")}
                                        className="aspect-3/4 col-span-1 overflow-hidden rounded-xl shadow-2xl relative group-hover:-translate-y-2 transition-transform duration-500"
                                    >
                                        <img
                                            src={`${story.coverUrl !== null ? story.coverUrl : getRandomString(defaultCovers)}`}
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
                                                    <span>
                                                        {story.totalViews}
                                                    </span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span className="text-sm">
                                                        <Star size={20} />
                                                    </span>
                                                    <span>
                                                        {story.totalRating}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 px-2 flex items-center justify-between">
                                        <h3 className="text-global font-bold text-lg line-clamp-1">
                                            {story.title}
                                        </h3>
                                        <p className="text-several-light text-sm mt-1">
                                            {story.totalChapters} Capítulos
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
            ) }
        </main>
    );
}
