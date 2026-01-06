export function useSettingKey<T>(name: string): T | null | any {
    const data = useResourceStore();
    return data.settings;
}
