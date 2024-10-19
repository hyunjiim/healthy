import { Cookies } from "react-cookie";
import axios from "axios";

const reissue = async () => {
    try {
        axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

        axios.post('/reissue')
            .then((response) => {
                console.log('응답:', response);
                if(response.status === 200) {
                    window.localStorage.setItem("accessToken", response.headers.get("accessToken"));
                    return true;
                } else {
                    window.localStorage.removeItem("accessToken");
                    const cookies = new Cookies();
                    cookies.set("refreshToken", null, {maxAge: 0});
                }
            })
    } catch (error) {
        console.log("error : ", error);
    }
    return false;
}

export default reissue;