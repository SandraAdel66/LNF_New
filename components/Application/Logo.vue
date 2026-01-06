<script lang="ts" setup>
const resources = useResourceStore();
const settings = resources?.settings;
const brand = ref({
    name: settings ? useSettingValue('app_name') : 'Logistics Network Federation',
    logo: useSettingValue('app_logo_dark'),
});
</script>

<template>
    <NuxtLink to="/">
        <NuxtImg :alt="brand.name" :src="brand.logo" :title="brand.name" class="md:h-20 h-12 w-fit object-contain" height="100%" loading="lazy" preload quality="80" width="100%" />
    </NuxtLink>
</template>
