import createService from '../../../services/factory';
import getEnvironment from '../../../config/environment';

const updateData = async (
  entity,
  selectedId,
  updateData,
  setAll,
  setOpenDialog,
  setLoading
) => {
  try {
    setLoading(true);
    const service = createService(entity);
    const updatedItem = await service.update(selectedId, updateData);
    setAll((prev) => prev.map(item => item._id === selectedId ? updatedItem : item));
    setOpenDialog(false);
    setLoading(false);
    // TODO: Success toast
  } catch (error) {
    console.error('Error updating data:', error);
    setOpenDialog(false);
    setLoading(false);
    // In demo, always succeed - update anyway
    if (getEnvironment().isDemo) {
      setAll((prev) => prev.map(item => item._id === selectedId ? { ...item, ...updateData, updatedAt: new Date().toISOString() } : item));
      setOpenDialog(false);
      setLoading(false);
    }
  }
};

export default updateData;