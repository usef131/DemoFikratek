const API = "http://localhost:5002/api/projects";

export const projectService = {
  getProjects: async () => {
    const res = await fetch(API);
    return await res.json();
  },

  getProjectById: async (id) => {
    const res = await fetch(`${API}/${id}`);
    return await res.json();
  },
};

export const ideaService = {
  expressInterest: async (id) => {
    const res = await fetch(`http://localhost:5002/api/projects/${id}/interest`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Failed to express interest');
    return res.json();
  },
  withdrawInterest: async (id) => {
    const res = await fetch(`http://localhost:5002/api/projects/${id}/interest`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error('Failed to withdraw interest');
    return res.json();
  }
};