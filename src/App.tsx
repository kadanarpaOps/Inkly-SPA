import UserProvider from "./ui/context/providers/UserProvider";
import AuthProvider from "./ui/context/providers/AuthProvider";
import StoriesProvider from "./ui/context/providers/StoriesProvider";
import AppLayout from "./ui/layouts/AppLayout";
import AlertProvider from "./ui/context/providers/AlertProvider";

function App() {
  return (
    <StoriesProvider>
      <UserProvider>
        <AuthProvider>
          <AlertProvider>
            <AppLayout />
          </AlertProvider>
        </AuthProvider>
      </UserProvider>
    </StoriesProvider>
  );
}

export default App;