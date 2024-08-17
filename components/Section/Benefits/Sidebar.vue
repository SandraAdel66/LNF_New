<script lang="ts" setup>
const resources = useResourceStore();
const props = defineProps<{
    activeSlug: string;
}>();
</script>

<template>
    <div class="text-sm">
        <div class="flex flex-col gap-1.5">
            <template v-for="benefit in resources.benefits" :key="benefit.id">
                <NuxtLink
                    :class="props.activeSlug === benefit.slug && '!bg-primary !text-white'"
                    :href="'/benefit/' + benefit.slug"
                    class="py-2 rounded-full px-3 bg-white group hover:bg-primary hover:text-white intro-y"
                >
                    <div class="flex items-center gap-2 group-hover:ml-4 transition-all">
                        <Icon class="size-5 opacity-75" name="solar:round-alt-arrow-right-line-duotone" />
                        {{ benefit.name }}
                    </div>
                </NuxtLink>
            </template>
        </div>
    </div>
</template>
