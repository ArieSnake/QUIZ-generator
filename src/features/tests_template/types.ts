export interface IQuestion {
  id: string
  text: string
  options: string[]
  correct: string
  explanation: string
}
export interface IQuiz {
  id: string
  name: string
  category: string
  questions: IQuestion[]
}
export interface ISelectedAnswer {
  [questionId: string]: string
}
export interface IResult {
  username: string | null
  quizName:string
  quizId: string
  selectedAnswers: Array<{
    questionId: string
    questionText:string
    selectedAnswer: string
    correctAnswer: string
    explanation:string
  }>
  correctAnswers: number
  wrongAnswers: number
}
export interface ICreateTestPayload {
  name: string
  category: string
  questions: IQuestion[]
}
export interface IState{
  questions:IQuestion[]
}