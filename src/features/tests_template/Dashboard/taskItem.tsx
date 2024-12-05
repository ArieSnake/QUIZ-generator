import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ISelectedAnswer, IResult, IQuiz } from '../types';
import { useGetTestsQuery, useSubmitQuizResultsMutation } from '../test.api';

export const TaskItem = () => {
    const { quizId } = useParams<{ quizId: string }>()
    const { data: quizzes } = useGetTestsQuery()
    const [selectedAnswers, setSelectedAnswers] = useState<ISelectedAnswer>({})
    const [submitQuizResult] = useSubmitQuizResultsMutation()
    const navigate = useNavigate()



    const [questions, setQuestions] = useState<IQuiz['questions']>(
        quizzes?.find((quiz) => quiz.id.toString() === quizId)?.questions || []
    )

    const handleOptionSelect = (questionId: string, option: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }))
    }

    const handleSkipQuestion = (index: number) => {
        setQuestions((prevQuestions) => {
            const skippedQuestion = prevQuestions[index]
            const leftedQuestions = prevQuestions.filter((_, i) => i !== index)
            return [...leftedQuestions, skippedQuestion]
        })
    }




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let correctCount = 0
        let wrongCount = 0
        const resultData: IResult = {
            username: sessionStorage.getItem('username'),
            quizId: quizId || '',
            quizName: quizzes?.find((quiz) => quiz.id.toString() === quizId)?.name || '',
            selectedAnswers: questions.map((question) => {
                const selectedAnswer = selectedAnswers[question.id]
                const isCorrect = selectedAnswer === question.correct
                if (isCorrect) correctCount++
                else wrongCount++
                return {
                    questionId: question.id,
                    questionText: question.text,
                    selectedAnswer,
                    correctAnswer: question.correct,
                    explanation: question.explanation,
                }
            }),
            correctAnswers: correctCount,
            wrongAnswers: wrongCount,
        }

        try {
            await submitQuizResult(resultData).unwrap()
            sessionStorage.setItem('quizResult', JSON.stringify(resultData))
            navigate(`/results/${quizId}`)
        } catch (err) {
            console.error('Error submitting quiz:', err)
        }
    }

    return (
        <div className="min-h-screen py-12 px-6 bg-[#f3ede3]">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <h1 className="text-3xl font-semibold text-[#302824] text-center mb-8">
                    {quizzes?.find((quiz) => quiz.id.toString() === quizId)?.name}
                </h1>
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={question.id} className="mb-6 border-b pb-4">
                            <h2 className="text-xl font-semibold text-[#6C3530] mb-4">
                                {index + 1}. {question.text}
                            </h2>
                            <ul className="space-y-3">
                                {question.options.map((option, optionIndex) => (
                                    <li
                                        key={optionIndex}
                                        onClick={() => handleOptionSelect(question.id, option)}
                                        className={`cursor-pointer block px-4 py-2 rounded-lg border ${selectedAnswers[question.id] === option
                                                ? 'bg-[#A6BB7B] border-[#A6BB7B] text-[#302824]'
                                                : 'bg-[#FFFFFF] border-[#D3D3D3] text-[#534B4F] hover:bg-[#A6BB7B] hover:border-[#A6BB7B]'
                                            } text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 ease-in-out`}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => handleSkipQuestion(index)}
                                    className="px-4 py-2 bg-[#6c3530] text-white rounded-lg shadow-md hover:bg-[#302824] transition-all">
                                    Skip
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#6C3530] text-[#FFFFFF] font-semibold rounded-full shadow-md hover:bg-[#302824] transition-all"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}















