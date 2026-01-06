<script lang="ts" setup>
const props = defineProps<{
    item: NavigationMenuItem;
}>();
</script>

<template>
    <template v-if="props.item.children.length > 0">
        <HeadlessMenu as="div" class="relative">
            <HeadlessMenuButton
                :class="['group relative overflow-hidden flex items-center px-2 py-3 cursor-pointer duration-150 hover:text-primary']"
                aria-label="Header Menu Dropdown"
            >
                <Icon v-if="props.item.icon" class="z-20 mr-2 size-5 text-slate-400 group-hover:text-primary" name="solar:list-down-minimalistic-broken" />
                <span class="z-20 font-medium">{{ props.item.name }}</span>
                <Icon :class="['ease-in-out duration-300 dark:text-slate-400 text-slate-600 size-4 ml-1.5']" name="solar:alt-arrow-down-broken" />
                <div class="z-10 absolute bottom-0 left-0 h-1 w-0 bg-warning rounded-full transition-all duration-300 group-hover:w-full" />
            </HeadlessMenuButton>
            <TransitionSlide>
                <HeadlessMenuItems class="absolute top-full right-0 mt-4 bg-white rounded-lg border shadow-md py-2 pl-4 w-52 divide-y divide-dashed">
                    <HeadlessMenuItem v-for="subItem in item?.children" :key="subItem.id" class="relative first:pt-0 last:pb-0 py-2">
                        <NuxtLink
                            :to="'/' + subItem.link"
                            class="dark:hover:text-primary hover:text-primary/75 hover:pl-4 relative overflow-hidden flex items-center cursor-pointer duration-300"
                        >
                            <Icon v-if="subItem.icon" :name="subItem.icon" class="mr-2 group-hover:mr-4 ease-in-out duration-300 size-5 text-slate-400 group-hover:text-white" />
                            <span class="font-medium group-hover:text-white">{{ subItem.name }}</span>
                        </NuxtLink>
                    </HeadlessMenuItem>
                </HeadlessMenuItems>
            </TransitionSlide>
        </HeadlessMenu>
    </template>
    <template v-else>
        <li class="group relative">
            <NuxtLink :href="'/' + props.item.link" class="relative overflow-hidden flex items-center px-2 py-3 cursor-pointer duration-150 group-hover:text-primary">
                <Icon v-if="props.item.icon" :name="props.item.icon" class="z-20 mr-2 size-5 text-slate-400 group-hover:text-primary" />
                <span class="z-20 font-medium">{{ props.item.name }}</span>
                <div class="z-10 absolute bottom-0 left-0 h-1 w-0 bg-warning rounded-full transition-all duration-300 group-hover:w-full" />
            </NuxtLink>
        </li>
    </template>
</template>
