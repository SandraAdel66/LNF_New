<script lang="ts" setup>
defineProps({
    menu: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="md:col-span-4 lg:col-span-2 hidden md:block intro-y h-full">
        <h2 class="font-medium uppercase dark:text-primary text-primary text-sm whitespace-nowrap">
            {{ menu.name }}
        </h2>
        <ul class="mt-4 flex flex-col gap-2 text-sm">
            <template v-for="item in menu.subMenus" :key="item.id">
                <ApplicationFooterMenuItem :item="item" />
            </template>
        </ul>
    </div>
</template>
