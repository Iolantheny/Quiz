import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CategoryButton from '../../Components/CategoryButton';
import { QuestionsData } from './questionsData';
import Back from '../../assets/img/cofnij_x.svg';
import Close from '../../assets/img/zamknij_x.svg';
import techIcon from '../../assets/img/technologia_ikona_.svg';
import startIcon from '../../assets/img/start-brown.png';
import kulturaIcon from '../../assets/img/kultura_ikona.svg';
import motoIcon from '../../assets/img/motoryzacja_ikona.svg';
import progIcon from '../../assets/img/programowanie_ikona.svg';
import historiaIcon from '../../assets/img/historia_ikona.svg';


const Historia = () => {
    const [number, setNumber] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [canAnswer, setCanAnswer] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [dropAnswer, setDropAnswer] = useState([]);
    const [score, setScore] = useState(0);
    const [Over, setOver] = useState(true);


    const StartQuiz = () => {
        setOver(false);
        setScore(0);
        setAnswers(QuestionsData[number].answers);
        setUserAnswers([]);
        setDropAnswer([]);
        setNumber(0);
    }
    const CheckAnswer = (e) => {
        if (!Over) {
            setCanAnswer(true);
            const answer = e.target.innerText;
            const result = e.target;
            const correct = QuestionsData[number].correctAnswer === answer;
            const resultAnswer = correct ? "correct" : "incorrect";
            if (correct) {
                setScore(prev => prev + 1);
                result.parentElement.classList.add(resultAnswer);
            } else {
                result.parentElement.classList.add(resultAnswer);
            }
            
            setUserAnswers((prev) => [...prev, answer]);
            setTimeout(() => {
                result.parentElement.classList.remove(resultAnswer);
                const NextQuestion = number + 1;
                setCanAnswer(false);
                if (NextQuestion === QuestionsData.length) {
                    setOver(true);
                } else {
                    setNumber(NextQuestion);
                    setAnswers(QuestionsData[number + 1].answers);
                }
            }, 1000);
        }
    }
    const Restart = () => {
        setOver(true);
        setScore(0);
        setUserAnswers([]);
        setDropAnswer([]);
        setNumber(0);
    }

    const onDragEnd = result => {
        if (!result.destination)
            return;
        setUserAnswers((prev) => [...prev, result.draggableId]);
        setDropAnswer(prev => [...prev, result.draggableId]);
        const correctDrop = result.draggableId === QuestionsData[number].correctAnswer;
        console.log(QuestionsData[number].answers);
        const resultDropAnswer = correctDrop ? "correctDrop" : "incorrectDrop";
        const el = document.getElementById("drop-place");
        const deleteAnswer = QuestionsData[number].answers.filter(e => e !== result.draggableId);
        setAnswers(deleteAnswer)
        if (correctDrop) {
            setScore(prev => prev + 1);
            el.classList.add(resultDropAnswer);
        } else {
            el.classList.add(resultDropAnswer);
        }

        setTimeout(() => {
            el.classList.remove(resultDropAnswer);
            const NextQuestion = number + 1;
            setDropAnswer([]);
            if (NextQuestion === QuestionsData.length) {
                setOver(true);
            } else {
                setNumber(NextQuestion);
                setAnswers(QuestionsData[number + 1].answers);
            }
        }, 1000);
    };

    return (
        <div className='main-wrapper_historia'>
            <div className='back-close_button'>
                <Link to="/" style={{ textDecoration: 'none' }}><img src={Close} alt='zamknij' /></Link>
                {!Over && (<div>
                    <button onClick={() => setOver(true)}><img src={Back} alt='cofnij' /></button>
                </div>
                )}
            </div>
            <div className="main-header-wrapper">
                <div>
                    <h1>QUIZ</h1>

                    {Over && userAnswers.length !== QuestionsData.length  ? (
                        <div>
                            <p className='main-header-wrapper_category background-grey'>WYBRANA KATEGORIA:</p>
                            <div className='main-header-wrapper_icon'><img src={historiaIcon} alt='icon' /></div>
                            <hr />
                            <p className='main-header-wrapper_name'>HISTORIA</p>

                            <div className='button-start-historia'>
                                <button onClick={StartQuiz}><p>ROZPOCZNIJ</p><img src={startIcon} alt='start' /></button>
                            </div>
                        </div>
                    ) : null}

                    {!Over && QuestionsData[number].type === "select" && (
                        <div className="main-question-wrapper">
                            <div className="main-question-wrapper__type">
                                <div><p className="background-grey">SELECT THE CORRECT ANSWER</p></div>
                                <div className="question-nr-wrapper-historia"> <p>{number + 1} / {QuestionsData.length} </p></div>
                            </div>
                            <p className="main-question-wrapper__question" dangerouslySetInnerHTML={{ __html: QuestionsData[number].question }}></p>
                            <div className={`main-question-wrapper__answer`}>
                                {answers.map((answer, index) => (
                                    <div key={index}>
                                        <button value={answer} onClick={CheckAnswer} disabled={canAnswer} className="historia answerResult">
                                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!Over && QuestionsData[number].type === "DragDrop" && (
                        <div className="main-question-wrapper">
                            <div className="main-question-wrapper__type">
                                <div><p className="background-grey">DRAG AND DROP THE CORRECT ANSWER</p></div>
                                <div className="question-nr-wrapper-historia"> <p>{number + 1} / {QuestionsData.length} </p></div>
                            </div>

                            <DragDropContext onDragEnd={onDragEnd}>
                                <p className="main-question-wrapper__question" dangerouslySetInnerHTML={{ __html: QuestionsData[number].question }}></p>
                                <Droppable droppableId="drop-place">
                                    {(provided) => {
                                        return (
                                            <>
                                                <div className="drop-place" id="drop-place" {...provided.droppableProps} ref={provided.innerRef}>
                                                    <span dangerouslySetInnerHTML={{ __html: dropAnswer }}></span>
                                                </div>
                                                <div className={`main-question-wrapper__answer`}>
                                                    {answers.map((answer, index) => (
                                                        <Draggable key={answer} draggableId={answer} index={index}>
                                                            {(provided) => {
                                                                return (
                                                                    <div className="drag-drop-answers-historia" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                                                                        <span id={index} dangerouslySetInnerHTML={{ __html: answer }} />
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    ))}
                                                </div>
                                                {provided.placeholder}
                                            </>
                                        )
                                    }}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    )}

                </div>
            </div>

            {Over && userAnswers.length === QuestionsData.length  ? (
                <div className="main-end-wrapper">
                    <div className="main-end-wrapper__score">
                        <div className='main-end-wrapper_icon'><img src={historiaIcon} alt='icon' /></div>
                        <hr />
                        <p className='main-header-wrapper_name'>HISTORIA</p>
                        <div className="score-wrapper">
                            <p className="background-grey">TWÓJ WYNIK</p>
                            <div className="question-nr-wrapper-historia"><p>{score}/{QuestionsData.length}</p></div>
                        </div>
                        <div className='button-restart-historia'>
                            <button onClick={Restart}><p>POWTÓRZ QUIZ</p><img src={startIcon} alt='start' /></button>
                        </div>
                    </div>
                    <div className="main-end-category">
                        <p>WYBIERZ INNĄ KATEGORIĘ</p>
                        <div className='nav-end-wrapper'>
                            <div className="end-category-wrapper-historia"><Link to="/Technologia" style={{ textDecoration: 'none' }}><CategoryButton name={'TECHNOLOGIA'} img={techIcon} /></Link></div>
                            <div className='end-category-wrapper-historia'><Link to="/Kultura" style={{ textDecoration: 'none' }}><CategoryButton name={"KULTURA"} img={kulturaIcon} /></Link></div>
                            <div className='end-category-wrapper-historia'><Link to="/Motoryzacja" style={{ textDecoration: 'none' }}><CategoryButton name={"MOTORYZACJA"} img={motoIcon} /></Link></div>
                            <div className='end-category-wrapper-historia'><Link to="/Programowanie" style={{ textDecoration: 'none' }}><CategoryButton name={"PROGRAMOWANIE"} img={progIcon} /></Link></div>
                        </div>
                    </div>
                </div>
            ) : null}

        </div>
    )
}
export default Historia;