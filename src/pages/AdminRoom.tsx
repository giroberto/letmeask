import React, { FormEvent, useEffect, useState } from "react";
import logoImg from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"
import { RoomCode } from "../components/RoomCode" 
import { Question } from "../components/Question" 
import { Button } from "../components/Button"
import '../styles/room.scss'
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const {user} = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('')
  const {questions, title } = useRoom(roomId);

  async function handleMarkQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  async function handleDeleteQuestion(questionId: string){
    if (window.confirm('Are you sure you want to delete this question?')){
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    })
    history.push("/")
  }

  async function handleSendNewQuestion(event: FormEvent){
    event.preventDefault()

    if( newQuestion.trim() === "") return;

    if(!user){
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
         name:user?.name,
         avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')

  }
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Close room</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>React {title}</h1>
          { questions.length > 0 && <span>{questions.length} question(s)</span> }
          
        </div>

        <div className="question-list">
          {questions.map(question => (
            <Question 
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered &&(
                <>
                  <button type="button" onClick={() => handleMarkQuestionAsAnswered(question.id)}>
                    <img src={checkImg} alt="Mark as answered" />
                  </button>
                  <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                    <img src={answerImg} alt="Highlight question" />
                  </button>
                </>
              )}
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Delete question" />
              </button>
            </Question>))
          }
        </div>
      </main>
    </div>
  );
}