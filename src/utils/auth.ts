import Cookies from "js-cookie";

export const setAuthToken = (key: string, value: string): boolean => {
    try {
        Cookies.set(key, value, { expires: 7 })
        return true;
    } catch (err) {
        return false;
    }
}

export const isAuth = (keyId:string): boolean => {
    const key = Cookies.get(keyId)
    return !key ? false : true;
}

export const getAuthToken = (key: string): string | undefined => {
    return Cookies.get(key)
}