<script lang="ts" setup>
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useDateNoTimeFormatter } from '~/composables/useDateNoTimeFormatter';

const { data: expo, status: expoStatus } = await useApiFetch(`/api/get-current-expo`, {
    lazy: true,
    transform: (expo) => (expo as ApiResponse).data as Expo,
});
const { data: networks, status: networksStatus } = await useApiFetch(`/api/get-logo-company/public`, {
    lazy: true,
    transform: (networks) => (networks as ApiResponse).data as NetworkLogos[],
});

const resources = useResourceStore();
const isLoading = ref(false);

const application = ref({
    name: undefined,
    city: undefined,
    countryId: undefined,
    image: undefined,
    email: undefined,
    cpName: undefined,
    cpJobTitle: undefined,
    cpEmail: undefined,
    cpCellNumber: undefined,
    cpPhoneNumber: undefined,
    status: false,
    packageId: undefined,
    networkId: undefined,
    expoId: undefined,
});

const rules = ref({
    name: { required },
    city: { required },
    countryId: { required },
    image: { required },
    email: { required, email },
    cpName: { required },
    cpJobTitle: { required },
    cpEmail: { required, email },
    cpCellNumber: { required },
    cpPhoneNumber: {},
    status: {},
    packageId: { required },
    networkId: { required },
    expoId: { required },
});

const resetContactForm = async () => {
    application.value = {
        name: undefined,
        city: undefined,
        countryId: undefined,
        image: undefined,
        email: undefined,
        cpName: undefined,
        cpJobTitle: undefined,
        cpEmail: undefined,
        cpCellNumber: undefined,
        cpPhoneNumber: undefined,
        status: false,
        packageId: undefined,
        networkId: undefined,
        expoId: undefined,
    };
};

const v$ = useVuelidate(rules, application.value);

const submitApplication = async () => {
    application.value.packageId = expo.value?.packages[0].id;
    application.value.expoId = expo.value?.id;
    isLoading.value = true;
    const result = await v$.value.$validate();
    if (!result) {
        isLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    const { data, error } = await useApiFetch(`/api/expo/application-form`, {
        method: 'POST',
        body: application.value,
        lazy: true,
    });

    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Your Application submitted successfully',
            type: 'success',
            duration: 5000,
        });
        await resetContactForm();
        isLoading.value = false;
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.message, type: 'error', duration: 5000 });
    }
};
</script>
<template>
    <div v-if="expo && expoStatus !== 'pending'" class="max-w-7xl mx-auto px-6">
        <div class="lg:grid-cols-12 grid gap-5 my-5">
            <div class="lg:col-span-12">
                <div class="text-center pb-5 mb-5 border-b-2 border-dashed">
                    <h1 class="text-3xl font-bold">{{ expo.name }}</h1>
                    <div class="text-sm font-light">{{ expo.city }}, {{ expo.country?.name }}</div>
                    <div class="text-sm font-medium">
                        <span class="font-light mr-1">from</span> {{ useDateNoTimeFormatter(expo.duration[0]) }} <span class="font-light mx-1.5">to</span>
                        {{ useDateNoTimeFormatter(expo.duration[1]) }}
                    </div>
                </div>
                <div class="flex gap-5 items-start w-full">
                    <div v-for="(item, index) in (expo as Expo).packages as Package[]" :key="index" class="grow bg-primary p-3 border border-primary/50 text-white rounded-md">
                        <div class="flex items-center justify-between gap-5">
                            <div class="font-semibold">{{ item.name }}</div>
                            <div class="font-semibold text-lg">{{ parseFloat(item.price) }} <span class="font-light text-sm">USD</span></div>
                        </div>
                        <div class="text-xs font-light">
                            <ul class="ml-3 list-disc list-inside">
                                <li v-for="(listItem, idx) in item.details" :key="idx">{{ listItem.title }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-12">
                <template v-if="networks && networks.length > 0 && networksStatus !== 'pending'">
                    <FormSelectInput
                        v-model="application.networkId"
                        :errors="v$.networkId.$errors"
                        :select-data="networks"
                        class="lg:col-span-6"
                        imgvalue="imageUrl"
                        keyvalue="id"
                        label="Please Select your Network"
                        labelvalue="name"
                        name="network-id"
                        placeholder="Type to search..."
                    />
                </template>

                <div v-else-if="networksStatus !== 'pending' && networks && networks.length === 0">Networks List is unavailable, please add a network</div>
                <div v-else-if="networksStatus === 'error'">Something went wrong please contact Support</div>
                <div v-else-if="networksStatus === 'pending'">Loading Networks...</div>
            </div>
            <div class="lg:col-span-12 font-semibold px-3 py-1.5 bg-slate-50 w-full rounded-md">Company Details</div>
            <div class="lg:col-span-8 grid grid-cols-12 gap-5">
                <FormTextInput v-model="application.name" :errors="v$.name.$errors" class="lg:col-span-12" label="Company Name" name="name" placeholder="Company Name" />
                <FormTextInput v-model="application.email" type="email" :errors="v$.email.$errors" class="lg:col-span-12" label="Email" name="email" placeholder="Email" />
                <FormSelectInput
                    v-model="application.countryId"
                    :errors="v$.countryId.$errors"
                    :select-data="resources.countries"
                    class="lg:col-span-6"
                    imgvalue="imageUrl"
                    keyvalue="id"
                    label="Country"
                    labelvalue="name"
                    name="country"
                    placeholder="Country"
                />
                <FormTextInput v-model="application.city" :errors="v$.city.$errors" class="lg:col-span-6" label="City" name="city" placeholder="City" />
            </div>
            <div class="lg:col-span-4">
                <FormUploader v-model="application.image" :allowed-types="['image', 'svg']" :errors="v$.image.$errors" label="Company Logo" name="company-logo" />
            </div>
            <div class="lg:col-span-12 grid grid-cols-12 gap-5">
                <div class="lg:col-span-12 font-semibold px-3 py-1.5 bg-slate-50 w-full rounded-md">Contact Person Details</div>
                <FormTextInput v-model="application.cpName" :errors="v$.cpName.$errors" class="lg:col-span-6" label="Name" name="cp-name" placeholder="Name" />
                <FormTextInput
                    v-model="application.cpJobTitle"
                    :errors="v$.cpJobTitle.$errors"
                    class="lg:col-span-6"
                    label="Job Title"
                    name="cp-job-title"
                    placeholder="Job Title"
                />
                <FormTextInput v-model="application.cpEmail" type="email" :errors="v$.cpEmail.$errors" class="lg:col-span-12" label="Email" name="cp-email" placeholder="Email" />
                <FormTextInput
                    v-model="application.cpCellNumber"
                    :errors="v$.cpCellNumber.$errors"
                    class="lg:col-span-6"
                    label="Cell Number"
                    name="cp-cell-number"
                    placeholder="Cell Number"
                />
                <FormTextInput
                    v-model="application.cpPhoneNumber"
                    :errors="v$.cpPhoneNumber.$errors"
                    class="lg:col-span-6"
                    label="Phone Number"
                    name="cp-phone-number"
                    placeholder="Phone Number"
                />
            </div>
            <div class="lg:col-span-12">
                <button :disabled="isLoading" type="button" class="w-full btn btn-primary" @click="submitApplication">Submit</button>
            </div>
        </div>
    </div>
</template>
