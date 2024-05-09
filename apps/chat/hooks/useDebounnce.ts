import { useEffect, useState } from "react";

const useDebounce = (value: string, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay ?? 500);
        return () => {
            clearTimeout(timer); // 在每次依赖更新时，清除上一次的定时器
        }
    }, [value, delay]);

    return debouncedValue;
}
export default useDebounce;