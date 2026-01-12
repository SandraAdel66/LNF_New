<script setup lang="ts">
import { ref } from 'vue';

const route = useRoute();
const headerMenuId = ref<number>(useSettingValue('header_menu'));
const hoveredItem = ref<number | null>(null);
let hoverTimeout: NodeJS.Timeout | null = null;

const { data: headerMenu } = await useApiFetch(`/api/get-menu/${headerMenuId.value}`, {
    lazy: true,
    transform: (headerMenu) => (headerMenu as ApiResponse).data as NavigationMenu,
});

// Hover functions with delay
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

// Clean up timeout
onUnmounted(() => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
});
</script>

<template>
    <div class="w-full bg-[#1A4480]">
        <div class="container mx-auto px-4 lg:px-8">
            <!-- Main container with space between menu and button -->
            <div class="flex items-center justify-between py-2 gap-4">
                <!-- Menu Items (Left Side) -->
                <div class="flex-1">
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
                                            class="flex items-center gap-3 py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                                            :class="[
                                                route.fullPath === item.link 
                                                    ? 'text-white font-semibold' 
                                                    : 'text-white/90',
                                                hoveredItem === item.id && 'text-white bg-white/20'
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

                                        <!-- Underline for active/hover -->
                                        <span 
                                            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-white transition-all duration-300 w-0"
                                            :class="[
                                                route.fullPath === item.link ? 'w-8/12 opacity-100' : 'opacity-0',
                                                hoveredItem === item.id && 'w-8/12 opacity-100'
                                            ]"
                                        ></span>
                                    </div>

                                    <!-- Submenu Dropdown -->
                                    <div 
                                        v-show="hoveredItem === item.id"
                                        class="absolute left-1/2 transform -translate-x-1/2 top-full z-50 pt-3 transition-all duration-300"
                                        :class="hoveredItem === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'"
                                    >
                                        <div class="bg-white rounded-lg shadow-xl overflow-hidden min-w-[220px] border border-gray-200">
                                            <div v-for="child in item.children" :key="child.id">
                                                <NuxtLink
                                                    :href="child.link"
                                                    class="flex items-center gap-3 whitespace-nowrap px-4 py-3 text-gray-700 hover:bg-[#1A4480] hover:text-white transition-all duration-200"
                                                    :class="route.fullPath === child.link && 'text-[#1A4480] font-semibold bg-gray-100'"
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
                                            hoveredItem === item.id && 'text-white bg-white/20'
                                        ]"
                                    >
                                        <Icon v-if="item.icon" :name="item.icon" class="shrink-0 size-5" />
                                        <span class="leading-10 capitalize">{{ item.name }}</span>
                                    </NuxtLink>

                                    <!-- Underline for active/hover -->
                                    <span 
                                        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-white transition-all duration-300 w-0"
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

                <!-- Application Form Button (Right Side) -->
                <div class="flex-shrink-0 mr-5">
                    <NuxtLink href="/application-form">
                        <button class="btn bg-white text-[#1A4480] font-bold hover:bg-gray-100 hover:scale-[1.02] gap-3 px-6 border-0 transition-all duration-300">
                            <Icon name="solar:documents-linear" class="size-5" />
                            <span>Application Form</span>
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>