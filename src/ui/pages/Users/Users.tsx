import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Search, UserRound } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import type { PageResponse } from "../../../core/domain/models/common/PaginationModels";
import type { UserInfo } from "../../../core/domain/models/users/UserModel";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const PAGE_SIZE = 10;

export default function Users() {
	const navigate = useNavigate();
	const { authUser } = useAuth();
	const { loading, error, findPagedUsersResult } = useUsers();
	const [usersPage, setUsersPage] = useState<PageResponse<UserInfo> | null>(null);
	const [page, setPage] = useState(0);
	const [draftUserName, setDraftUserName] = useState("");
	const [draftEmail, setDraftEmail] = useState("");
	const [userNameFilter, setUserNameFilter] = useState("");
	const [emailFilter, setEmailFilter] = useState("");
	const isAdmin = authUser?.role.roleName === "INKLY_ADMIN";
	const [enableFilter, setEnableFilter] = useState(true);

	const loadUsers = useCallback(async () => {
		const response = await findPagedUsersResult(
			page,
			PAGE_SIZE,
			userNameFilter.trim(),
			emailFilter.trim(),
			enableFilter,
		);
		setUsersPage(response);
	}, [emailFilter, enableFilter, findPagedUsersResult, page, userNameFilter]);

	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	useEffect(() => {
		if (!isAdmin) {
			setEnableFilter(true);
		}
	}, [isAdmin]);

	const totalPages = usersPage?.meta.totalPages ?? 0;
	const currentPage = usersPage?.meta.numberPage ?? page;
	const displayPage = currentPage + 1;
	const displayTotalPages = totalPages;
	const totalItems = usersPage?.meta.totalItems ?? 0;
	const isEmpty = !loading && (!usersPage || usersPage.data.length === 0);

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPage(0);
		setUserNameFilter(draftUserName);
		setEmailFilter(draftEmail);
	};

	const handleReset = () => {
		setDraftUserName("");
		setDraftEmail("");
		setUserNameFilter("");
		setEmailFilter("");
		setEnableFilter(true);
		setPage(0);
	};

	const goToPage = (targetPage: number) => {
		if (targetPage < 0) return;
		if (totalPages > 0 && targetPage > totalPages - 1) return;
		setPage(targetPage);
	};

	return (
		<main className="relative min-h-full px-6 py-8 md:px-10 lg:px-12">
			<section className="max-w-7xl mx-auto space-y-8">
				<header className="rounded-[2rem] border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-6 md:p-8 shadow-2xl overflow-hidden relative">
					<div className="absolute inset-0 bg-linear-to-br from-high-enfasis/5 via-transparent to-transparent pointer-events-none" />
					<div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-2xl">
							<h1 className="text-3xl md:text-5xl font-bold text-global tracking-tight">
								Usuarios de la aplicación
							</h1>
							<p className="mt-4 text-several-light leading-relaxed max-w-xl">
								Busca por nombre o correo y entra al detalle de cada perfil. Si eres administrador, también puedes alternar entre usuarios habilitados y deshabilitados.
							</p>
							<div className="mt-5 flex flex-wrap gap-3 text-sm text-several-light">
								<div className="rounded-full border border-toolbar-bg/10 bg-background-global/70 px-4 py-2">
									{totalItems} usuarios encontrados
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-toolbar-bg/10 bg-background-global/60 p-4 md:p-5 shadow-xl w-full lg:max-w-xl">
							<form onSubmit={handleSearch} className="space-y-4">
								<div className="flex items-center gap-2 rounded-2xl border border-toolbar-bg/10 bg-background-global/80 px-4 py-3">
									<Search size={18} className="text-several-light shrink-0" />
									<input
										type="text"
										value={draftUserName}
										onChange={(event) => setDraftUserName(event.target.value)}
										placeholder="Buscar por userName"
										className="w-full bg-transparent text-global placeholder:text-several-light/60 outline-none"
									/>
								</div>
								<div className="flex items-center gap-2 rounded-2xl border border-toolbar-bg/10 bg-background-global/80 px-4 py-3">
									<Search size={18} className="text-several-light shrink-0" />
									<input
										type="text"
										value={draftEmail}
										onChange={(event) => setDraftEmail(event.target.value)}
										placeholder="Buscar por email"
										className="w-full bg-transparent text-global placeholder:text-several-light/60 outline-none"
									/>
								</div>
								<div className="flex flex-wrap items-center gap-3">
									<button
										type="submit"
										className="px-4 py-2.5 rounded-full bg-primary-container text-white font-semibold hover:scale-95 transition-transform"
									>
										Filtrar
									</button>
									<button
										type="button"
										onClick={handleReset}
										className="px-4 py-2.5 rounded-full border border-toolbar-bg/10 text-global font-semibold hover:bg-toolbar-bg/5 transition-colors"
									>
										Limpiar
									</button>
								</div>
							</form>

							{isAdmin && (
								<div className="mt-5 flex items-center gap-3">
									<button
										type="button"
										onClick={() => {
											setEnableFilter(true);
											setPage(0);
										}}
										className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${enableFilter ? "bg-high-enfasis text-white shadow-lg" : "border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5"}`}
									>
										Habilitados
									</button>
									<button
										type="button"
										onClick={() => {
											setEnableFilter(false);
											setPage(0);
										}}
										className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${!enableFilter ? "bg-high-enfasis text-white shadow-lg" : "border border-toolbar-bg/10 text-global hover:bg-toolbar-bg/5"}`}
									>
										Deshabilitados
									</button>
								</div>
							)}
						</div>
					</div>
				</header>

				{error && (
					<div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-red-300">
						{error}
					</div>
				)}

				<section className="rounded-[2rem] border border-toolbar-bg/10 bg-background-global/80 backdrop-blur-md p-4 md:p-6 shadow-2xl">
					<div className="flex items-center justify-between gap-4 flex-wrap mb-5">
						<div>
							<h2 className="text-xl font-bold text-global">Listado de usuarios</h2>
							<p className="text-several-light text-sm mt-1">
									Página {displayPage} de {displayTotalPages}
							</p>
						</div>
						<div className="rounded-full border border-toolbar-bg/10 bg-background-global/70 px-4 py-2 text-sm text-several-light">
							{loading ? "Cargando usuarios..." : `${usersPage?.data.length ?? 0} usuarios visibles`}
						</div>
					</div>

					{loading ? (
						<div className="flex items-center justify-center py-20">
							<div className="loading-button" />
						</div>
					) : isEmpty ? (
						<div className="rounded-3xl border border-dashed border-toolbar-bg/15 bg-background-global/50 p-10 text-center">
							<p className="text-global font-semibold text-lg">No hay usuarios para mostrar</p>
							<p className="text-several-light mt-2">Prueba con otro nombre, correo o cambia el filtro de habilitación.</p>
						</div>
					) : (
						<div className="space-y-4">
							{usersPage?.data.map((user) => (
								<article
									key={user.userId}
									className="group cursor-pointer rounded-3xl border border-toolbar-bg/10 bg-background-global/60 p-4 md:p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
								>
									<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
										<div className="flex items-center gap-4 min-w-0">
											<div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high flex items-center justify-center shrink-0 border border-toolbar-bg/10">
												{user.profileImageUrl ? (
													<img src={user.profileImageUrl} alt={`Perfil de ${user.userName}`} className="w-full h-full object-cover" />
												) : (
													<UserRound size={24} className="text-several-light" />
												)}
											</div>
											<div className="min-w-0">
												<h3 className="text-lg font-bold text-global truncate">{user.userName}</h3>
												<p className="mt-1 text-several-light text-sm break-all">{user.email}</p>
											</div>
										</div>
										<button
											type="button"
											onClick={() => navigate(`/user/${user.userId}`)}
											className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-container px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-95 active:scale-95"
										>
											Ver usuario
											<ArrowRight size={16} />
										</button>
									</div>
								</article>
							))}
						</div>
					)}

					{usersPage && usersPage.data.length > 0 && totalPages > 1 && (
						<div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
							<button
								onClick={() => goToPage(currentPage - 1)}
								className={`w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/10 text-on-surface-variant ${currentPage !== 0 ? "hover:bg-surface-variant/20 transition-colors cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
								disabled={currentPage === 0}
							>
								<ChevronLeft size={24} />
							</button>
							{currentPage !== 0 && (
								<button
									onClick={() => goToPage(currentPage - 1)}
									className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-variant/20 text-on-surface transition-colors cursor-pointer"
								>
									{displayPage - 1}
								</button>
							)}
							<button
								disabled
								className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-on-primary font-bold cursor-default"
							>
								{displayPage}
							</button>
							{currentPage < totalPages - 1 && (
								<button
									onClick={() => goToPage(currentPage + 1)}
									className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-variant/20 text-on-surface transition-colors cursor-pointer"
								>
									{currentPage + 2}
								</button>
							)}
							<button
								onClick={() => goToPage(currentPage + 1)}
								className={`w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/10 text-on-surface-variant ${currentPage < totalPages - 1 ? "hover:bg-surface-variant/20 transition-colors cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
								disabled={currentPage >= totalPages - 1}
							>
								<ChevronRight size={24} />
							</button>
						</div>
					)}
				</section>
			</section>
		</main>
	);
}