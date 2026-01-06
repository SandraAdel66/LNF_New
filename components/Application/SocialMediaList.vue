<script lang="ts" setup>
const socialMediaLinks = ref({
    facebook: useSettingValue('social_facebook') ?? null,
    linkedin: useSettingValue('social_linkedin') ?? null,
    youtube: useSettingValue('social_youtube') ?? null,
    instagram: useSettingValue('social_instagram') ?? null,
    twitter: useSettingValue('social_twitter') ?? null,
});
</script>

<template>
    <ul class="flex items-center gap-4 md:mx-0 mx-auto place-content-center md:place-content-end">
        <li class="intro-x">
            <a v-if="socialMediaLinks.facebook" :href="socialMediaLinks.facebook" aria-label="Facebook" rel="nofollow" target="_blank">
                <Icon class="size-6 duration-300 ease-in-out hover:text-primary" name="cib:facebook-f" />
            </a>
        </li>
        <li class="intro-x">
            <a v-if="socialMediaLinks.linkedin" :href="socialMediaLinks.linkedin" aria-label="Linkedin" rel="nofollow" target="_blank">
                <Icon class="size-6 duration-300 ease-in-out hover:text-primary" name="cib:linkedin" />
            </a>
        </li>
        <li class="intro-x">
            <a v-if="socialMediaLinks.youtube" :href="socialMediaLinks.youtube" aria-label="Youtube" rel="nofollow" target="_blank">
                <Icon class="size-6 duration-300 ease-in-out hover:text-primary" name="cib:youtube" />
            </a>
        </li>
        <li class="intro-x">
            <a v-if="socialMediaLinks.instagram" :href="socialMediaLinks.instagram" aria-label="Instagram" rel="nofollow" target="_blank">
                <Icon class="size-6 duration-300 ease-in-out hover:text-primary" name="item.icon" />
            </a>
        </li>
        <li class="intro-x">
            <a v-if="socialMediaLinks.twitter" :href="socialMediaLinks.twitter" aria-label="Twitter" rel="nofollow" target="_blank">
                <Icon class="size-6 duration-300 ease-in-out hover:text-primary" name="item.icon" />
            </a>
        </li>
    </ul>
</template>
