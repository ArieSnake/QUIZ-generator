import axios from "axios"
import { createAppSlice } from "../../../app/createAppSlice"
import { IState } from "../types"
const initialState: IState = {
  questions: [],
}
export const testSlice = createAppSlice({
  name: "task",
  initialState,
  reducers: (create) => ({
    getUsername: create.asyncThunk(
      async (username: string) => {
        const response = await axios.get(`http://localhost:3006/users?username=${username}`)
        return response.data 
      }
    ),
  }),
})
export const { getUsername } = testSlice.actions