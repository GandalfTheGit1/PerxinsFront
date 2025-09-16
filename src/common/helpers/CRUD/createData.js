import createService from '../../../services/factory';

const createData = async (
  entity,
  data,
  setAll,
  setOpenDialog,
  all,
  setLoading
) => {
  try {
    setLoading(true);
    const service = createService(entity);
    const newItem = await service.create(data);
    setAll([newItem, ...all]);
    setOpenDialog(false);
    setLoading(false);
    // TODO: Success toast
  } catch (error) {
    console.error('Error creating data:', error);
    setOpenDialog(false);
    setLoading(false);
    // In demo, always succeed - perhaps add mock item anyway
    if (getEnvironment().isDemo) {
      const mockItem = { ...data, _id: `mock_${entity}_${Date.now()}`, createdAt: new Date().toISOString() };
      setAll([mockItem, ...all]);
      setOpenDialog(false);
      setLoading(false);
    }
  }
};

export default createData;