
async function apiCall() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Faild to fetch data')
    }
    const data = await response.json();
    console.log(data.data.products);
  } catch (error) {
    console.log(error);
  }
}

apiCall()