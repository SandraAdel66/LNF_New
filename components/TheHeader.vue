<script setup lang="ts">
const route = useRoute();

const headerMenuId = ref<number>(useSettingValue('header_menu'));

const { data: headerMenu } = await useApiFetch(`/api/get-menu/${headerMenuId.value}`, {
    lazy: true,
    transform: (headerMenu) => (headerMenu as ApiResponse).data as NavigationMenu,
});
</script>

<template>
    <div class="w-full border-b-4 border-primary/85">
        <div class="sm:px-12 px-6 py-2 flex items-center gap-5 justify-between container">
            <NuxtLink href="/">
                <NuxtImg class="h-20 shrink-0" title="Logistics Network Federation" alt="Logistics Network Federation" src="/images/lnf-logo.svg" />
            </NuxtLink>
            <div>
                <div class="flex gap-5 items-center justify-end">
                    <div class="text-xs font-medium">
                        <ul class="flex items-center gap-5 opacity-75">
                            <li>
                                <NuxtLink class="hover:text-primary transition-colors" href="/policies">Policies</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="hover:text-primary transition-colors" href="/faq">FAQ</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink class="hover:text-primary transition-colors" href="/terms-and-conditions">Terms & Conditions</NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <NuxtLink href="/application-form">
                        <button class="btn btn-sm btn-primary gap-3 px-6">
                            <Icon name="solar:documents-linear" class="size-5" />
                            <span>Application Form</span>
                        </button>
                    </NuxtLink>
                </div>
                <div class="mt-1 flex justify-end">
                    <ul class="flex items-center divide-x divide-slate-100/10 font-medium">
                        <template v-for="item in (headerMenu as NavigationMenu).menuItems as NavigationMenuItem[]" :key="item.id">
                            <template v-if="item.children.length > 0">
                                <li>
                                    <HeadlessMenu as="div" class="relative group">
                                        <HeadlessMenuButton
                                            class="flex items-center gap-3 py-2 px-3 hover:text-primary whitespace-nowrap cursor-pointer"
                                            :class="route.fullPath === item.link && 'text-primary font-semibold'"
                                        >
                                            <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                            <span class="leading-10 capitalize">{{ item.name }}</span>
                                            <Icon name="solar:alt-arrow-down-linear" class="group-hover:-rotate-90 transition-all shrink-0 size-4" />
                                        </HeadlessMenuButton>
                                        <TransitionExpand>
                                            <HeadlessMenuItems
                                                class="absolute left-0 text-xs border border-slate-200 ease-in-out duration-1000 bg-slate-100 overflow-hidden mt-4 rounded-lg shadow-lg z-50"
                                            >
                                                <HeadlessMenuItem v-for="child in item.children" :key="child.id">
                                                    <NuxtLink
                                                        :href="child.link"
                                                        class="flex items-center gap-3 whitespace-nowrap px-3 transition-all hover:bg-primary hover:text-white"
                                                    >
                                                        <Icon v-if="child.icon" :name="child.icon" class="shrink-0 size-4" />
                                                        <span class="leading-10">{{ child.name }}</span>
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
                                        :class="route.fullPath === item.link && 'text-primary font-semibold'"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                        <span class="leading-10 capitalize">{{ item.name }}</span>
                                    </NuxtLink>
                                </li>
                            </template>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
