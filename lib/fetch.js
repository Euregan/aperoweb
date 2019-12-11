import unfetch from 'isomorphic-unfetch';

const fetch = async url => {
    if (!process.browser) return Promise.resolve([]);
    const res = await unfetch(`/api${url}`);
    return await res.json();
};

export default fetch;
