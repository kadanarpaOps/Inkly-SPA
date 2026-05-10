import UserProvider from "./ui/context/providers/UserProvider";
import AuthProvider from "./ui/context/providers/AuthProvider";
import StoriesProvider from "./ui/context/providers/StoriesProvider";
import AppLayout from "./ui/layouts/AppLayout";

function App() {
  return (
    <StoriesProvider>
      <UserProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </UserProvider>
    </StoriesProvider>
  );
}

export default App;