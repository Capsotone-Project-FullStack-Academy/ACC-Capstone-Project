const BASE_URL = 'http://localhost:5000';

export const login = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Login failed. Please check your credentials.');
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserCart = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/my-cart?userId=${userId}`);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Failed to fetch user cart data.');
    }
  } catch (error) {
    throw error;
  }
};
