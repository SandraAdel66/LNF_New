export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();
    if (userStore.token) {
        await userStore.fetchAuthUser();
        return navigateTo('/dashboard');
    }
});
