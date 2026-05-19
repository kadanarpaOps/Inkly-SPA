import { Bell, LogOut, PanelTopClose, Search } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { useStories } from "../../hooks/useStories"
import { useState, useEffect, useRef, useCallback } from "react"
import type { BasicInfo } from "../../../core/domain/models/stories/StoryModel"

type NavbarProps = {
    isSidebarOpen: boolean | null,
    toggleSidebar: () => void
}

const Navbar = ({ isSidebarOpen, toggleSidebar }: NavbarProps) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();
  const { loadPublishedStories } = useStories();

  // Search story state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BasicInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Determine if we should show search results dropdown
  const isInSearchPage = location.pathname.includes("/library") || location.pathname.includes("/explore");

  // Debounce function for search
  const debounceSearch = useCallback((query: string) => {
    if (isInSearchPage) return; // Don't show dropdown in search pages

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate debounce with timeout
    const timer = setTimeout(async () => {
      try {
        const response = await loadPublishedStories({
          offset: 0,
          limit: 3,
          title: query,
        });
        
        setSearchResults(
          response.data.map((story) => ({
            id: story.id,
            name: story.title,
          }))
        );
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [loadPublishedStories, isInSearchPage]);

  useEffect(() => {
    const unsubscribe = debounceSearch(searchQuery);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [searchQuery, debounceSearch]);

  // Handle story click
  const handleStoryClick = (storyId: string) => {
    if (isInSearchPage) {
      // Fill the search form with the title if in search page
      const story = searchResults.find((s) => s.id === storyId);
      if (story && searchInputRef.current) {
        setSearchQuery(story.name);
        setShowSearchResults(false);
      }
    } else {
      // Navigate to story details
      navigate(`/story/${storyId}`);
      setSearchQuery("");
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`${isSidebarOpen !== null ? 'sticky' : 'fixed'} top-0 z-40 w-full bg-background-global/80 backdrop-blur-sm pl-8 pr-12 py-4`}>
        <div className={`grid grid-cols-3 items-center
            ${location.pathname.includes("/write") && !isSidebarOpen && 'transition-opacity duration-500 opacity-0 hover:opacity-100'}
        `}>
            <div className="flex items-center space-x-4">
                {isSidebarOpen !== null && (
                    <>
                        <button
                            className="p-2 hover:bg-global/10 rounded-lg transition-colors cursor-pointer"
                            onClick={toggleSidebar}
                        >
                            <PanelTopClose
                                size={24}
                                className={`transition-transform duration-300 transform
                                    ${isSidebarOpen ? "rotate-270" : "rotate-90"}`}
                            />
                        </button>
                        <span className="text-global font-semibold text-lg hidden md:block">
                        </span>
                    </>
                )}
            </div>
            <div className="flex justify-center items-center">
                <div className="flex items-center relative group">
                    <button
                      className="text-global hover:text-high-enfasis absolute top-2.2 left-3 opacity-50"
                      type="button"
                    >
                        <Search size={18} />
                    </button>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                          if (searchResults.length > 0 && !isInSearchPage) {
                            setShowSearchResults(true);
                          }
                        }}
                        className="bg-search-bg border-none rounded-full py-2 pl-10 pr-6 text-sm text-global focus:ring-2 focus:ring-high-enfasis/50 w-64 transition-all focus:outline-none"
                        placeholder={isInSearchPage ? "Filtrar historias..." : "Buscar Historias..."}
                    />

                    {/* Search Results Dropdown */}
                    {showSearchResults && !isInSearchPage && (
                      <div
                        ref={searchDropdownRef}
                        className="absolute top-full mt-2 left-0 right-0 bg-surface-bright/50 shadow-lg border border-toolbar-bg/10 rounded-xl z-50 overflow-hidden w-96"
                      >
                        {!isSearching ? (
                          searchResults.length > 0 ? (
                            searchResults.map((story) => (
                              <div
                                key={story.id}
                                onClick={() => handleStoryClick(story.id)}
                                className="px-4 py-2 hover:bg-high-enfasis/10 cursor-pointer text-md transition-colors text-global line-clamp-1"
                              >
                                {story.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-several-light text-sm text-center">
                              No se encontraron historias
                            </div>
                          )
                        ) : (
                          <div className="px-4 py-3 flex items-center justify-center">
                            <div className="loading-button" />
                          </div>
                        )}
                      </div>
                    )}
                </div>
            </div>
            <div className="flex justify-end">
                {authUser && (
                    <>
                        <Bell fill="currentColor" size={26} />
                        <LogOut
                            size={26}
                            className="ml-4 md:ml-8 cursor-pointer hover:text-high-enfasis"
                            onClick={() => {logout(); navigate("/auth")}}
                        />
                    </>
                )}
            </div>
        </div>
    </header>
  )
}

export default Navbar
