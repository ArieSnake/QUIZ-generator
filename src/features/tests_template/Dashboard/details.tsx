import { useNavigate, useParams } from 'react-router-dom'
import { IResult } from '../types' 
import { useGetQuizResultsQuery } from '../test.api'

const Details = () => {
    const { quizId } = useParams<{ quizId: string }>()
    const navigate = useNavigate()

    if (!quizId) {
        console.error('Quiz ID is missing')
        navigate('/error') 
        return null 
    }

    const { data: quizResults, isLoading, error } = useGetQuizResultsQuery({ quizId })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching quiz results.</div>
    if (!quizResults || quizResults.length === 0) {
        return <div>No answers yet.</div>
    }

    return (
        <div className="min-h-screen py-12 px-6 bg-[#f7f5f3]">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-semibold text-center text-[#4a4a4a] mb-8">Results</h2>
                <div className="space-y-6">
                    {quizResults.map((result: IResult) => (
                        <div key={result.username} className="border-b border-[#e0e0e0] pb-4">
                            <h3 className="text-2xl font-semibold text-[#4a4a4a]">{result.username}</h3>
                            <div className="space-y-4 mt-4">
                                {result.selectedAnswers.map((answer, index) => {
                                    const isCorrect = answer.selectedAnswer === answer.correctAnswer
                                    return (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg ${isCorrect ? 'bg-[#d4edda]' : 'bg-[#f8d7da]'}`}
                                        >
                                            <p className="font-medium text-[#4a4a4a]">{answer.questionText}</p>
                                            <p
                                                className={`text-sm ${isCorrect ? 'text-[#155724]' : 'text-[#721c24]'}`}
                                            >
                                                Answer of {result.username}: {answer.selectedAnswer}
                                            </p>
                                            <p className="text-[#6c757d]">Correct answer: {answer.correctAnswer}</p>
                                            {!isCorrect && (
                                                <p className="text-[#6c757d] mt-2">Explanation: {answer.explanation}</p>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-4">
                                <p className="text-lg font-medium text-[#155724]">
                                    Correct Answers: {result.correctAnswers}
                                </p>
                                <p className="text-lg font-medium text-[#721c24]">
                                    Incorrect Answers: {result.wrongAnswers}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Details
