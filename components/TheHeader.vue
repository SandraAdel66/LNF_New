<script setup lang="ts">
const route = useRoute();

const headerMenuId = ref<number>(useSettingValue('header_menu'));

const { data: headerMenu } = await useApiFetch(`/api/get-menu/${headerMenuId.value}`, {
    lazy: true,
    transform: (headerMenu) => (headerMenu as ApiResponse).data as NavigationMenu,
});
</script>

<template>
    <div class="w-full">
        <div class="sm:px-12 px-6 py-4 flex items-center gap-5 justify-between container">
            <NuxtLink href="/">
                <NuxtImg class="h-24 shrink-0" title="Logistics Network Federation" alt="Logistics Network Federation" src="/images/lnf-logo.svg" />
            </NuxtLink>
            <NuxtLink href="/application-form">
                <button class="btn btn-primary gap-3 px-6">
                    <Icon name="solar:documents-linear" class="size-5" />
                    <span>Application Form</span>
                </button>
            </NuxtLink>
        </div>
        <div class="bg-secondary text-slate-100 px-6">
            <div class="container px-6">
                <ul class="flex items-center divide-x divide-slate-100/10">
                    <template v-for="item in (headerMenu as NavigationMenu).menuItems as NavigationMenuItem[]" :key="item.id">
                        <template v-if="item.children.length > 0">
                            <li>
                                <HeadlessMenu as="div" class="relative group">
                                    <HeadlessMenuButton
                                        class="flex items-center gap-3 py-2 px-3 hover:text-blue-400 whitespace-nowrap cursor-pointer"
                                        :class="route.fullPath === item.link && 'bg-primary'"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5 opacity-75" />
                                        <span class="text-sm leading-10 capitalize">{{ item.name }}</span>
                                        <Icon name="solar:alt-arrow-down-linear" class="group-hover:-rotate-90 transition-all shrink-0 size-4 opacity-75" />
                                    </HeadlessMenuButton>
                                    <TransitionExpand>
                                        <HeadlessMenuItems
                                            class="absolute left-0 ease-in-out duration-1000 bg-secondary overflow-hidden text-slate-100 mt-1 rounded-lg shadow-lg z-50"
                                        >
                                            <HeadlessMenuItem v-for="child in item.children" :key="child.id">
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
                                    <span class="text-sm leading-10 capitalize">{{ item.name }}</span>
                                </NuxtLink>
                            </li>
                        </template>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
