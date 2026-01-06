<script lang="ts" setup>
const props = defineProps<{
    content: Content[];
}>();
</script>

<template>
    <div class="bg-white p-5 rounded-3xl">
        <template v-for="section in props.content" :key="section.id">
            <template v-if="section.type === 'heading'">
                <div class="intro-y py-2 font-semibold text-primary text-left">
                    <h2 v-html="section.detail" />
                </div>
            </template>
            <template v-if="section.type === 'paragraph'">
                <div class="intro-y py-2 text-justify">
                    <div v-html="section.detail" />
                </div>
            </template>
            <template v-if="section.type === 'section-with-image'">
                <div class="intro-y py-2 text-justify">
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 items-start">
                        <div v-html="section.detail" />
                        <div>
                            <NuxtImg :alt="section.name" :src="section.imageUrl" :title="section.name" class="w-full h-full object-contain rounded-md" />
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="section.type === 'list'">
                <div class="intro-y py-2 ml-6 text-justify">
                    <ul class="list-disc list-outside ml-6">
                        <li v-for="(item, index) in section.items" :key="index" v-html="item.detail" />
                    </ul>
                </div>
            </template>
            <template v-if="section.type === 'image'">
                <div class="intro-y py-2 text-justify">
                    <NuxtImg :alt="section.name" :src="section.imageUrl" :title="section.name" class="w-full max-h-80 object-cover rounded-md" />
                </div>
            </template>
            <template v-if="section.type === 'divider'">
                <div class="intro-y my-2 border-b border-dashed border-slate-200 content-['']" />
            </template>
        </template>
    </div>
</template>
