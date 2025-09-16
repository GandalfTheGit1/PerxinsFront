import createService from '../../../services/factory';

async function getData(entity, query = {}, setAllCombos) {
  try {
    const service = createService(entity);
    const data = await service.getAll(query);
    setAllCombos(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // In demo, always succeed or handle gracefully
  }
}

export default getData;