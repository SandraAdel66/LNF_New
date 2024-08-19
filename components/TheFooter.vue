<script setup>
const footerData = ref({
    copyright: useSettingValue('copyrights_text') ?? null,
    aboutBrandShort: useSettingValue('app_short_description') ?? null,
});
</script>

<template>
    <div class="bg-secondary text-white px-4 dark:text-slate-300 -shadow-md">
        <div class="text-sm">
            <div class="mx-auto container px-8 py-4">
                <div class="md:flex md:items-center md:justify-between md:gap-8 md:space-y-0 space-y-8">
                    <div class="-intro-x sm:text-sm text-xs sm:text-left text-center">
                        {{ footerData.copyright }}
                    </div>
                    <ApplicationSocialMediaList />
                </div>
            </div>
        </div>
    </div>
</template>
