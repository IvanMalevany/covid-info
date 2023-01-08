import {useState} from "react";

type UseFetchType = (callback: () => Promise<void>) => [() => Promise<void>, boolean, string];

const useFetch: UseFetchType = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const fetch = async () => {
        try {
            setIsLoading(true)
            await callback()
        }
        catch (e: any) {
            setErrorMessage(e?.toString() || 'Undefined error')
        }
        finally {
            setIsLoading(false)
        }
    }

    return [fetch, isLoading, errorMessage]
}

export default useFetch