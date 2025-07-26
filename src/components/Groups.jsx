import Navigation from "./Navigation.jsx";
import useProtectedPage from "./ProtectedPage.jsx";
import supabase from "../supabaseClient.jsx";
import { useEffect, useState } from "react";

function Groups() {
  const { passed, loading } = useProtectedPage();
  const [ groupName, setGroupName ] = useState();
  const [ organizer, setOrganizer ] = useState(true);
  const [ groups, setGroups ] = useState([]);
  const [ yourGroups, setYourGroups ] = useState([]);
  const [ fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    
    const handleYourGroups = async() => {
      const {data: userData, error: userError} = await supabase.auth.getUser();

      const {data, error} = await supabase
        .from('group_members_table')
        .select('id, group_id, group_table(name)')
        .eq("user_id", userData.user.id);
      setYourGroups(data);
    }
    handleYourGroups();    
  }, [fetchTrigger])

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

  const handleJoinGroup = async(groupId) => {

    const {data: userData, error: userError} = await supabase.auth.getUser();

    const {data, error} = await supabase
      .from('group_members_table')
      .insert({
        user_id: userData.user.id,
        group_id: groupId,
        organizer: organizer
      });

    setFetchTrigger(fetchTrigger+1);

  }
  
 const handleLeaveGroup = async(groupId) => {

    const {data: userData, error: userError} = await supabase.auth.getUser();

    const {data, error} = await supabase
      .from('group_members_table')
      .delete()
      .eq(
        "user_id", userData.user.id
      )
      .eq(
         "group_id", groupId
      );

    setFetchTrigger(fetchTrigger+1);

  }

  if (loading||!passed) return null;

  return (
    <div>   
      <Navigation />
      
      <h1>Your Groups</h1>
      <section>
        {yourGroups.map((group) => {
          return (
            <div key={group.group_id} className="groupList">
              <div>{group.group_id} : {group.group_table.name}</div>
              <button onClick={()=>handleLeaveGroup(group.group_id)}> Leave! </button>
            </div>
          )
        })}
      </section>
        
      <form id="newGroupForm" onSubmit={handleNewGroup}>
        <label htmlFor="newGroup" name="newGroup"> Create Group: </label>
        <input type="text" id="newGroup" onChange={(e) => setGroupName(e.target.value)} required></input>

        <button type="submit">Submit!</button>
      </form>
      
      <h1>All Groups</h1>

      <section>
        {groups.filter((group) => {
          const isUserMember = yourGroups.some(member =>
            member.group_id === group.id);
          return !isUserMember;
        })
          .map((group) => {
          return (
            <div key={group.id} className="groupList">
              <div>{group.id} : {group.name}</div>
              <button onClick={()=>handleJoinGroup(group.id)}> Join! </button>
            </div>
          )
        })}
      </section>
      

    </div>
  );
}

export default Groups;