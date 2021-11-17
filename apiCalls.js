export const getOrder = () => {
    return fetch(`$(process.env.REACT_APP_BACKEND)/createorder`, {
        method: "GET",

    }).then(response => response.json())
        .catch((err) => console.log(err));
}