<script setup lang="ts">
// Data
</script>
<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <div>
                <NuxtLoadingIndicator :duration="5000" :height="4" :throttle="0" class="z-[9999]" color="rgb(26 101 164)" />
                <NuxtPage />
            </div>
        </NuxtLayout>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
}
</style>
