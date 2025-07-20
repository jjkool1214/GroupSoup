import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";



function useProtectedPage() {
    const navigate = useNavigate();
    const [passed, setPassed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const checkSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();    
            if (!user) {
                setPassed(false);
                setLoading(false);
                navigate('/');
                
            } else {
                setPassed(true);
                setLoading(false);
            }

        }
        checkSession();
    }, [navigate])
    return { passed, loading };
}

 export default useProtectedPage;

    

