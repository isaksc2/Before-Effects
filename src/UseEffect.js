/*
useEffect(() => {
    let isMounted = true;               // note mutable flag
    someAsyncOperation().then(data => {
        if (isMounted) setState(data);    // add conditional check
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
}, []);                               // adjust dependencies to your needs

function useAsync0(asyncFn, onSuccess) {
    useEffect(() => {
        let isActive = true;
        asyncFn().then(data => {
            if (isActive) onSuccess(data);
        });
        return () => { isActive = false };
    }, [asyncFn, onSuccess]);
}

export const useAsync = useAsync0;
*/