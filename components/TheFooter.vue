<script setup>
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {useSettingKey} from "~/composables/useSettingKey.js";
const dataUser = useSettingKey();
console.log(dataUser)
const usdIpan = computed(() => dataUser.find(item => item.name === 'usd_ipan'));
const swiftCode = computed(() => dataUser.find(item => item.name === 'swift_code'));

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

onMounted(async () => {
    await footerMenuOne();
    await footerMenuTwo();
});

const isLoading = ref(false);
const newsletter = ref({
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    subject: null,
    message: null
});

const rules = ref({
    firstName: { required },
    lastName: { required },
    email: { required, email },
});

const v$ = useVuelidate(rules, newsletter.value);

const resetForm = async () => {
    newsletter.value = {
        firstName: null,
        lastName: null,
        email: null,
    };
};
const submitNewsletter = async () => {
    const result = await v$.value.$validate();
    if (!result) {
        isLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    const { data, error } = await useApiFetch('/api/create-newsletter', {
        method: 'POST',
        body: newsletter.value,
    });
    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Email has been added to the newsletter list',
            type: 'success',
            duration: 5000,
        });
        await resetForm();
        isLoading.value = false;
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message, type: 'error', duration: 5000 });
    }
};
</script>

<template>
    <div class="bg-[#0f2c49] px-4 text-white shadow-md py-6">
        <div class="container">
            <div class="grid gap-8 md:grid-cols-12 items-start">
                <!-- LEFT DIV -->
                <div class="intro-y lg:col-span-4 h-full lg:block">
                    <ApplicationLogo class="w-48" />
                    <div class="mt-4">
                        {{ footerData.address }}
                    </div>
                </div>

                <!-- RIGHT DIV -->
                <div class="intro-y lg:col-span-8 h-full lg:block">
                    <div class="flex justify-end">
                        <div class="w-full lg:w-2/3">
                            <h2 class="font-medium text-white text-sm whitespace-nowrap mb-4">LNF Newsletter</h2>
                            <form class="grid lg:grid-cols-12 gap-3" @submit.prevent="submitNewsletter">
                                <FormTextInput v-model="newsletter.firstName" rounded :errors="v$.firstName.$errors" class="lg:col-span-6" name="cp-cell-number" placeholder="First Name" />
                                <FormTextInput v-model="newsletter.lastName" rounded :errors="v$.lastName.$errors" class="lg:col-span-6" name="cp-cell-number" placeholder="Last Name" />
                                <FormTextInput v-model="newsletter.email" rounded :errors="v$.email.$errors" class="lg:col-span-6" name="cp-cell-number" placeholder="Email Address" />
                                <FormTextInput v-model="newsletter.address" rounded :errors="v$.address?.$errors" class="lg:col-span-6" name="address" placeholder="Address" />
                                <FormTextInput v-model="newsletter.subject" rounded class="lg:col-span-12" name="subject" placeholder="Subject" />
                                <FormTextInput v-model="newsletter.message" rounded class="lg:col-span-12" name="message" placeholder="Message" />
                                <div class="lg:col-span-12">
                                    <button :disabled="isLoading" type="button" class="w-full btn btn-sm btn-rounded btn-warning " @click="submitNewsletter">Submit</button>
                                </div>
                            </form>
                        </div>
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