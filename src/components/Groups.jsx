import Navigation from "./Navigation.jsx";
import useProtectedPage from "./ProtectedPage.jsx";
import supabase from "../supabaseClient.jsx";
import { useEffect, useState } from "react";

function Groups() {
  const { passed, loading } = useProtectedPage();
  const [ groupName, setGroupName ] = useState();
  const [ organizer, setOrganizer ] = useState(true);
  const [ groups, setGroups ] = useState([]);
  const [ fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    const handleGroups = async() => {
      const {data, error} = await supabase
        .from('group_table')
        .select('id, name');
      setGroups(data);      
    }
    handleGroups();    
  }, [fetchTrigger])
  
  const handleNewGroup = async(e) => {
    e.preventDefault();

    const {data: userData, error: userError} = await supabase.auth.getUser();

    const {data: groupData, error: groupError } = await supabase
      .from('group_table')
      .insert({
          name: groupName,
      }).select('id');
    
    const {data : memberData, error: memberError} = await supabase
      .from('group_members_table')
      .insert({
        user_id: userData.user.id,
        group_id: groupData[0].id,
        organizer: organizer
    });

    setFetchTrigger(fetchTrigger+1);

  }
  
  if (loading||!passed) return null;

  return (
    <div>   
      <Navigation />
      
      <h1>Groups</h1>
      <form id="newGroupForm" onSubmit={handleNewGroup}>
        <label htmlFor="newGroup" name="newGroup"> Create Group: </label>
        <input type="text" id="newGroup" onChange={(e) => setGroupName(e.target.value)} required></input>

        <button type="submit">Submit!</button>
      </form>
      
      <section>
        {groups.map((group) => {
          return (
            <div key={group.id}>{group.id} : {group.name}</div>
          )
        })}
      </section>
      

    </div>
  );
}

export default Groups;