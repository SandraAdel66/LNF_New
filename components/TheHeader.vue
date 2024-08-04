<script setup lang="ts">
const headerMenu = ref([
    {
        id: 1,
        name: 'Home',
        icon: 'solar:home-2-linear',
        link: '/',
        type: true,
        target: false,
    },
    {
        id: 2,
        name: 'About',
        icon: 'solar:info-square-linear',
        link: '/about',
        type: true,
        target: false,
    },
    {
        id: 3,
        name: 'Services',
        icon: 'solar:maximize-square-2-linear',
        link: '/services',
        type: true,
        target: false,
    },
    {
        id: 4,
        name: 'Portfolio',
        icon: 'solar:gallery-minimalistic-linear',
        link: '/portfolio',
        type: true,
        target: false,
    },
    {
        id: 5,
        name: 'Blog',
        icon: 'solar:document-text-linear',
        link: '/blog',
        type: true,
        target: false,
    },
]);

const route = useRoute();
</script>

<template>
    <div class="w-full">
        <div class="sm:px-12 px-6 py-4 flex items-center gap-5 justify-between container">
            <NuxtLink href="/">
                <NuxtImg class="h-14" title="Logistics Network Federation" alt="Logistics Network Federation" src="/images/amj-logo-green-dark.svg" />
            </NuxtLink>
            <div>
                <ul class="flex items-center gap-8">
                    <li v-for="item in headerMenu" :key="item.id" class="relative group">
                        <NuxtLink :href="item.link" class="flex items-center gap-3 hover:text-primary">
                            <Icon :name="item.icon" class="size-6 opacity-75" />
                            <span class="2xl:text-base text-sm leading-10 mt-1">{{ item.name }}</span>
                        </NuxtLink>
                        <div
                            :class="[
                                route.fullPath === item.link ? 'w-[110%]' : 'w-0',
                                'absolute group-hover:w-[110%] -bottom-3 rounded-full h-[4px] bg-primary ease-in-out duration-300',
                            ]"
                        />
                    </li>
                </ul>
            </div>
            <NuxtLink href="/contact">
                <button class="btn btn-rounded btn-primary gap-3 px-6">
                    <Icon name="solar:letter-outline" class="size-5" />
                    <span>Contact</span>
                </button>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped></style>
