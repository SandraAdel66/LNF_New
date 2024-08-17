export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    if (!userStore.token) {
        return navigateTo('/login');
    }
});
