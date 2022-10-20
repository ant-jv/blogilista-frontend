import { createSlice } from '@reduxjs/toolkit'

const timestamp = () => {
  const d = new Date()
  let time = d.getTime()
  return time
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { time: timestamp(), text: '', type: '' },
  reducers: {
    setNotification(state, action) {
      let newState = { ...action.payload, time: timestamp() }
      return newState
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
