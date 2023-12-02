import axios from "axios";

export async function GET(url, params) {
  let httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  try {
    console.log(
      "🚀 ~ file: httpClient.js:6 ~ GET ~ process.env.NEXT_PUBLIC_BASE_URL:",
      process.env.NEXT_PUBLIC_BASE_URL
    );

    const response = await httpClient.get(url, params);
    return response.data;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}

export async function POST(url, params) {
  let httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  try {
    const response = await httpClient.post(url, params);
    return response.data;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}

export async function POST_WITHOUT_TOKEN(url, params) {
  let httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  try {
    const response = await httpClient.post(url, params);
    return response.data;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}

export async function DELETE(url, params) {
  let httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  try {
    const response = await httpClient.delete(url, params);
    return response;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}

export async function UPDATE(url, params) {
  let httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  try {
    const response = await httpClient.put(url, params);
    return response;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}

export async function UPLOAD_FORM_DATA(url, params) {
  let httpFileUpload = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "content-type": "multipart/form-data",
    },
    withCredentials: true,
  });
  try {
    const response = await httpFileUpload.post(url, params);

    return response;
  } catch (error) {
    return {
      error,
      catch: true,
    };
  }
}
