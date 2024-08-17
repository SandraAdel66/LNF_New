<script lang="ts" setup>
const mobileMenuOpen = ref(false);
const props = defineProps<{
    menu: NavigationMenu;
}>();
const userStore = useUserStore();
const route = useRoute();

async function logout() {
    userStore.logout();
}

watch(
    () => route.path,
    (newPath, oldPath) => {
        if (newPath !== oldPath) {
            mobileMenuOpen.value = false;
        }
    },
);

function mobileMenuStatus() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>
<template>
    <div class="-intro-x block xl:hidden relative !z-[99999]">
        <HeadlessMenu as="div" class="relative inline-block text-left">
            <HeadlessMenuButton aria-label="Mobile Menu" class="inline-flex" @click="mobileMenuStatus">
                <Icon
                    :class="[mobileMenuOpen ? 'rotate-180' : '-rotate-180']"
                    :name="!mobileMenuOpen ? 'solar:hamburger-menu-broken' : 'clarity:close-line'"
                    class="h-10 w-10 duration-300 ease-in-out"
                />
            </HeadlessMenuButton>
            <TransitionSlide>
                <div v-show="mobileMenuOpen" class="z-40">
                    <HeadlessMenuItems
                        class="bg-white rounded-xl absolute right-0 mt-5 min-w-[16rem] overflow-hidden origin-top-right divide-y divide-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-white/10"
                        static
                    >
                        <NuxtLink class="group flex w-full items-center p-3" href="/">
                            <!--                            <Icon v-if="item.icon" :name="item.icon" class="mr-2 size-5 text-slate-400 group-hover:text-primary" />-->
                            <span class="font-normal group-hover:text-primary">Home</span>
                        </NuxtLink>
                        <HeadlessMenuItem v-for="item in props.menu.subMenus" :key="item.id" class="">
                            <div>
                                <NuxtLink
                                    :class="[item.children.length > 0 && 'opacity-65 !font-light', 'font-normal  group flex w-full items-center p-3']"
                                    :href="item.children.length === 0 ? item.link : undefined"
                                >
                                    <Icon v-if="item.icon" :name="item.icon" class="mr-2 size-5 text-slate-400 group-hover:text-primary" />
                                    <span class="group-hover:text-primary">{{ item.name }}</span>
                                </NuxtLink>
                                <ul v-if="item.children.length > 0" class="pl-6 divide-dashed divide-y border-t border-dashed">
                                    <template v-for="subItem in item.children" :key="subItem.id">
                                        <li>
                                            <NuxtLink :href="subItem.link" class="group flex w-full items-center p-2">
                                                <Icon v-if="item.icon" :name="item.icon" class="mr-2 size-5 text-slate-400 group-hover:text-primary" />
                                                {{ subItem.name }}
                                            </NuxtLink>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </HeadlessMenuItem>
                        <template v-if="userStore.token">
                            <div class="group w-full items-center p-3 bg-slate-50 flex">
                                <div :class="['w-14 rounded-md mr-2 shrink-0 h-10 ring-2 ring-slate-200 dark:ring-slate-700 bg-white']">
                                    <NuxtImg
                                        :class="['w-14 object-contain rounded-md h-10 bg-white']"
                                        :src="userStore.user?.imageUrl"
                                        alt="Company Name"
                                        height="100%"
                                        loading="lazy"
                                        preload
                                        quality="80"
                                        width="100%"
                                    />
                                </div>
                                <div class="text-sm truncate">
                                    <div class="font-medium truncate">{{ userStore.user?.name }}</div>
                                    <div class="mt-1 truncate font-light">
                                        <span v-if="userStore.user?.countryName" class="font-normal">{{ userStore.user?.countryName }}</span>
                                        <span v-if="userStore.user?.state">, {{ userStore.user?.state }}</span>
                                        <span v-if="userStore.user?.city">, {{ userStore.user?.city }}</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!--                        <HeadlessMenuItem class="w-full">-->
                        <!--                            <ColorModeSwitcherMobile />-->
                        <!--                        </HeadlessMenuItem>-->
                        <template v-if="!userStore.token">
                            <HeadlessMenuItem>
                                <NuxtLink to="/application-form">
                                    <div class="text-left p-3 font-medium btn-warning w-full">
                                        <Icon class="size-4 mr-2" name="solar:home-add-angle-broken" />
                                        <span>Register</span>
                                    </div>
                                </NuxtLink>
                            </HeadlessMenuItem>
                            <HeadlessMenuItem>
                                <NuxtLink to="/login">
                                    <div class="text-left p-3 font-medium btn-primary w-full">
                                        <Icon class="size-4 mr-2" name="solar:login-2-broken" />
                                        <span>Login</span>
                                    </div>
                                </NuxtLink>
                            </HeadlessMenuItem>
                        </template>
                        <template v-else>
                            <HeadlessMenuItem>
                                <NuxtLink class="cursor-pointer" @click="logout">
                                    <div class="text-left p-3 font-medium btn-danger w-full">
                                        <Icon class="size-4 mr-2" name="solar:logout-2-broken" />
                                        <span>Logout</span>
                                    </div>
                                </NuxtLink>
                            </HeadlessMenuItem>
                        </template>
                    </HeadlessMenuItems>
                </div>
            </TransitionSlide>
        </HeadlessMenu>
    </div>
</template>
