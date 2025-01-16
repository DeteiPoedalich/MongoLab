import { $host, $authHost } from "./index"; // Import $authHost


export const registration = async (NickName, password) => {
    const { data } = await $host.post(process.env.REACT_APP_API_URL+'api/user/registration', { NickName, password });
    localStorage.setItem('token', data.accessToken); // Store the token immediately after registration
    return data; // Decode the access token
};

export const login = async (NickName, password) => {
    const { data } = await $host.post(process.env.REACT_APP_API_URL+'api/user/login', { NickName, password });
    localStorage.setItem('token', data.accessToken); // Store the token
    return data;
};
export const logout=async(NickName, password) => {
    const { data } = await $host.post(process.env.REACT_APP_API_URL+'api/user/logout', { NickName, password });
    localStorage.clear('token', data.accessToken); // Store the token
    return data;
};
export const refresh=async(NickName, password) => {
    const { data } = await $host.get(process.env.REACT_APP_API_URL+'api/user/refresh', { NickName, password });
    localStorage.clear('token', data.accessToken); // Store the token
    return data;
};
export const getProfile=async(userId) => {
    const { data } = await $host.get(process.env.REACT_APP_API_URL+`api/user/profile/${userId}`); // Store the token
    return data;
};

export const getUsers=async() => {
    const { data } = await $host.get(process.env.REACT_APP_API_URL+`api/user/users`); // Store the token
    return data;
};
export const getUsersByTeam = async (params = {}) => {
    try {
        const { where } = params; // Extract where clause
        let url = process.env.REACT_APP_API_URL+`api/user/users/`;

        if (where) {
            // Construct query string for where clause
            const queryParams = Object.entries(where)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            url += `?${queryParams}`;
        }


        const { data } = await $host.get(url);
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const update = async (UserId, NickName ) => { // Accept avatar as a File object
    try {
        console.log(NickName)

        const { data } = await $host.put(
            process.env.REACT_APP_API_URL+`api/user/update/${UserId}`,
            {NickName}, // Send FormData
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,  // Important for file uploads
                },
            }
        );
        
        return data;
    } catch (error) {
        console.error("Error updating user profile:", error.response ? error.response.data : error.message);
        throw error.response?.data || error;
    }
};


