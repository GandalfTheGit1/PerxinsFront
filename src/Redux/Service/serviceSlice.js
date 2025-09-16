import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (query) => {
    const service = createService('services');
    const data = await service.getAll(query);
    return data;
  }
);

export const serviceSlice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {
    getMoreServices: (state, action) => {
        return [...state, ...action.payload]
    },
    eraseAllServices: (state)=>{
        state.splice(0,state.length)
    },
    changeLikeServices : (state, action)=>{
      const { serviceId, serviceLikes } = action.payload;
      const serviceMapped = state.map(service => {
        if (service._id === serviceId) {
          service.numberOfLikes = serviceLikes;
        }
        return service;
      });
      return serviceMapped;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.push(...action.payload);
      });
  },
})

// Action creators are generated for each case reducer function
export const { getMoreServices, eraseAllServices, changeLikeServices } = serviceSlice.actions

export default serviceSlice.reducer