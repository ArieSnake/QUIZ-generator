import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { getUsername } from "../Dashboard/task.slice";

export const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [error, setError] = useState<string>("")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
   
    dispatch(getUsername(username))
      .unwrap()
      .then((response) => {
        console.log(response)
        if (Array.isArray(response) && response.length !== 0) {
          setError("This name is already taken")
        } else if (Array.isArray(response) && response.length === 0) {
          setError("")
          sessionStorage.setItem("username", username) 
          navigate("/quizzes") 
          setUsername("") 
        }
      })
  }
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login for Quizzes
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm" aria-live="assertive">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
