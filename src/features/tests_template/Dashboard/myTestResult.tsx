import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IResult } from '../types'

export const Result = () => {
    const { quizId } = useParams<{ quizId: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    
    const storedResultData: IResult | null = JSON.parse(sessionStorage.getItem('quizResult') ?? 'null')
    const stateResultData = location.state?.resultData as IResult | null

    const resultData = storedResultData || stateResultData

    useEffect(() => {
        if (!resultData) {
            console.error('Result data not found, redirecting...')
            navigate('/quizzes')
        }
    }, [resultData, navigate])

    if (!resultData) return null 

    return (
        <>
            <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#F3EDE3' }}>
                <div className="max-w-3xl mx-auto bg-[#FFFFFF] shadow-lg rounded-xl p-8">
                    <h1 className="text-3xl font-semibold text-[#302824] text-center mb-8">
                        {resultData.quizName} - Results
                    </h1>
                    <h2 className="text-xl font-semibold text-[#6C3530]">
                        Score: {resultData.correctAnswers}/{resultData.correctAnswers + resultData.wrongAnswers}
                    </h2>
                    <div className="mt-6">
                        {resultData.selectedAnswers.map((answer, index) => {
                            const isCorrect = answer.selectedAnswer === answer.correctAnswer
                            return (
                                <div key={index} className={`mb-4 p-4 ${isCorrect ? 'bg-[#6e8148]' : 'bg-[#eb7f64]'}`}>
                                    <p className="font-semibold text-[#302824]">{answer.questionText}</p>
                                    <p className={`font-medium ${isCorrect ? 'text-[#302824]' : 'text-[#6C3530]'}`}>
                                        Your answer: {answer.selectedAnswer}
                                    </p>
                                    <p className="text-[#4d534b]">Correct answer: {answer.correctAnswer}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => navigate('/quizzes')}
                            className="px-6 py-3 bg-[#6C3530] text-white font-semibold rounded-full shadow-md hover:bg-[#302824] transition-all"
                        >
                            Back to Quizzes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
