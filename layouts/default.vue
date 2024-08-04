<script lang="ts" setup>
// Data
</script>
<template>
    <div class="relative flex min-h-screen flex-col">
        <ToastList />
        <TheHeader />
        <main class="grow z-50">
            <slot />
        </main>
        <TheFooter />
    </div>
</template>
