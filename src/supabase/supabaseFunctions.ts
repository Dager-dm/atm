  const AUTHORIZATION=import.meta.env.VITE_AUTHORIZATION;
  const GENERATE_CODE_URL=import.meta.env.VITE_SUPABASE_GENERATE_CODE_URL;
  const GET_ACCOUNT_URL=import.meta.env.VITE_SUPABASE_GET_ACCOUNT_URL;
  const GET_USER_ACCOUNT_URL=import.meta.env.VITE_SUPABASE_GET_USER_ACCOUNT_URL;
  const DELETE_CODE_URL=import.meta.env.VITE_SUPABASE_DELETE_CODE_URL;
  const CREATE_RETIRO=import.meta.env.VITE_SUPABASE_CREATE_RETIRO;
  

  const toDevUrl = (fullUrl: string) => {
    if (!import.meta.env.DEV) return fullUrl;
    try {
      const u = new URL(fullUrl);
      const path = u.pathname.replace(/^\/functions\/v1\/?/, '');
      return `/supabase/${path}`;
    } catch {
      return fullUrl;
    }
  };





export const getAccount = async (body: any) => {
  const response = await fetch(toDevUrl(GET_ACCOUNT_URL), {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  return response.json();
};

export const getAccountUser = async (body: any) => {
  const response = await fetch(toDevUrl(GET_USER_ACCOUNT_URL), {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }
  
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Response text:', text);
    throw new Error('Invalid JSON response');
  }
};

export const generateCode = async (body: any) => {
  const response = await fetch(toDevUrl(GENERATE_CODE_URL), {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }
  
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Response text:', text);
    throw new Error('Invalid JSON response');
  }
};

export const deleteCode = async (body: any) => {
  const response = await fetch(toDevUrl(DELETE_CODE_URL), {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }
  
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Response text:', text);
    throw new Error('Invalid JSON response');
  }
};

export const createRetiro = async (body: any) => {
  const response = await fetch(toDevUrl(CREATE_RETIRO), {
    method: 'POST',
    headers: {
      'Authorization': AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const text = await response.text();
  if (!text) {
    throw new Error('Empty response from server');
  }
  
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error('Response text:', text);
    throw new Error('Invalid JSON response');
  }
};

