<script setup>
const footerData = ref({
    copyright: useSettingValue('copyrights_text') ?? null,
    address: useSettingValue('office_address') ?? null,
    aboutBrandShort: useSettingValue('app_short_description') ?? null,

    menus: {
        footerMenuOne: undefined,
        footerMenuTwo: undefined,
    },
});
const getMenuItems = async (id) => {
    const { data: menu, error } = await useApiFetch(`/api/get-menu/${id}`, {
        transform: (headerMenu) => headerMenu.data,
    });
    if (menu.value) {
        return menu.value;
    }
    if (error.value) {
        console.log('Error', error.value);
    }
};

const footerMenuOne = async () => {
    const menuId = await useSettingValue('footer_menu_1');
    footerData.value.menus.footerMenuOne = await getMenuItems(menuId);
};

const footerMenuTwo = async () => {
    const menuId = await useSettingValue('footer_menu_2');
    footerData.value.menus.footerMenuTwo = await getMenuItems(menuId);
};

onMounted(async () => {
    await footerMenuOne();
    await footerMenuTwo();
});
</script>

<template>
    <div class="bg-navy px-4 text-white shadow-md py-6">
        <div class="container px-8 py-6">
            <div class="grid gap-8 md:grid-cols-12">
                <div class="intro-y lg:col-span-4 h-full hidden lg:block">
                    <ApplicationLogo class="w-64" />
                    <div class="mt-4">
                        {{ footerData.address }}
                    </div>
                </div>
                <ApplicationFooterMenu class="lg:col-span-2" v-if="footerData.menus.footerMenuOne" :menu="footerData.menus.footerMenuOne" />
                <ApplicationFooterMenu class="lg:col-span-2" v-if="footerData.menus.footerMenuTwo" :menu="footerData.menus.footerMenuTwo" />
                <div class="lg:col-span-4 hidden md:block intro-y h-full">
                    <h2 class="font-medium text-white text-sm whitespace-nowrap">Bank Details</h2>
                    <div class="mt-2">
                        <ul class="divide-y divide-dashed divide-slate-300/75 leading-tight">
                            <li class="text-xs text-left py-2">
                                <div class="opacity-75">SWIFT Code</div>
                                <div class="mt-1.5">{{ useSettingValue('swift_code') }}</div>
                            </li>
                            <li class="text-xs text-left py-2">
                                <div class="opacity-75">USD IBAN</div>
                                <div class="mt-1.5">{{ useSettingValue('usd_ipan') }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-sm">
            <div class="mx-auto max-w-7xl border-t border-dashed border-white/20 dark:border-white/10 px-8 py-2">
                <div class="md:flex md:items-center md:justify-between md:gap-8 md:space-y-0 space-y-8">
                    <div class="-intro-x sm:text-sm text-xs sm:text-left text-center">
                        {{ footerData.copyright }}
                    </div>
                    <ApplicationSocialMediaList />
                </div>
            </div>
        </div>
    </div>
</template>
