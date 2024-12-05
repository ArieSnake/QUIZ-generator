import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTestsQuery, useUpdateTestMutation,  } from '../test.api'
import { IQuestion, IQuiz } from '../types'

const EditQuiz = () => {
    const { quizId } = useParams<{ quizId: string }>() 
    const navigate = useNavigate()

    const { data: quizzes } = useGetTestsQuery() 
    const [updateTest] = useUpdateTestMutation() 

    const [title, setTitle] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (quizzes && quizId) {
            const quiz = quizzes.find((quiz: IQuiz) => quiz.id.toString() === quizId)
            if (quiz) {
                setTitle(quiz.name)
                setCategory(quiz.category)
                setQuestions(quiz.questions)
            }
        }
    }, [quizzes, quizId])

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now().toString(), text: '', options: [], correct: '', explanation: '' },
        ])
    }

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter((question) => question.id !== id))
    }

    const addAnswer = (questionId: string) => {
        setQuestions(questions.map((question) =>
            question.id === questionId
                ? { ...question, options: [...question.options, ''] }
                : question
        ))
    }

    const setCorrectAnswer = (questionId: string, optionIndex: number) => {
        setQuestions(questions.map((question) =>
            question.id === questionId
                ? { ...question, correct: question.options[optionIndex] }
                : question
        ))
    }

    const handleQuestionChange = (questionId: string, text: string) => {
        setQuestions(questions.map((question) =>
            question.id === questionId ? { ...question, text } : question
        ))
    }

    const handleAnswerChange = (questionId: string, optionIndex: number, text: string) => {
        setQuestions(questions.map((question) =>
            question.id === questionId
                ? {
                    ...question,
                    options: question.options.map((option, index) =>
                        index === optionIndex ? text : option
                    ),
                }
                : question
        ))
    }

    const handleExplanationChange = (questionId: string, text: string) => {
        setQuestions(questions.map((question) =>
            question.id === questionId ? { ...question, explanation: text } : question
        ))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !category || questions.length === 0) {
            setError('Please fill in all fields and add at least one question.')
            return
        }

        for (let question of questions) {
            if (!question.text || question.options.length === 0 || !question.correct || !question.explanation) {
                setError('Each question must have text, options, one correct answer, and an explanation.')
                return
            }
        }

        const updatedQuiz: IQuiz = {
            id: String(quizId),
            name: title,
            category,
            questions,
        }

        try {
            await updateTest(updatedQuiz).unwrap()
            navigate('/quizzes')
        } catch (err) {
            console.error('Failed to update quiz:', err)
            setError('Error updating quiz. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-[#f3ede3] py-12 px-6">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-3xl font-semibold text-center text-[#302824] mb-8">Edit Quiz</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#302824]">Quiz Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-[#a6bb7b] rounded-md focus:outline-none"
                            placeholder="Enter quiz title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#302824]">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border border-[#a6bb7b] rounded-md focus:outline-none"
                            placeholder="Enter category"
                        />
                    </div>

                    <button type="button" onClick={addQuestion} className="mt-4 bg-[#6c3530] text-white px-4 py-2 rounded-lg">
                        Add Question
                    </button>

                    {questions.map((question, qIndex) => (
                        <div key={question.id} className="mt-6 border-b pb-4">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-[#302824]">Question {qIndex + 1}</label>
                                <button type="button" onClick={() => removeQuestion(question.id)} className="bg-red-500 text-white px-3 py-1 rounded-full">
                                    Remove
                                </button>
                            </div>
                            <input
                                type="text"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                className="mt-2 block w-full px-4 py-2 border border-[#a6bb7b] rounded-md"
                                placeholder="Enter question text"
                            />
                            <button
                                type="button"
                                onClick={() => addAnswer(question.id)}
                                className="mt-2 bg-green-500 text-white px-3 py-1 rounded-full"
                            >
                                Add Answer
                            </button>
                            <div className="mt-4">
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center mt-2">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleAnswerChange(question.id, optionIndex, e.target.value)}
                                            className="w-full px-4 py-2 border border-[#a6bb7b] rounded-md"
                                            placeholder="Enter answer option"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCorrectAnswer(question.id, optionIndex)}
                                            className={`ml-4 px-3 py-1 rounded-full ${option === question.correct ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                        >
                                            {option === question.correct ? 'Correct' : 'Set as Correct'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-[#302824]">Explanation for Correct Answer</label>
                                <textarea
                                    value={question.explanation}
                                    onChange={(e) => handleExplanationChange(question.id, e.target.value)}
                                    className="mt-2 block w-full px-4 py-2 border border-[#a6bb7b] rounded-md"
                                    placeholder="Enter explanation for correct answer"
                                />
                            </div>
                        </div>
                    ))}

                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <button
                        type="submit"
                        className="mt-6 w-full bg-[#6c3530] text-white py-3 rounded-lg font-semibold"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditQuiz
