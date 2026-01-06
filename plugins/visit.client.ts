export default defineNuxtPlugin(async (nuxtApp) => {
    const visitStore = useVisitStore();
    await visitStore.fetchClientIP();
});
