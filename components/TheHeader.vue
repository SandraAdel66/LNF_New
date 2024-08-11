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
        childMenu: [
            {
                id: 8,
                name: 'Services One',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-one',
                type: true,
                target: false,
            },
            {
                id: 9,
                name: 'Services Two',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-two',
                type: true,
                target: false,
            },
            {
                id: 10,
                name: 'Services Three',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-three',
                type: true,
                target: false,
            },
        ],
    },
    {
        id: 4,
        name: 'Membership Guidelines',
        icon: 'solar:clipboard-list-linear',
        link: '/portfolio',
        type: true,
        target: false,
    },
    {
        id: 5,
        name: 'Events',
        icon: 'solar:calendar-linear',
        link: '/events',
        type: true,
        target: false,
        childMenu: [
            {
                id: 8,
                name: 'Services One',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-one',
                type: true,
                target: false,
            },
            {
                id: 9,
                name: 'Services Two',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-two',
                type: true,
                target: false,
            },
            {
                id: 10,
                name: 'Services Three',
                icon: 'solar:maximize-square-2-linear',
                link: '/service/some-service-name-three',
                type: true,
                target: false,
            },
        ],
    },
    {
        id: 6,
        name: 'News',
        icon: 'solar:document-text-linear',
        link: '/blog',
        type: true,
        target: false,
    },
    {
        id: 7,
        name: 'Contact',
        icon: 'solar:letter-outline',
        link: '/contact',
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
                <NuxtImg class="h-24 shrink-0" title="Logistics Network Federation" alt="Logistics Network Federation" src="/images/lnf-logo.svg" />
            </NuxtLink>
            <NuxtLink href="/application-form">
                <button class="btn btn-rounded btn-primary gap-3 px-6">
                    <Icon name="solar:documents-linear" class="size-5" />
                    <span>Application Form</span>
                </button>
            </NuxtLink>
        </div>
        <div class="bg-secondary text-slate-100 px-6 md:px-12">
            <div class="container px-6 md:px-12">
                <ul class="flex items-center divide-x divide-slate-100/10">
                    <template v-for="item in headerMenu" :key="item.id">
                        <template v-if="item.childMenu">
                            <li>
                                <HeadlessMenu as="div" class="relative group">
                                    <HeadlessMenuButton
                                        class="flex items-center gap-3 py-2 px-3 hover:text-blue-400 whitespace-nowrap cursor-pointer"
                                        :class="route.fullPath === item.link && 'bg-primary'"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5 opacity-75" />
                                        <span class="text-sm leading-10">{{ item.name }}</span>
                                        <Icon v-if="item.childMenu" name="solar:alt-arrow-down-linear" class="group-hover:-rotate-90 transition-all shrink-0 size-4 opacity-75" />
                                    </HeadlessMenuButton>
                                    <TransitionExpand>
                                        <HeadlessMenuItems
                                            class="absolute left-0 ease-in-out duration-1000 bg-secondary overflow-hidden text-slate-100 mt-1 rounded-lg shadow-lg z-50"
                                        >
                                            <HeadlessMenuItem v-for="child in item.childMenu" :key="child.id">
                                                <NuxtLink :href="child.link" class="flex items-center gap-3 whitespace-nowrap px-3 py-0.5 hover:bg-primary">
                                                    <Icon v-if="child.icon" :name="child.icon" class="shrink-0 size-4 opacity-75" />
                                                    <span class="text-sm leading-10">{{ child.name }}</span>
                                                </NuxtLink>
                                            </HeadlessMenuItem>
                                        </HeadlessMenuItems>
                                    </TransitionExpand>
                                </HeadlessMenu>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <NuxtLink
                                    :href="item.link"
                                    class="flex items-center gap-3 py-2 px-3 hover:text-blue-400 whitespace-nowrap cursor-pointer"
                                    :class="route.fullPath === item.link && 'bg-primary'"
                                >
                                    <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5 opacity-75" />
                                    <span class="text-sm leading-10">{{ item.name }}</span>
                                </NuxtLink>
                            </li>
                        </template>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.group:hover .group-hover\:block {
    display: inline-flex;
}
</style>
