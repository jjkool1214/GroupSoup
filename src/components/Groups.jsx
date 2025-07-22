import Navigation from "./Navigation.jsx";
import useProtectedPage from "./ProtectedPage.jsx";

function Groups() {
  const { passed, loading } = useProtectedPage();

  if (loading||!passed) return null;

  return (
    <div>   
      <Navigation />
      

      Groups
    </div>
  );
}

export default Groups;