export const baseUrl = 'http://127.0.0.1:8000/';

// export const getUnscheduledTasks = async ()=> {
//     const promise = await fetch(baseUrl + 'get_unscheduled_tasks/')
//         .then(data => data.json())
    
//     return promise
// }

export async function apiClientService(url, options = {}) {
    const access = window.localStorage.getItem('ACCESS');
    const headers = options.headers || {};
    if (access) {
      headers['Authorization'] = `Bearer ${access}`;
    }
  
    let response = await fetch(`${baseUrl}${url}`, { ...options, headers });
  
    if (response.status === 401) {
        const refresh = window.localStorage.getItem('REFRESH');
        const refreshResponse = await fetch(`${baseUrl}api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                refresh,
            }),
        });
        const refreshData = await refreshResponse.json();

        window.localStorage.setItem('ACCESS', refreshData.access);

        headers['Authorization'] = `Bearer ${refreshData.access}`;

        response = await fetch(`${baseUrl}${url}`, { ...options, headers });
    }
  
    const data = await response.json();

    console.log(data)
  
    return data;
}

export default apiClientService;
