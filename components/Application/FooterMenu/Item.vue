<script lang="ts" setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <li v-if="item.active">
        <NuxtLink
            :target="item.type ? '_self' : '_blank'"
            :to="item.link"
            class="whitespace-nowrap font-light py-1 duration-300 !my-0 ease-in-out hover:ml-2 text-xs hover:text-blue-500"
        >
            {{ item.name }}
        </NuxtLink>
    </li>
</template>
