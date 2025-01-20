<script lang="ts" setup>
const props = defineProps<{
    section: PageSection;
}>();
</script>

<template>
    <div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2 py-12 text-center">
                <div v-if="props.section.title" class="text-4xl lg:text-6xl font-extrabold" v-html="props.section.title" />
                <div v-if="props.section.subTitle" class="text-2xl font-semibold" v-html="props.section.subTitle" />
                <div v-if="props.section.description" class="text-lg font-semibold" v-html="props.section.description" />
            </div>
            <div class="flex gap-5 max-w-3xl mx-auto">
                <NuxtLink v-if="props.section.buttonOneActive">
                    <button :class="'btn  gap-2 btn-' + props.section.buttonStyleOne">
                        <Icon v-if="props.section.buttonIconOne" :name="props.section.buttonIconOne" class="size-5" />
                        {{ props.section.buttonTextOne }}
                    </button>
                </NuxtLink>
                <NuxtLink v-if="props.section.buttonTwoActive">
                    <button :class="'btn  gap-2 btn-' + props.section.buttonStyleTwo">
                        <Icon v-if="props.section.buttonIconTwo" :name="props.section.buttonIconTwo" class="size-5" />
                        {{ props.section.buttonTextTwo }}
                    </button>
                </NuxtLink>
            </div>
            <div class="max-w-5xl mx-auto flex justify-center mt-8">
                <div class="relative max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch md:max-w-2xl lg:max-w-none">
                    <div aria-hidden="true" class="absolute top-1/2 w-full h-1 bg-gradient-to-r from-primary to-primary-hover hidden lg:block" />
                    <div
                        v-for="(item, index) in props.section.children"
                        :key="item.id"
                        class="relative flex h-full flex-col items-center p-6 bg-white rounded-3xl shadow-xl intro-x"
                    >
                        <div class="flex justify-center items-center h-12 w-12 rounded-tl-full rounded-tr-full rounded-bl-full bg-primary text-white font-bold mb-3 text-lg">
                            {{ index + 1 }}
                        </div>
                        <h4 class="text-lg font-bold text-primary leading-snug tracking-tight mb-1">{{ item.title }}</h4>
                        <p class="text-center text-base font-light line-clamp-4">{{ item.des }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
