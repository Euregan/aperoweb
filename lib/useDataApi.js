import React from 'react';
import unfetch from 'isomorphic-unfetch';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isError: false };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const useDataApi = (url, initialData) => {
    const [state, dispatch] = React.useReducer(dataFetchReducer, {
        isError: false,
        data: initialData,
    });

    React.useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const response = await unfetch(url);
                if (didCancel) {
                    return;
                }

                if (!response.ok) {
                    return dispatch({ type: 'FETCH_FAILURE' });
                }

                const { error, ...data } = await response.json();
                if (error) {
                    console.error(error);
                    return dispatch({ type: 'FETCH_FAILURE' });
                }

                return dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                if (!didCancel) {
                    return dispatch({ type: 'FETCH_FAILURE' });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, []);

    return state;
};

export default useDataApi;
