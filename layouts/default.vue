<script lang="ts" setup>
// Data
</script>
<template>
    <div class="relative flex min-h-screen flex-col overflow-x-hidden">
        <ToastList />
        <TheHeader />
        <main class="grow">
            <slot />
        </main>
        <TheFooter />
    </div>
</template>
