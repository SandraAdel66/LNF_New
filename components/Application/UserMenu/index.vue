<script lang="ts" setup>
const userStore = useUserStore();
const headerSettings = {
    loginButtonActive: useSettingValue('login_button_active') ?? true,
    registerButtonActive: useSettingValue('register_button_active') ?? true,
    loginButton: useSettingValue('login_button') ?? {
        label: 'Login',
        target: '_self',
        url: '/login',
        style: 'primary',
        icon: 'solar:login-3-outline',
    },
    registerButton: useSettingValue('register_button') ?? {
        label: 'Application Form',
        target: '_self',
        url: '/application-form',
        style: 'warning',
        icon: 'solar:shield-star-outline',
    },
};
const userMenuOpen = ref(false);
const route = useRoute();

function userMenuStatus() {
    userMenuOpen.value = !userMenuOpen.value;
}

watch(
    () => route.path,
    (newPath, oldPath) => {
        if (newPath !== oldPath) {
            userMenuOpen.value = false;
        }
    },
);

async function logout() {
    userStore.logout();
}
</script>

<template>
    <div class="-intro-x hidden items-center xl:flex space-x-5">
        <div v-if="userStore.token && userStore.user" class="flex items-center gap-3">
            <HeadlessMenu as="div" class="relative">
                <HeadlessMenuButton
                    :class="['rounded-md inline-flex text-left gap-3 items-center hover:bg-slate-100 dark:hover:bg-slate-950 p-1 ease-in-out duration-300']"
                    aria-label="Mobile Menu"
                    @click="userMenuStatus"
                >
                    <NuxtImg
                        :alt="userStore.user?.name"
                        :class="['h-8 w-14 rounded-sm object-contain', ' ring-4 -ring-offset-2 ring-slate-500/15  bg-white']"
                        :src="userStore.user?.imageUrl"
                        :title="userStore.user?.name"
                        height="100%"
                        loading="lazy"
                        preload
                        quality="80"
                        width="100%"
                    />
                    <div class="text-xs max-w-36 whitespace-nowrap">
                        <div class="font-normal truncate">{{ userStore.user?.name }}</div>
                        <div class="text-slate-500 mt-0.5 truncate">
                            <span v-if="userStore.user?.country?.name" class="font-normal">{{ userStore.user?.country?.name }}</span>
                            <span v-if="userStore.user?.state" class="font-light">,? {{ userStore.user?.state }}</span>
                            <span v-if="userStore.user?.city" class="font-light">, {{ userStore.user?.city }}</span>
                        </div>
                    </div>
                    <div>
                        <Icon :class="[userMenuOpen ? 'rotate-180' : '', 'ease-in-out duration-300 dark:text-slate-400 text-slate-600 size-5']" name="solar:alt-arrow-down-broken" />
                    </div>
                </HeadlessMenuButton>
                <TransitionSlide>
                    <div v-show="userMenuOpen" class="z-40">
                        <HeadlessMenuItems
                            class="box p-1.5 absolute right-0 mt-2 w-64 text-sm overflow-hidden origin-top-right divide-y divide-slate-100 rounded-md shadow-sm ring-0.5 ring-black ring-opacity-5 focus:outline-none dark:divide-white/10"
                            static
                        >
                            <HeadlessMenuItem class="group flex w-full items-center px-4 py-2 rounded-md hover:bg-primary">
                                <NuxtLink to="/dashboard">
                                    <Icon class="mr-2 group-hover:mr-4 ease-in-out duration-300 size-5 text-slate-400 group-hover:text-white" name="solar:user-id-broken" />
                                    <span class="font-medium group-hover:text-white">Profile</span>
                                </NuxtLink>
                            </HeadlessMenuItem>
                            <HeadlessMenuItem
                                class="group ease-in-out duration-150 flex w-full items-center px-4 py-2 rounded-md text-danger hover:text-red-700 font-medium hover:font-medium hover:bg-danger"
                            >
                                <button @click="logout">
                                    <Icon class="mr-2 group-hover:mr-4 ease-in-out duration-300 size-5 opacity/75 group-hover:text-white" name="solar:logout-2-broken" />
                                    <span class="ease-in-out duration-300 group-hover:text-white">Logout</span>
                                </button>
                            </HeadlessMenuItem>
                        </HeadlessMenuItems>
                    </div>
                </TransitionSlide>
            </HeadlessMenu>
        </div>
        <template v-else>
            <NuxtLink v-if="headerSettings.registerButtonActive" :target="headerSettings.registerButton.target" :to="headerSettings.registerButton.url">
                <button :class="'btn btn-rounded btn-sm px-5 btn-' + headerSettings.registerButton.style">
                    <Icon v-if="headerSettings.registerButton.icon" :name="headerSettings.registerButton.icon" class="size-5 mr-2" />
                    <span>{{ headerSettings.registerButton.label }}</span>
                </button>
            </NuxtLink>
            <NuxtLink v-if="headerSettings.loginButtonActive" :target="headerSettings.loginButton.target" :to="headerSettings.loginButton.url">
                <button :class="'btn btn-rounded btn-sm px-5 btn-' + headerSettings.loginButton.style">
                    <Icon v-if="headerSettings.loginButton.icon" :name="headerSettings.loginButton.icon" class="size-5 mr-2" />
                    <span>{{ headerSettings.loginButton.label }}</span>
                </button>
            </NuxtLink>
        </template>
    </div>
</template>
