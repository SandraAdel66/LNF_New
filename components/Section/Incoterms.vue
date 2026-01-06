<script lang="ts" setup>
const { data: terms, status } = await useApiFetch<ApiResponse>(`/api/incoterm-public`, {
    lazy: true,
    transform: (terms) => terms.data,
});
</script>

<template>
    <div v-if="status !== 'pending'" class="flex flex-col gap-8 max-w-5xl mx-auto px-6">
        <div v-for="item in terms" :key="item.id">
            <div class="flex flex-col rounded-2xl border overflow-hidden h-full">
                <div v-if="item.image" class="flex-shrink-0 overflow-hidden bg-white border-b border-slate-200">
                    <NuxtImg
                        :alt="item.name"
                        :src="item.imageUrl"
                        :title="item.name"
                        class="h-[27.6rem] w-full object-cover object-top group-hover:scale-125 ease-in-out duration-300 group-hover:rotate-3"
                    />
                </div>
                <div class="flex-1 bg-white pb-6 pt-4 px-6 flex flex-col justify-between">
                    <div class="flex-1">
                        <div class="text-xl font-semibold text-secondary flex items-center">
                            <div class="flex items-center">
                                <span class="text-primary">{{ item.title }}</span>
                                <span class="font-normal text-slate-600">, {{ item.code }}</span>
                            </div>
                        </div>
                        <p class="mt-3 text-lg text-slate-600 line-clamp-3">
                            {{ item.des }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
