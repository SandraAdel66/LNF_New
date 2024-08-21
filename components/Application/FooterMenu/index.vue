<script lang="ts" setup>
defineProps({
    menu: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="hidden md:block intro-y h-full">
        <h2 class="font-medium text-blue-500 text-sm whitespace-nowrap">
            {{ menu.name }}
        </h2>
        <ul class="mt-4 flex flex-col gap-2 text-sm">
            <template v-for="item in menu.menuItems" :key="item.id">
                <ApplicationFooterMenuItem :item="item" />
            </template>
        </ul>
    </div>
</template>
