import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { IQuiz, IResult, ICreateTestPayload } from '../types';
export const taskApi = createApi({
  reducerPath: 'tests', 
  baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3006"}),
  
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
        url: 'quizzes', 
        method: 'POST',
        body: testData,
      }),
    }),
  }),
});
export const { useGetTestsQuery, useSubmitQuizResultsMutation, useCreateTestMutation ,useGetQuizResultsQuery} = taskApi;