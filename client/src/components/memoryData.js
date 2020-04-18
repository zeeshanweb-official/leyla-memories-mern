import axios from 'axios';

// const API_URL = 'http://localhost:5000/';

export async function getMemories() {
  let response = await fetch(`/posts/memories`);
  return response.json();
}

export async function getMemory(id) {
  let response = await fetch(`/memories/${id}`);
  return response.json();
}

export async function updateMemory(id, data) {
  return fetch(`/memories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => err);
}

export async function addMemory(data) {
  return (
    axios
      .post(`/posts/memories`, data)
      //  return fetch(`${API_URL}memories`, {
      //  method: "POST",
      //  body: JSON.stringify(data),
      //  headers: {
      //    "Content-Type": "application/json"
      //  }
      //  })
      .then(res => res)
      .catch(err => err)
  );
}
export async function UpdateMemory(data) {
  return axios
    .post(`/posts/update`, data)
    .then(res => res)
    .catch(err => err);
}

export async function deleteMemory(id) {
  return fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
