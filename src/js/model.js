export const getData = async (filepath) => {
    try {
        const res = await fetch(filepath);
        const json = await res.json();
        return json;
    } catch (error) {
        throw new Error(error);
    };
};





