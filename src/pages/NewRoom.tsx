import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import '../styles/auth.scss';
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState('')

  function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = roomRef.push({
      title: newRoom,
      authorId: user?.id
    })
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
          <img src={logoImg} alt="Logo image" />
          <h1>{user?.name}</h1>
          <h2>Create a new room</h2>
          <form onSubmit={ handleCreateRoom }>
            <input onChange={event => setNewRoom(event.target.value)} value={newRoom} type="text" placeholder="Room code"/>
            <Button type="submit">Create a new room</Button>
          </form>
          <p>Want to join an existing room? <Link to="/">Click here</Link></p>
        </div>
      </main>
    </div>
  );
}