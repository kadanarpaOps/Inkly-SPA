import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ImageCropperModal from "../../components/images/ImageCropperModal";
import { Pen } from "lucide-react";

export default function Profile() {

    // Use Auth
    const { authUser, updateUserImage, loading } = useAuth();
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

    return (
        <main className="relative h-full">
            {selectedImage && (
                <ImageCropperModal
                    image={selectedImage}
                    onCropComplete={handleImageUpload}
                    onCancel={() => setSelectedImage(null)}
                    loading={loading}
                />
            )}

            { authUser ? (
                <>
                    <div className="relative w-full h-55 overflow-hidden">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU5-3REf2uu_jeWzK0luLHUMfKov2H6h-Z257x-WsyaugO_-a-dT6cY3-SkJ_ikX-zdRl8QJfiKO4WcMLwxC5EWiSDxfx0agW9MyuVLvut02oEewMn7Qypr-IIN7euKLbH8RDvQrw992M2JCZdP-8IOHqoEqT7lMSNjm2XIK6sdsXIN-lwgMC1eo7LQNmGR3pmTaXtbewYW_tSlCUMdwKkhF9yrpRE97u2h2AbbXMCi82t2iXGOgB80rubgjclJlxIx5VW71n2Ka8"
                            alt="Banner de paisaje oscuro montañoso"
                            className="w-full h-full object-cover grayscale opacity-40"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background-global to-transparent z-10">
                            <div className="absolute right-12 top-8 z-20 flex flex-col items-end space-y-3">
                                <div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
                                    Escritor
                                </div>
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
