export default defineNuxtPlugin(async (nuxtApp) => {
    const resourceStore = useResourceStore();
    await resourceStore.fetchSettings();
    await resourceStore.fetchResources();
});
