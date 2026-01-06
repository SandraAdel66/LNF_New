export function useSettingValue<T>(name: string): T | null | any {
    const data = useResourceStore();
    const setting = (data.settings as NetworkSetting[]).find((s) => s.name === name);
    if (setting) {
        return setting.value as T;
    }

    return null;
}
