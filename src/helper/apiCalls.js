import axios from "axios";
import { BASE_URL } from "../Components/Constants";


const login = async (email, password) => {
    try {
        const res = await axios.post(BASE_URL + '/auth/login',
            {
                email,
                password
            }, { withCredentials: true }
        );

        const userData = res.data.user
        return userData;

    } catch (error) {
        return `Error: ${error.response.data.message}`
    }
}

export { login }