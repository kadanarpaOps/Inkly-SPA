import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BadgeInfo, BookOpen, Calendar, CheckCircle2, Clock3, Eye, Mail, ShieldCheck, Star, UserRound, XCircle } from "lucide-react";
import { getUserByIdRequest } from "../../../infrastructure/api/requests/users.request";
import type { UserInfo as UserInfoModel } from "../../../core/domain/models/users/UserModel";
import { useStories } from "../../hooks/useStories";
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { StoryInfo } from "../../../core/domain/models/stories/StoryModel";
import { getRandomCover } from "../utils/covers.util";

const formatDate = (dateValue: string | Date) => {
	const date = new Date(dateValue);
	return new Intl.DateTimeFormat("es-ES", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
};

export default function UserInfo() {
	const navigate = useNavigate();
	const { userId } = useParams<{ userId: string }>();
	const { loadPublishedStories } = useStories();
	const [user, setUser] = useState<UserInfoModel | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [userStories, setUserStories] = useState<PageResponse<StoryInfo> | null>(null);
	const [storiesLoading, setStoriesLoading] = useState(true);
	const [storiesError, setStoriesError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadUser = async () => {
			if (!userId) {
				setError("No se encontró el usuario solicitado.");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				setError(null);
				const response = await getUserByIdRequest(userId);

				if (!isMounted) return;
				setUser(response);
			} catch {
				if (!isMounted) return;
				setError("No pudimos cargar la información del usuario.");
				setUser(null);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadUser();

		return () => {
			isMounted = false;
		};
	}, [userId]);

	useEffect(() => {
		let isMounted = true;

		const loadUserStories = async () => {
			if (!userId) {
				if (isMounted) {
					setStoriesError("No se encontró el usuario solicitado.");
					setStoriesLoading(false);
				}
				return;
			}

			try {
				setStoriesLoading(true);
				setStoriesError(null);
				const response = await loadPublishedStories({ offset: 1, limit: 8, newestFirst: true, userId });

				if (!isMounted) return;
				setUserStories(response);
			} catch {
				if (!isMounted) return;
				setStoriesError("No pudimos cargar las historias de este usuario.");
				setUserStories(null);
			} finally {
				if (isMounted) {
					setStoriesLoading(false);
				}
			}
		};

		loadUserStories();

		return () => {
			isMounted = false;
		};
	}, [userId, loadPublishedStories]);

	if (loading) {
		return (
			<main className="relative h-full flex items-center justify-center">
				<div className="loading-button" />
			</main>
		);
	}

	if (error || !user) {
		return (
			<main className="relative h-full px-6 py-16 flex items-center justify-center">
				<section className="max-w-xl w-full rounded-3xl border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-8 text-center shadow-2xl">
					<div className="mx-auto w-16 h-16 rounded-full bg-high-enfasis/10 text-high-enfasis flex items-center justify-center mb-5">
						<BadgeInfo size={28} />
					</div>
					<h1 className="text-3xl font-bold text-global mb-3">
						Información no disponible
					</h1>
					<p className="text-several-light leading-relaxed mb-8">
						{error ?? "No se encontró información para este usuario."}
					</p>
					<button
						onClick={() => navigate(-1)}
						className="px-6 py-3 rounded-full bg-primary-container text-white font-semibold hover:scale-95 transition-transform"
					>
						Volver
					</button>
				</section>
			</main>
		);
	}

	const profileImage = user.profileImageUrl
		? user.profileImageUrl
		: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.userName)}&background=dcd7ba&color=16161d`;
	const userStoriesCount = userStories?.meta?.totalItems ?? 0;

	return (
		<main className="relative h-full pb-16">
			<div className="relative w-full h-55 overflow-hidden">
				<img
					src="https://images.pexels.com/photos/29253139/pexels-photo-29253139.jpeg"
					alt="Banner de paisaje oscuro montañoso"
					className="w-full h-full object-cover grayscale opacity-40"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-background-global to-transparent z-10">
					<div className="absolute right-12 top-8 z-20 flex flex-col items-end space-y-3">
						<div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
							{user.role.roleName.replaceAll("_", " ")}
						</div>
						<div className="px-3 py-1 border border-high-enfasis rounded-full text-[10px] font-bold text-high-enfasis uppercase tracking-wider bg-high-enfasis/5">
							{user.enable ? "Cuenta activa" : "Cuenta deshabilitada"}
						</div>
					</div>
				</div>
			</div>

			<div className="px-12 -mt-12 relative z-20">
				<div className="flex items-end justify-between gap-8">
					<div className="flex items-end space-x-6">
						<div className="group relative w-32 h-32 rounded-full border-4 border-background-global overflow-hidden bg-background-global shadow-2xl">
							<img
								src={profileImage}
								alt="Imagen de perfil"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="pb-2">
							<h1 className="text-3xl font-bold text-global">
								{user.userName}
							</h1>
							<p className="text-several-light font-medium flex items-center gap-2">
								<Mail size={16} />
								{user.email}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3 pb-2 flex-wrap justify-end">
						<div className="px-4 py-2 rounded-full border border-toolbar-bg/10 bg-background-global/70 text-several-light text-sm font-medium flex items-center gap-2">
							{user.emailVerified ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
							Email {user.emailVerified ? "verificado" : "sin verificar"}
						</div>
						<div className="px-4 py-2 rounded-full border border-toolbar-bg/10 bg-background-global/70 text-several-light text-sm font-medium flex items-center gap-2">
							{user.passwordVerified ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
							Contraseña {user.passwordVerified ? "verificada" : "sin verificar"}
						</div>
					</div>
				</div>

				<div className="mt-6 max-w-3xl">
					<p className="text-global/60 leading-relaxed">
						Información general del usuario dentro de Inkly.
					</p>
					<div className="flex items-center space-x-6 mt-6 text-several-light text-sm flex-wrap gap-y-3">
						<div className="flex items-center space-x-1.5">
							<span className="text-global font-bold">
								{user.userId}
							</span>
							<span>
								ID de usuario
							</span>
						</div>
						<div className="w-1 h-1 rounded-full bg-toolbar-bg/50"></div>
						<div className="flex items-center space-x-1.5">
							<span className="text-global font-bold">
								{user.enable ? "Activo" : "Inactivo"}
							</span>
							<span>
								Estado
							</span>
						</div>
					</div>
				</div>

				<div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
					<section className="lg:col-span-2 rounded-3xl border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-6 shadow-2xl">
						<h2 className="text-xl font-bold text-global mb-6 flex items-center gap-2">
							<UserRound size={20} />
							Información del usuario
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<p className="text-several-light text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
									<BadgeInfo size={14} />
									Nombre de usuario
								</p>
								<p className="text-global font-semibold break-words">
									{user.userName}
								</p>
							</div>
							<div className="rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<p className="text-several-light text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
									<Mail size={14} />
									Correo electrónico
								</p>
								<p className="text-global font-semibold break-words">
									{user.email}
								</p>
							</div>
							<div className="rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<p className="text-several-light text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
									<ShieldCheck size={14} />
									Rol
								</p>
								<p className="text-global font-semibold break-words">
									{user.role.roleName.replaceAll("_", " ")}
								</p>
							</div>
							<div className="rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<p className="text-several-light text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
									<Calendar size={14} />
									Cuenta creada
								</p>
								<p className="text-global font-semibold break-words">
									{formatDate(user.createdAt)}
								</p>
							</div>
							<div className="rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4 sm:col-span-2">
								<p className="text-several-light text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
									<Clock3 size={14} />
									Última actualización
								</p>
								<p className="text-global font-semibold break-words">
									{formatDate(user.updatedAt)}
								</p>
							</div>
						</div>
					</section>

					<aside className="rounded-3xl border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-6 shadow-2xl h-fit">
						<h3 className="text-lg font-bold text-global mb-6">
							Estado de la cuenta
						</h3>
						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<span className="text-several-light text-sm">Email verificado</span>
								<span className={`text-sm font-semibold ${user.emailVerified ? "text-green-500" : "text-red-500"}`}>
									{user.emailVerified ? "Sí" : "No"}
								</span>
							</div>
							<div className="flex items-center justify-between rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<span className="text-several-light text-sm">Password verificado</span>
								<span className={`text-sm font-semibold ${user.passwordVerified ? "text-green-500" : "text-red-500"}`}>
									{user.passwordVerified ? "Sí" : "No"}
								</span>
							</div>
							<div className="flex items-center justify-between rounded-2xl border border-toolbar-bg/10 bg-background-global/60 p-4">
								<span className="text-several-light text-sm">Cuenta habilitada</span>
								<span className={`text-sm font-semibold ${user.enable ? "text-green-500" : "text-red-500"}`}>
									{user.enable ? "Sí" : "No"}
								</span>
							</div>
						</div>
					</aside>
				</div>

				<section className="mt-12 rounded-3xl border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-6 shadow-2xl">
					<div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
						<div>
							<h2 className="text-xl font-bold text-global flex items-center gap-2">
								<BookOpen size={20} />
								Historias publicadas
							</h2>
							<p className="text-several-light text-sm mt-1">
								{userStoriesCount} historia{userStoriesCount === 1 ? "" : "s"} disponible{userStoriesCount === 1 ? "" : "s"} para abrir su detalle.
							</p>
						</div>
					</div>

					{storiesLoading ? (
						<div className="flex items-center justify-center py-16">
							<div className="loading-button" />
						</div>
					) : storiesError || !userStories || (userStories?.data?.length ?? 0) === 0 ? (
						<div className="rounded-2xl border border-dashed border-toolbar-bg/15 bg-background-global/50 p-8 text-center">
							<p className="text-global font-semibold mb-2">No hay historias publicadas</p>
							<p className="text-several-light text-sm">
								{storiesError ?? "Este usuario todavía no tiene historias visibles para explorar."}
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{userStories.data.map((story) => (
								<article
									key={story.id}
									onClick={() => navigate(`/explore/story/${story.id}`)}
									className="group cursor-pointer overflow-hidden rounded-2xl border border-toolbar-bg/10 bg-background-global/60 shadow-xl transition-transform hover:-translate-y-1"
								>
									<div className="relative aspect-[3/4] overflow-hidden">
										<img
											src={story.coverUrl || getRandomCover()}
											alt="Portada de historia"
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
										<div className="absolute top-3 right-3 rounded-full bg-background-global/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
											{story.genre.name}
										</div>
										<div className="absolute inset-x-0 bottom-0 p-4 text-white">
											<h3 className="line-clamp-1 text-lg font-bold">{story.title}</h3>
											<p className="mt-1 line-clamp-2 text-xs text-white/75">
												{story.description}
											</p>
										</div>
									</div>

									<div className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
										<div className="flex items-center gap-3 text-several-light">
											<span className="flex items-center gap-1">
												<Eye size={16} />
												{story.totalViews}
											</span>
											<span className="flex items-center gap-1">
												<Star size={16} />
												{story.totalRating}
											</span>
										</div>
										<span className="text-global font-semibold">
											{story.totalChapters} capítulos
										</span>
									</div>
								</article>
							))}
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
