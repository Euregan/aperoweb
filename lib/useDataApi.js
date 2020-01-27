import React from 'react';
import unfetch from 'isomorphic-unfetch';

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const useDataApi = (url, initialData = {}) => {
    const [attempt, setAttempt] = React.useState(0);

    const [state, dispatch] = React.useReducer(dataFetchReducer, {
        isLoading: true,
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
    }, [url, attempt]);

    const ifLoaded = React.useCallback(produceCallback => {
        if (!state.isLoading && !state.isError) {
            return produceCallback();
        }

        return null;
    });

    const retry = React.useCallback(() => {
        setAttempt(currentAttempt => currentAttempt + 1);
    }, [setAttempt]);

    return { ...state, ifLoaded, retry };
};

export default useDataApi;
