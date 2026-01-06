<script setup lang="ts">
import { ref, onMounted } from 'vue';

const route = useRoute();
const headerMenuId = ref<number>(useSettingValue('header_menu'));
const isMobileMenuOpen = ref(false);
const activeSubMenu = ref<number | null>(null);
const hoveredItem = ref<number | null>(null);
let hoverTimeout: NodeJS.Timeout | null = null;

const { data: headerMenu } = await useApiFetch(`/api/get-menu/${headerMenuId.value}`, {
    lazy: true,
    transform: (headerMenu) => (headerMenu as ApiResponse).data as NavigationMenu,
});

// إغلاق المنيو
const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
    activeSubMenu.value = null;
    hoveredItem.value = null;
};

// تبديل submenu للموبايل
const toggleSubMenu = (id: number) => {
    activeSubMenu.value = activeSubMenu.value === id ? null : id;
};

// Hover functions مع تأخير
const handleMouseEnter = (id: number) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        hoveredItem.value = id;
    }, 150);
};

const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        hoveredItem.value = null;
    }, 300);
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
    <div class="w-full bg-[#0f2c49]">
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

            <!-- Desktop Menu -->
            <div class="lg:block hidden">
                <div class="flex gap-5 items-center justify-end">
                    <NuxtLink href="/application-form">
                        <button class="btn btn-sm bg-white text-[#0f2c49] hover:bg-gray-100 hover:scale-[1.02] gap-3 px-6 border-0 transition-all duration-300">
                            <Icon name="solar:documents-linear" class="size-5" />
                            <span>Application Form</span>
                        </button>
                    </NuxtLink>
                </div>
                <div class="mt-1 flex justify-end">
                    <ul class="flex items-center gap-1 font-medium">
                        <template v-for="item in (headerMenu as NavigationMenu).menuItems as NavigationMenuItem[]" :key="item.id">
                            <template v-if="item.children.length > 0">
                                <li 
                                    class="relative"
                                    @mouseenter="() => handleMouseEnter(item.id)"
                                    @mouseleave="handleMouseLeave"
                                >
                                    <div class="relative group">
                                        <NuxtLink
                                            :href="item.link"
                                            class="flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300"
                                            :class="[
                                                route.fullPath === item.link 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/90',
                                                hoveredItem === item.id && 'text-white bg-white/10'
                                            ]"
                                        >
                                            <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                            <span class="leading-10 capitalize">{{ item.name }}</span>
                                            <Icon 
                                                name="solar:alt-arrow-down-linear" 
                                                class="transition-transform duration-300 shrink-0 size-4"
                                                :class="hoveredItem === item.id && 'rotate-180'" 
                                            />
                                        </NuxtLink>
                                        
                                        <!-- خط تحت العنصر النشط والـ hover -->
                                        <span 
                                            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-white/80 transition-all duration-300 w-0"
                                            :class="[
                                                route.fullPath === item.link ? 'w-8/12 opacity-100' : 'opacity-0',
                                                hoveredItem === item.id && 'w-8/12 opacity-100'
                                            ]"
                                        ></span>
                                    </div>
                                    
                                    <!-- Submenu -->
                                    <div 
                                        v-show="hoveredItem === item.id"
                                        class="absolute left-1/2 transform -translate-x-1/2 top-full z-50 pt-3 transition-all duration-300"
                                        :class="hoveredItem === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'"
                                    >
                                        <div class="bg-white rounded-lg shadow-xl overflow-hidden min-w-[220px] border border-gray-200">
                                            <div v-for="child in item.children" :key="child.id">
                                                <NuxtLink
                                                    :href="child.link"
                                                    class="flex items-center gap-3 whitespace-nowrap px-4 py-3 text-gray-700 hover:bg-[#0f2c49] hover:text-white transition-all duration-200"
                                                    :class="route.fullPath === child.link && 'text-[#0f2c49] font-semibold bg-gray-100'"
                                                >
                                                    <Icon v-if="child.icon" :name="child.icon" class="shrink-0 size-4" />
                                                    <span class="text-sm font-medium">{{ child.name }}</span>
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </template>
                            <template v-else>
                                <li 
                                    @mouseenter="() => handleMouseEnter(item.id)"
                                    @mouseleave="handleMouseLeave"
                                    class="relative group"
                                >
                                    <NuxtLink
                                        :href="item.link"
                                        class="flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300"
                                        :class="[
                                            route.fullPath === item.link 
                                                ? 'text-white font-semibold' 
                                                : 'text-white/90',
                                            hoveredItem === item.id && 'text-white bg-white/10'
                                        ]"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                        <span class="leading-10 capitalize">{{ item.name }}</span>
                                    </NuxtLink>
                                    
                                    <!-- خط تحت العنصر النشط والـ hover -->
                                    <span 
                                        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-white/80 transition-all duration-300 w-0"
                                        :class="[
                                            route.fullPath === item.link ? 'w-8/12 opacity-100' : 'opacity-0',
                                            hoveredItem === item.id && 'w-8/12 opacity-100'
                                        ]"
                                    ></span>
                                </li>
                            </template>
                        </template>
                    </ul>
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
                <!-- Header -->
                <div class="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 class="text-xl font-bold text-white">Menu</h3>
                    <button 
                        @click="closeMobileMenu"
                        class="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                    >
                        <Icon name="heroicons:x-mark" class="size-6" />
                    </button>
                </div>

                <!-- Content -->
                <div class="overflow-y-auto h-[calc(100vh-120px)]">
                    <!-- Application Form Button -->
                    <div class="p-6">
                        <NuxtLink href="/application-form" @click="closeMobileMenu">
                            <button class="w-full bg-white text-[#0f2c49] hover:bg-gray-100 hover:scale-[1.02] py-3 rounded-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300">
                                <Icon name="solar:documents-linear" class="size-5" />
                                <span>Application Form</span>
                            </button>
                        </NuxtLink>
                    </div>

                    <!-- Menu Items -->
                    <div class="px-4 pb-6">
                        <template v-for="item in (headerMenu as NavigationMenu).menuItems as NavigationMenuItem[]" :key="item.id">
                            <!-- Items with Children -->
                            <div v-if="item.children.length > 0" class="mb-2">
                                <button
                                    @click="toggleSubMenu(item.id)"
                                    class="w-full flex items-center justify-between py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                    :class="[
                                        route.fullPath === item.link && 'text-white font-semibold bg-white/10',
                                        activeSubMenu === item.id && 'bg-white/10'
                                    ]"
                                >
                                    <div class="flex items-center gap-3">
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                        <span class="font-medium">{{ item.name }}</span>
                                    </div>
                                    <Icon 
                                        :name="activeSubMenu === item.id ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                                        class="size-4 transition-transform duration-300"
                                        :class="activeSubMenu === item.id && 'rotate-180'"
                                    />
                                </button>
                                
                                <!-- Submenu -->
                                <div 
                                    v-if="activeSubMenu === item.id"
                                    class="ml-8 mt-1 space-y-1"
                                >
                                    <NuxtLink
                                        v-for="child in item.children"
                                        :key="child.id"
                                        :href="child.link"
                                        @click="closeMobileMenu"
                                        class="block py-2 px-4 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
                                        :class="route.fullPath === child.link && 'text-white font-semibold bg-white/10'"
                                    >
                                        <div class="flex items-center gap-3">
                                            <Icon v-if="child.icon" :name="child.icon" class="shrink-0 size-4" />
                                            <span>{{ child.name }}</span>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                            
                            <!-- Single Items -->
                            <NuxtLink
                                v-else
                                :href="item.link"
                                @click="closeMobileMenu"
                                class="block py-3 px-4 text-white hover:bg-white/10 rounded-lg mb-2 transition-all duration-300"
                                :class="route.fullPath === item.link && 'text-white font-semibold bg-white/10'"
                            >
                                <div class="flex items-center gap-3">
                                    <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                    <span class="font-medium">{{ item.name }}</span>
                                </div>
                            </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>