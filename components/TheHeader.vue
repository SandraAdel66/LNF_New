<script setup lang="ts">
import { ref, onMounted } from 'vue';

const route = useRoute();
const isMobileMenuOpen = ref(false);
const activeSubMenu = ref<number | null>(null);
let hoverTimeout: NodeJS.Timeout | null = null;

// إغلاق المنيو
const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    activeSubMenu.value = null;
};

// تبديل submenu للموبايل
const toggleSubMenu = (id: number) => {
    activeSubMenu.value = activeSubMenu.value === id ? null : id;
};

// إغلاق عند تغيير حجم الشاشة
onMounted(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
        if (hoverTimeout) clearTimeout(hoverTimeout);
    };
});

// تأكد من تنظيف الـ timeout
onUnmounted(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
});
</script>

<template>
    <div class="w-full bg-[#0f2c49] ">
        <div class="sm:px-12 px-6 py-2 flex items-center gap-5 justify-between container">
            <!-- اللوجو -->
            <NuxtLink href="/">
                <NuxtImg 
                    class="h-20 shrink-0" 
                    :title="useSettingValue('app_name')" 
                    :alt="useSettingValue('app_name')" 
                    :src="useSettingValue('app_logo_dark')" 
                />
            </NuxtLink>


            <div class="lg:block hidden">
                <div class="flex items-center justify-end">
                    <input
                        type="text"
                        placeholder="Search LNF here"
                         class="h-10 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                     />

                 <!-- Search button -->
                    <button class="h-10 bg-[#FFBE2E] px-4 py-2 rounded-r-md flex items-center justify-center hover:brightness-90 transition">
                <!-- Search icon (using Heroicons style SVG) -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                    </button>
                </div>

            </div>

            <!-- Mobile Menu Button -->
            <button 
                @click="isMobileMenuOpen = true"
                class="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
                <Icon name="heroicons:bars-3" class="size-6" />
            </button>
        </div>

        <!-- Mobile Menu -->
        <div 
            v-if="isMobileMenuOpen"
            class="fixed inset-0 bg-black/50 z-50 lg:hidden"
            @click="closeMobileMenu"
        >
            <div 
                class="absolute right-0 top-0 h-full w-80 bg-[#0f2c49] shadow-xl"
                @click.stop
            >

                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 class="text-xl font-bold text-white">Menu</h3>
                    <button 
                        @click="closeMobileMenu"
                        class="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                    >
                        <Icon name="heroicons:x-mark" class="size-6" />
                    </button>
                </div>


                <div class="overflow-y-auto h-[calc(100vh-120px)]">

                    <div class="p-6">
                        <NuxtLink href="/application-form" @click="closeMobileMenu">
                            <button class="w-full bg-white text-[#0f2c49] hover:bg-gray-100 hover:scale-[1.02] py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300">
                                <Icon name="solar:documents-linear" class="size-5" />
                                <span>Application Form</span>
                            </button>
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>