<script lang="ts" setup>
defineProps<{
    member: Team;
}>();
</script>

<template>
    <div class="intro-x overflow-hidden flex flex-col h-full">
        <!-- Container للصورة مع نسبة ثابتة -->
        <div class="relative aspect-square w-full overflow-hidden ">
            <NuxtImg 
                class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-40 scale-90 transform-gpu"
                :src="member.imageUrl" 
                :alt="member.name" 
                :title="member.name + ' - ' + member.title"
                format="webp"
                quality="100"
                sizes="sm:100vw md:50vw lg:25vw"
                :modifiers="{ fit: 'cover', gravity: 'face' }"
            />
        </div>
        
        <!-- محتوى النص - يأخذ المساحة المتبقية -->
        <div class="flex-1 px-4 py-4 text-center  bg-white">
            <div class="space-y-1.5">
                <div class="text-base font-bold text-[#0f2c49] truncate">
                    {{ member.name }}
                </div>
                <div class="text-sm font-medium text-gray-600 truncate">
                    {{ member.title }}
                </div>
                <div class="text-xs font-light text-gray-500 truncate">
                    {{ member.network }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* جعل جميع الكروت بنفس الارتفاع */
.aspect-square {
    aspect-ratio: 1 / 1;
}

/* تحسين التجاوب */
@media (max-width: 640px) {
    .aspect-square {
        aspect-ratio: 4/5;
    }
}

/* تأثير hover */
.intro-x:hover img {
    transform: scale(1.05);
}
</style>