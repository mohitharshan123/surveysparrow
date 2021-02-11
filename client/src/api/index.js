import axios from "axios";

export const url = "http://localhost:4021/api";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};
export const fetchItems = () => axios.get(`${url}/items/`, { headers });
export const createItem = (urlMakeUrl, type, newItem) =>
    axios.post(urlMakeUrl, newItem).then(({ data }) => {
        const item = {
            type,
            link: type === "link" ? data.link_url : data.message_url,
            key_string: data.key,
            ttl: newItem.ttl,
            time_created: new Date(),
        };
        return axios.post(
            `${url}/items/`,
            item, { headers }
        );
    });