import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient.jsx";

export function UserInfo() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    // Fix: selectedTags is an array of tag IDs, not objects
    const selectedTagIds = location.state?.selectedTags || [];

    const checkEmail = (email) => {
        return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleClick = async () => {
        setSubmitted(true);

        if (!username || !password || !checkEmail(email)) {
            setIsValid(false);
            return;
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            console.error("Signup failed:", signUpError.message);
            return;
        }

        const userId = signUpData.user?.id;
        if (!userId) {
            console.error("User ID not returned. Email confirmation may be required.");
            return;
        }

        const { error: profileError } = await supabase.from("user_table").insert({
            user: userId,
            type: "user",
            username: username,
        });

        if (profileError) {
            console.error("Profile creation failed:", profileError.message);
            return;
        }

        // Fix: Map selectedTagIds directly since they're already tag IDs
        const userTagData = selectedTagIds.map((tagId) => ({
            user: userId,
            tag: tagId,
        }));

        console.log("User tag data to insert:", userTagData); // Debug log

        const { error: tagError } = await supabase.from("user_tag_table").insert(userTagData);

        if (tagError) {
            console.error("Tag insert failed:", tagError.message);
            return;
        }

        // Store session if available (depends on your Supabase email confirmation settings)
        if (signUpData.session) {
            localStorage.setItem("supabaseSession", JSON.stringify(signUpData.session));
        }

        navigate('../account');
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                <div>
                    <label htmlFor="username" className="block font-semibold mb-1">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={handleClick}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>

                {!isValid && submitted && (
                    <p className="text-red-500 font-semibold text-center">
                        Please fill all fields correctly.
                    </p>
                )}
            </div>
        </div>
    );
}