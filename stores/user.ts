export const useUserStore = defineStore('user', () => {
    // Main Objects
    const user = ref<User>();
    const authenticated = useCookie('LNF_AUTHENTICATED', {
        maxAge: 60 * 60 * 2,
    });

    const token = useCookie('LNF_AUTH_TOKEN', {
        maxAge: 60 * 60 * 2,
    });
    const refValue = useCookie('LNF_REF_ID', {
        maxAge: 60 * 60 * 24 * 365,
    });

    // Setting Data to the Main Objects
    const setToken = (data?: string) => (token.value = data);
    const setRefValue = (data?: string) => (refValue.value = data);
    const setUser = (data?: User) => (user.value = data);
    const setAuthentication = (data?: boolean) => (authenticated.value = data?.toString());

    // User Actions
    const signIn = async (data: Credentials) => {
        await useApiFetch('/sanctum/csrf-cookie');
        const { data: userData, error } = await useApiFetch(`/api/member/login`, {
            method: 'POST',
            body: data,
            lazy: true,
        });

        if (userData.value) {
            const user = (userData.value as ApiResponse).user as User;
            const userToken = (userData.value as ApiResponse).token as string;
            setUser(user);
            setToken(userToken);
            useToast({ title: 'Welcome', message: 'Logged in Successfully', type: 'success', duration: 5000 });
            navigateTo('/dashboard');
        }

        if (error.value) {
            setAuthentication(false);
            setToken();
            setUser();
        }
    };
    const fetchAuthUser = async () => {
        if (token.value) {
            const { data: res, error } = await useApiFetch('/api/get-user', {
                transform: (res) => (res as ApiResponse).data as User,
            });
            if (res.value) {
                setUser(res.value as User);
            }
            if (error.value) {
                logout();
                console.error(error.value);
            }
        }
    };

    const logout = () => {
        setAuthentication(false);
        setToken();
        setUser();
        navigateTo('/login');
    };

    return {
        user,
        token,
        logout,
        signIn,
        fetchAuthUser,
        setUser,
        setToken,
        authenticated,
        setAuthentication,
        refValue,
        setRefValue,
    };
});
