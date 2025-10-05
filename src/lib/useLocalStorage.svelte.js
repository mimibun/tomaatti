import { browser } from "$app/environment";

export function useLocalStorage(key, value) {
    let storage = $state([]);

    if (browser) {
        const item = localStorage.getItem(key)
        if (item) storage = JSON.parse(item)
    }

    $effect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return storage;
}