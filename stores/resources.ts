export const useResourceStore = defineStore('resource', () => {
    const countries = ref<Country[]>();
    const cities = ref<City[]>();
    const settings = ref<PublicSetting[]>();
    const services = ref<Service[]>();

    const setCountries = (data?: Country[]) => {
        countries.value = data;
    };
    const setCities = (data?: City[]) => {
        cities.value = data;
    };
    const setServices = (data?: Service[]) => {
        services.value = data;
    };

    const setSettings = (data?: PublicSetting[]) => {
        settings.value = data;
    };

    const fetchResources = async () => {
        const { data: res, error } = await useApiFetch(`/api/fetch-resources`, {
            lazy: true,
            transform: (res) => (res as any).data as any,
        });
        if (res.value) {
            setCountries((res.value as any).countries as Country[]);
            setCities((res.value as any).cities as City[]);
            setServices((res.value as any).services as Service[]);
        }
        if (error && error.value) {
            setCountries();
            setCities();
            setServices();
            console.error(error);
        }
    };

    const fetchSettings = async () => {
        const { data: res, error } = await useApiFetch(`/api/setting-public`, {
            lazy: true,
            transform: (res) => (res as any).data as PublicSetting[],
        });
        if (res.value) {
            setSettings(res.value as PublicSetting[]);
        }
        if (error && error.value) {
            setSettings();
            console.error('Error', error.value);
        }
    };

    return {
        countries,
        settings,
        fetchSettings,
        setSettings,
        setCountries,
        cities,
        fetchResources,
        services,
        setServices,
    };
});
