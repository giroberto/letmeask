import React, { FormEvent, useState } from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import '../styles/auth.scss';
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    };

    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()){
      alert('Room does not exist');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed')
      return;
    }

    history.push(`rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Type here the room code" onChange={event => setRoomCode(event.target.value)} value={roomCode} />
            <Button type="submit">Join an existing room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}