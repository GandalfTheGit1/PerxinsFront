import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
  name: 'event',
  initialState:[],
  reducers: {
    getMoreEvents: (state, action) => {
      return [...state, ...action.payload]
    },
    eraseAllEvents: (state)=>{
        state.splice(0,state.length)
    },
    changeLikeEvents : (state, action)=>{
      const { serviceId, serviceLikes } = action.payload;
      const eventMapped = state.map(event => {
        if (event._id === serviceId) {
          // Return a new object for the updated event to ensure immutability
          return { ...event, numberOfLikes: serviceLikes };
        }
        return event;
      });
      return eventMapped;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getMoreEvents, eraseAllEvents, changeLikeEvents } = eventSlice.actions

export default eventSlice.reducer