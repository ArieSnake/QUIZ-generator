import { useNavigate } from 'react-router-dom'
import { useGetTestsQuery } from './tasks.api'
import { IQuiz } from '../types'

export const TasksList = () => {
    const { data: quizzes, error, isLoading } = useGetTestsQuery()
    const navigate = useNavigate()
    const username = sessionStorage.getItem("username") || "Guest User"

    const handlePassClick = (quizId: string) => {
        navigate(`/quizzes/${quizId}`)
    }

    const handleEditClick = (quizId: string) => {
        navigate(`/quizzes/${quizId}/edit`)
    }

    if (isLoading) return <div className="text-white text-xl text-center mt-10">Loading tests...</div>
    if (error) return <div className="text-red-500 text-xl text-center mt-10">Error loading tests.</div>

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-purple-800 to-gray-800 p-6 flex flex-col items-center">
                <div className="flex flex-col items-center mb-12">
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/celestial-and-witchcraft/500/aries_zodiac_astrology_star_constellation_astronomy_month_galaxy_magic_stars-256.png"
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full border-4 border-purple-400 mb-4"
                    />
                    <h3 className="text-lg font-semibold">{username}</h3>
                </div>
                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all mb-6 shadow-md"
                    onClick={() => navigate('/create/quiz')}
                >
                    Create Quiz
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="h-full max-w-7xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8">
                    <h2 className="text-3xl font-semibold text-center text-purple-400 mb-10">Available Quizzes</h2>
                    {quizzes && quizzes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzes.map((quiz: IQuiz) => (
                                <div
                                    key={quiz.id}
                                    className="flex flex-col items-center justify-center p-6 bg-gray-700 border border-purple-500 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 max-w-xs w-full"
                                >
                                    <h3 className="text-xl font-semibold text-purple-400 mb-2">{quiz.name}</h3>
                                    <p className="text-gray-300 mb-4">{quiz.category}</p>
                                    <div className="flex space-x-4 mb-4">
                                        <button
                                            onClick={() => handlePassClick(quiz.id)}
                                            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-all"
                                        >
                                            Take Test
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(quiz.id)}
                                            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-full shadow-md hover:bg-gray-700 transition-all"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/quizzes/${quiz.id}/details`)}
                                        className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:bg-purple-600 transition-all"
                                    >
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-lg font-semibold text-gray-300 mt-10">
                            No quizzes available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
