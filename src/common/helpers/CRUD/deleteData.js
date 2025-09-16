import createService from '../../../services/factory';
import getEnvironment from '../../../config/environment';

const deleteData = async (id, entity, setAll, all) => {
  try {
    const service = createService(entity);
    await service.delete(id);
    setAll(all.filter(item => item._id !== id));
  } catch (error) {
    console.error('Error deleting data:', error);
    // In demo, always succeed - remove anyway
    if (getEnvironment().isDemo) {
      setAll(all.filter(item => item._id !== id));
    }
  }
};

export default deleteData;