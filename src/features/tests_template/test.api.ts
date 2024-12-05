import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateTestPayload, IQuiz, IResult } from './types';
export const taskApi = createApi({
  reducerPath: 'tests', 
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006" }),
  
  endpoints: (builder) => ({
    getTests: builder.query<IQuiz[], void>({
      query: () => '/quizzes', 
    }),

    submitQuizResults: builder.mutation<void, IResult>({
      query: (resultData) => ({
        url: '/quiz-results', 
        method: 'POST',
        body: resultData,
      }),
    }),

    getQuizResults: builder.query<IResult[], { quizId: string }>({
      query: ({ quizId }) => `/quiz-results?quizId=${quizId}`,
    }),

    createTest: builder.mutation<IQuiz, ICreateTestPayload>({
      query: (testData) => ({
        url: '/quizzes', 
        method: 'POST',
        body: testData,
      }),
    }),

    updateTest: builder.mutation<IQuiz, IQuiz>({
      query: (updatedTest) => ({
        url: `/quizzes/${updatedTest.id}`,  
        method: 'PUT',
        body: updatedTest,
      }),
    }),
  }),
})
export const { useGetTestsQuery, useSubmitQuizResultsMutation, useCreateTestMutation, useGetQuizResultsQuery, useUpdateTestMutation } = taskApi