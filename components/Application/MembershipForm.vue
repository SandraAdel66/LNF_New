<script lang="ts" setup>
import { useYearArray } from '~/composables/useYearsArray';
import { email, numeric, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
const application = useApplicationStore();

const resources = useResourceStore();
const years = useYearArray(200);
const route = useRoute();
const refValue = ref<any>(route.query?.ref);
const isLoading = ref(application.isLoading);
const clientIp = useVisitStore();
const clientCountryId = ref((resources.countries as Country[])?.find((c) => c.code === clientIp.ipDetails?.countryCode)?.id);

const rules = ref({
    name: { required },
    addressLine1: { required },
    addressLine2: {},
    email: { required, email },
    image: { required },
    city: { required },
    fpp: { required },
    state: {},
    postalCode: {},
    phone: { required },
    website: { required },
    profile: {},
    businessEst: { required },
    membersCount: { required, numeric },
    countryId: { required }, // Done
    contactPersons: {},
    detectedCountryId: {},
});

const titles = ref([
    { value: 'mr', name: 'Mr' },
    { value: 'ms', name: 'Ms' },
    { value: 'mrs', name: 'Mrs' },
]);
const approvalFpp = ref([
    { value: 'yes', name: 'Yes' },
    { value: 'no', name: 'No' },
]);

const v$ = useVuelidate(rules, application.application);

const applicationSuccess = ref(false);
const submitApplication = async () => {
    application.isLoading = true;
    const result = await v$.value.$validate();
    if (!result) {
        application.isLoading = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    await application.submit(refValue.value ?? null);
};

// Contact Person
const person = ref<ContactPersons>({
    title: null,
    email: null,
    firstName: null,
    lastName: null,
    jobTitle: null,
    phoneNumber: null,
    cellNumber: null,
    image: null,
    passport: null,
});

const personRules = ref({
    title: { required },
    email: { required, email },
    firstName: { required },
    lastName: { required },
    jobTitle: { required },
    phoneNumber: { required },
    cellNumber: { required },
    image: {},
    passport: { required },
});
const p$ = useVuelidate(personRules, person.value);
const resetPerson = async () => {
    person.value = {
        title: null,
        email: null,
        firstName: null,
        lastName: null,
        jobTitle: null,
        phoneNumber: null,
        cellNumber: null,
        image: null,
        passport: null,
    };
};
onMounted(() => {
    application.success = false;
});

const isOpen = ref(false);
const editMode = ref(false);
const currentEditIndex = ref<number | null>(null);
const applyPersonAction = async () => {
    application.isLoading = true;
    const result = await p$.value.$validate();
    if (!result) {
        application.isLoading = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    if (editMode && currentEditIndex.value !== null) {
        application.application.contactPersons[currentEditIndex.value] = { ...person.value };
    } else {
        application.addPerson(person.value);
    }
    await closeModal();
};

const openModal = async (index: number | null) => {
    currentEditIndex.value = index;
    if (index !== null) {
        editMode.value = true;
        person.value = application.application.contactPersons[index];
        isOpen.value = true;
        console.log('Edit Mode');
    } else {
        console.log('Not Edit Mode');
        editMode.value = false;
        isOpen.value = true;
    }
};
async function closeModal() {
    isOpen.value = false;
    editMode.value = false;
    p$.value.$reset();
    await resetPerson();
}
</script>
<template>
    <div>
        <template v-if="!application.success">
            <TransitionExpand>
                <div v-if="!clientCountryId" class="flex items-center place-content-center py-12">
                    <Icon class="size-8 shrink-0" name="svg-spinners:3-dots-fade" />
                </div>
                <form v-else class="flex flex-col gap-5 container my-8" @submit.prevent="submitApplication">
                    <FormSection title="Network Details">
                        <div class="items-start gap-5 grid lg:grid-cols-12">
                            <div class="grid lg:grid-cols-12 gap-5 lg:col-span-8">
                                <FormTextInput
                                    v-model="application.application.name"
                                    :errors="v$.name.$errors"
                                    class="lg:col-span-12"
                                    label="Network Name"
                                    name="name"
                                    placeholder="Network Name"
                                />
                                <FormTextInput
                                    v-model="application.application.addressLine1"
                                    :errors="v$.addressLine1.$errors"
                                    class="lg:col-span-6"
                                    label="Address Line 1"
                                    name="address-line-1"
                                    placeholder="Address Line 1"
                                />
                                <FormTextInput
                                    v-model="application.application.addressLine2"
                                    :errors="v$.addressLine2.$errors"
                                    class="lg:col-span-6"
                                    label="Address Line 2"
                                    name="address-line-2"
                                    placeholder="Address Line 2"
                                />
                                <FormTextInput v-model="application.application.city" :errors="v$.city.$errors" class="lg:col-span-4" label="City" name="city" placeholder="City" />
                                <FormTextInput
                                    v-model="application.application.state"
                                    :errors="v$.state.$errors"
                                    class="lg:col-span-4"
                                    label="State"
                                    name="state"
                                    placeholder="State"
                                />
                                <FormTextInput
                                    v-model="application.application.postalCode"
                                    :errors="v$.postalCode.$errors"
                                    class="lg:col-span-4"
                                    label="Postal Code"
                                    name="postal-code"
                                    placeholder="Postal Code"
                                />
                            </div>
                            <div class="lg:col-span-4">
                                <FormUploader
                                    v-model="application.application.image"
                                    :allowed-types="['image', 'svg']"
                                    :errors="v$.image.$errors"
                                    label="Network Logo"
                                    name="company-logo"
                                />
                            </div>
                        </div>
                        <div class="gap-5 grid lg:grid-cols-12">
                            <FormSelectInput
                                v-model="application.application.countryId"
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
                            <FormTextInput
                                v-model="application.application.email"
                                :errors="v$.email.$errors"
                                class="lg:col-span-6"
                                label="Email"
                                name="email"
                                placeholder="Email"
                            />
                            <FormTextInput
                                v-model="application.application.phone"
                                :errors="v$.phone.$errors"
                                class="lg:col-span-6"
                                label="Phone Number"
                                name="phone"
                                placeholder="Phone Number"
                            />
                            <FormTextInput
                                v-model="application.application.website"
                                :errors="v$.website.$errors"
                                class="lg:col-span-6"
                                label="Website"
                                name="website"
                                placeholder="Website"
                            />
                            <FormSelectInput
                                v-model="application.application.businessEst"
                                :errors="v$.businessEst.$errors"
                                :select-data="years"
                                class="lg:col-span-6"
                                keyvalue="id"
                                label="Business Established"
                                labelvalue="name"
                                name="business-established"
                                placeholder="Business Established Year for example: 1972"
                            />
                            <FormTextInput
                                v-model="application.application.membersCount"
                                :errors="v$.membersCount.$errors"
                                class="lg:col-span-6"
                                label="Approximate Number Of Employees"
                                name="employees-num"
                                type="number"
                                placeholder="Example: 1,2 or 20"
                            />
                            <FormSelectInput
                                v-model="application.application.fpp"
                                :clearable="true"
                                :errors="v$.fpp.$errors"
                                :select-data="approvalFpp"
                                class="lg:col-span-12"
                                keyvalue="value"
                                label="Do you apply Financial Protection"
                                labelvalue="name"
                                name="title"
                                placeholder="Please select Yes or No"
                            />
                            <FormTextInput
                                v-model="application.application.profile"
                                :errors="v$.profile.$errors"
                                class="lg:col-span-12"
                                label="Network profile"
                                name="company-profile"
                                placeholder="Network profile"
                                type="textarea"
                            />
                        </div>
                    </FormSection>
                    <FormSection title="Representative Details">
                        <div v-if="application.application.contactPersons.length > 0" class="flex flex-col gap-2">
                            <div
                                v-for="(person, index) in application.application.contactPersons"
                                :key="index"
                                class="text-sm p-3 bg-slate-50 border border-slate-200/75 rounded-lg flex items-center gap-5"
                            >
                                <div class="grow">
                                    <div class="flex items-center justify-between gap-5 sm:flex-row flex-col">
                                        <div class="space-x-0.5 flex items-center gap-0.5">
                                            <Icon name="solar:user-circle-outline" class="size-4 opacity-50 mr-2 shrink-0" />
                                            <span class="capitalize opacity-75">{{ person.title }}</span>
                                            <span>{{ person.firstName }}</span>
                                            <span>{{ person.lastName }}</span>
                                            <span class="font-light italic">, {{ person.jobTitle }}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <Icon name="solar:streets-navigation-outline" class="size-4 opacity-50 mr-2 shrink-0" />
                                            <span>{{ person.email }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between gap-5 sm:flex-row flex-col">
                                        <div class="flex items-center gap-2">
                                            <Icon name="solar:phone-calling-rounded-outline" class="size-4 opacity-50 shrink-0" />
                                            <span>{{ person.phoneNumber }}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <Icon name="solar:airbuds-case-minimalistic-linear" class="size-4 opacity-50 shrink-0" />
                                            <span>{{ person.cellNumber }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 border-l border-dashed pl-5 border-slate-300">
                                    <button title="Remove" class="btn btn-danger btn-sm" type="button" @click="application.removePerson(index)">
                                        <Icon name="solar:trash-bin-minimalistic-linear" class="shrink-0 size-5" />
                                    </button>
                                    <button title="Edit" class="btn btn-secondary btn-sm" type="button" @click="openModal(index)">
                                        <Icon name="solar:pen-new-square-linear" class="shrink-0 size-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="bg-white border-2 border-dashed rounded-xl p-5 text-slate-500 italic font-light mx-6 mt-5 lg:mx-12 text-center">
                            You need to add at least one Representative to proceed with your application
                        </div>
                        <div class="flex items-center justify-center mt-5">
                            <Button class="btn btn-secondary gap-2" type="button" @click="openModal(null)">
                                <Icon name="solar:add-square-linear" class="size-5" />
                                <span>Add Representative</span>
                            </Button>
                        </div>
                    </FormSection>
                    <div class="px-6">
                        <button :disabled="isLoading || application.application.contactPersons.length === 0" class="btn btn-success text-white w-full" type="submit">
                            <span>Submit Your Application</span>
                        </button>
                    </div>
                </form>
            </TransitionExpand>
        </template>
        <TheModal :open-modal="isOpen" size="4xl" @close-modal="closeModal()">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-normal" v-html="editMode ? 'Updating Representative' : 'Add New Representative'" />
                    <Icon class="w-8 h-8 opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-300" name="solar:close-square-outline" @click="closeModal" />
                </div>
            </template>
            <template #content>
                <div class="grid lg:grid-cols-12 gap-5 items-start">
                    <div class="lg:col-span-4 space-y-5">
                        <FormUploader v-model="person.image" :allowed-types="['image']" :errors="p$.image.$errors" label="Profile Image" name="profile-image" />
                        <FormUploader v-model="person.passport" :allowed-types="['image', 'document']" :errors="p$.passport.$errors" label="Passport Photo Copy" name="passport" />
                    </div>
                    <div class="lg:col-span-8 grid lg:grid-cols-12 gap-5 items-start">
                        <FormSelectInput
                            v-model="person.title"
                            :clearable="false"
                            :errors="p$.title.$errors"
                            :select-data="titles"
                            class="lg:col-span-4"
                            keyvalue="value"
                            label="Title"
                            labelvalue="name"
                            name="title"
                            placeholder="Title"
                        />
                        <FormTextInput
                            v-model="person.firstName"
                            :errors="p$.firstName.$errors"
                            :name="'person-first-name'"
                            class="lg:col-span-4"
                            label="First Name"
                            placeholder="First Name"
                        />
                        <FormTextInput
                            v-model="person.lastName"
                            :errors="p$.lastName.$errors"
                            :name="'person-last-name'"
                            class="lg:col-span-4"
                            label="Last Name"
                            placeholder="Last Name"
                        />
                        <FormTextInput v-model="person.email" :errors="p$.email.$errors" :name="'person-email'" class="lg:col-span-6" label="Email" placeholder="Email" />
                        <FormTextInput
                            v-model="person.jobTitle"
                            :errors="p$.jobTitle.$errors"
                            :name="'person-job-title'"
                            class="lg:col-span-6"
                            label="Job Title"
                            placeholder="Job Title"
                        />
                        <FormTextInput
                            v-model="person.phoneNumber"
                            :errors="p$.phoneNumber.$errors"
                            :name="'person-phone'"
                            class="lg:col-span-6"
                            label="Phone Number"
                            placeholder="Phone Number"
                        />
                        <FormTextInput
                            v-model="person.cellNumber"
                            :errors="p$.cellNumber.$errors"
                            :name="'person-cell'"
                            class="lg:col-span-6"
                            label="Fax Number"
                            placeholder="Cell Number"
                        />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="w-full flex items-center justify-end gap-5">
                    <button :disabled="isLoading" class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeModal">
                        <Icon :name="isLoading ? 'svg-spinners:3-dots-fade' : 'solar:close-circle-linear'" class="w-5 h-5 mr-2" />
                        <span>Close</span>
                    </button>
                    <button :disabled="isLoading" class="btn-rounded btn-sm btn btn-primary px-4" type="button" @click="applyPersonAction()">
                        <Icon :name="isLoading ? 'svg-spinners:3-dots-fade' : 'solar:check-circle-broken'" class="w-5 h-5 mr-2" />
                        <span v-html="'Update'" />
                    </button>
                </div>
            </template>
        </TheModal>
    </div>
</template>
