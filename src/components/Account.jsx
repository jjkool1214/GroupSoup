import Navigation from "./Navigation.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useProtectedPage from "./ProtectedPage.jsx";
import supabase from "../supabaseClient.jsx";

function Account() {
  const { passed, loading } = useProtectedPage();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [tagLoading, setTagLoading] = useState(true);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const handleEmail = async() => {
        const {data, error} = await supabase.auth.getUser();
        setEmail(data.user.email);
    }
    handleEmail();
  }, [])



  useEffect(() => {
    const handleTags = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("User fetch error:", userError);
        setTags([]);
        setTagLoading(false);
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("user_tag_table")
        .select("tag, tag_table(name)")
        .eq("user", userId); 

      if (error) {
        console.error("Tag fetch error:", error);
        setTags([]);
      } else {
        setTags(data);
        
      }

      setTagLoading(false);
    };

    const storage = JSON.parse(localStorage.getItem("supabaseSession"));
    const handleUser = async() => {
      console.log(storage.user)
      const {data, error} = await supabase.from("user_table").select('*').eq("user", storage.user.id);
      if(error) {
        console.error("User fetch error:", error);
      } else {
        console.log(data);
        setUserName(data[0]?.username);
      }

    }

    if (passed && !loading) {
      handleTags();
      handleUser();
      setEmail(storage.user.email);
    }
  }, [passed, loading]);

  if (loading || !passed) return null;

  return (
    <div>
      <Navigation />
      <h1>Your Profile </h1>
      <h1>~~~~~~~~~~~~~~~~~~~~~~~~~</h1>
      <p>Username: {userName}</p>
      <p>Email: {email}</p>

      {tagLoading ? (
        <p>Loading tags...</p>
      ) : (
        <ul>
        <p>Tags:</p>

          {tags.map((tag, index) => (
            <li key={index}>{tag.tag_table.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Account;