import React, { useState, useEffect } from "react";
import { auth, provider, onAuthStateChanged } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSubmit = async (name, language, code) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, language, code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.warn(data);
      if (response.ok) {
        alert("Data saved successfully");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const calculateDaysPassed = (date) => {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysPassed < 1) {
      const hoursPassed = Math.floor(timeDifference / (1000 * 3600));
      return hoursPassed + " hours";
    }

    return daysPassed + " days";
  };

  return (
    <>
      {user ? (
        <div>
          <h3>Welcome {user.displayName}</h3>
          <p>{user.email}</p>
          <img src={user.photoURL} alt="dp" referrerPolicy="no-referrer"></img>
          <Navbar />

          <UserForm onSubmit={handleOnSubmit} />

          <UserTable
            users={users}
            handleCopyCode={handleCopyCode}
            calculateDaysPassed={calculateDaysPassed}
          />
        </div>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      )}
    </>
  );
}

export default App;
