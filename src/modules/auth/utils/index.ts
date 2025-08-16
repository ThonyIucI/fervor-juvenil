import store from "../../../@common/utils/store";

export const ACCESS_TOKEN = "ACCESS_TOKEN";


export const getAccessToken = () => {
    return store.get(ACCESS_TOKEN);
};