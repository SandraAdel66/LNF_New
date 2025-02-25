export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    const visitStore = useVisitStore();
    const resources = useResourceStore();
    if (userStore.token) {
        await userStore.fetchAuthUser();
    }
    if (from.query?.ref) {
        userStore.setRefValue(from.query?.ref as string);
    }
    if (visitStore.ipDetails && import.meta.client) {
        const visitPathInfo = ref({
            ip: visitStore.ipDetails.query,
            countryId: resources.countries?.find((c) => c.code === (visitStore.ipDetails as ipDetailsResponse).countryCode)?.id,
            state: visitStore.ipDetails.regionName,
            city: visitStore.ipDetails.city,
            path: to.fullPath,
        });
        if (userStore.token) {
            await useApiFetch('/api/visit/auth/store', { method: 'POST', body: visitPathInfo.value, lazy: true });
        } else {
            await useApiFetch('/api/visit/guest/store', { method: 'POST', body: visitPathInfo.value, lazy: true });
        }
    }
});
