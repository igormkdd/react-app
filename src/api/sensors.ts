const API_URL = "http://localhost:3000"; // NextJS backend

export async function fetchSensors() {
    try {
        const res = await fetch(`${API_URL}/api/sensors`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            credentials: 'include',
            mode: 'cors'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch sensors');
        }

        return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
        throw new Error('Server is currently unavailable. Please try again later');
    }
}
