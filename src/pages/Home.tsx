import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import '../styles/auth.scss';
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    };

    history.push("/rooms/new")
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Question and answers image"  />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Answer questions from your followers in a live session</p>
      </aside>
      <main>
        <div className="main-content">
          <img  src={logoImg} alt="Logo image" />
          <button onClick={ handleCreateRoom } className="create-room">
            <img src={googleIconImg} alt="Google Logo" />
            Create a new room with your Google account
          </button>
          <div className="separator">
            or enter an existing room
          </div>
          <form>
            <input type="text" placeholder="Type here the room code"/>
            <Button type="submit">Join an existing room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}