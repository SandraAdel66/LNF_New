<script lang="ts" setup>
const props = defineProps<{
    menu: NavigationMenu;
}>();
</script>

<template>
    <ul v-if="props.menu" class="flex items-center gap-4 text-[12px] xl:text-[14px]">
        <template v-for="item in props.menu.subMenus" :key="item.id">
            <ApplicationHeaderMenuItem :item="item" />
        </template>
    </ul>
</template>
