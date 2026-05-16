import UserProvider from "./ui/context/providers/UserProvider";
import AuthProvider from "./ui/context/providers/AuthProvider";
import StoriesProvider from "./ui/context/providers/StoriesProvider";
import AppLayout from "./ui/layouts/AppLayout";
import AlertProvider from "./ui/context/providers/AlertProvider";
import ChaptersProvider from "./ui/context/providers/ChaptersProvider";

function App() {
  return (
    <AlertProvider>
      <StoriesProvider>
        <ChaptersProvider>
          <UserProvider>
            <AuthProvider>
              <AppLayout />
            </AuthProvider>
          </UserProvider>
        </ChaptersProvider>
      </StoriesProvider>
    </AlertProvider>
  );
}

export default App;