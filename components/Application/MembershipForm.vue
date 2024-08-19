<script lang="ts" setup>
import { useYearArray } from '~/composables/useYearsArray';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const resources = useResourceStore();
const years = useYearArray(200);
const route = useRoute();
const refValue = ref<any>(route.query?.ref);
const isLoading = ref(false);
const clientIp = useVisitStore();
const clientCountryId = ref((resources.countries as Country[]).find((c) => c.code === clientIp.ipDetails?.countryCode)?.id);
const applicationForm = ref({
    countryId: clientCountryId.value, // Done
    name: undefined, // Done
    email: undefined, // Done
    image: undefined,
    addressLine1: undefined, // Done
    addressLine2: undefined, // Done
    city: undefined, // Done
    state: undefined, // Done
    postalCode: undefined, // Done
    phone: undefined, // Done
    fpp: undefined, // Done
    website: undefined, // Done
    profile: undefined, // Done
    businessEst: undefined, // Done
    membersCount: undefined, // Done
    contactPersons: Array.from({ length: 1 }, () => ({
        title: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        jobTitle: undefined,
        phoneNumber: undefined,
        cellNumber: undefined,
    })),
    detectedCountryId: clientCountryId.value,
});

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
    membersCount: { required },
    countryId: { required }, // Done
    contactPersons: Array.from({ length: 1 }, () => ({
        title: { required },
        email: { required, email },
        firstName: { required },
        lastName: { required },
        jobTitle: { required },
        phoneNumber: { required },
        cellNumber: { required },
    })),
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

const v$ = useVuelidate(rules, applicationForm.value);

const applicationSuccess = ref(false);

const submitApplication = async () => {
    isLoading.value = true;
    const result = await v$.value.$validate();
    if (!result) {
        isLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    const { data, error } = await useApiFetch(`/api/application-form`, {
        method: 'POST',
        body: applicationForm.value,
        params: { ref: refValue.value ?? null },
        lazy: true,
    });
    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Your Application submitted successfully',
            type: 'success',
            duration: 5000,
        });
        applicationSuccess.value = true;
    }
    if (error.value) {
        useToast({ title: 'Error', message: error.value.data.message ?? error.value.message, type: 'error', duration: 5000 });
        isLoading.value = false;
    }
};
const addPerson = () => {
    // Add new person to the form
    applicationForm.value.contactPersons.push({
        title: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        jobTitle: undefined,
        phoneNumber: undefined,
        cellNumber: undefined,
    });
};

// add removePerson function
const deletePerson = (index: number) => {
    if (applicationForm.value.contactPersons.length > 1) {
        applicationForm.value.contactPersons.splice(index, 1);
        rules.value.contactPersons.splice(index, 1);
    } else {
        useToast({
            title: 'Error',
            message: 'At least one contact person is required.',
            type: 'error',
            duration: 3000,
        });
    }
};

onMounted(() => {
    applicationSuccess.value = false;
});
</script>
<template>
    <div>
        <template v-if="!applicationSuccess">
            <TransitionExpand>
                <div v-if="!clientCountryId" class="flex items-center place-content-center py-12">
                    <Icon class="size-8 shrink-0" name="svg-spinners:3-dots-fade" />
                </div>
                <form v-else class="flex flex-col gap-5 container my-8" @submit.prevent="submitApplication">
                    <FormSection title="Network Details">
                        <div class="items-start gap-5 grid lg:grid-cols-12">
                            <div class="grid lg:grid-cols-12 gap-5 lg:col-span-8">
                                <FormTextInput
                                    v-model="applicationForm.name"
                                    :errors="v$.name.$errors"
                                    class="lg:col-span-12"
                                    label="Network Name"
                                    name="name"
                                    placeholder="Network Name"
                                />
                                <FormTextInput
                                    v-model="applicationForm.addressLine1"
                                    :errors="v$.addressLine1.$errors"
                                    class="lg:col-span-6"
                                    label="Address Line 1"
                                    name="address-line-1"
                                    placeholder="Address Line 1"
                                />
                                <FormTextInput
                                    v-model="applicationForm.addressLine2"
                                    :errors="v$.addressLine2.$errors"
                                    class="lg:col-span-6"
                                    label="Address Line 2"
                                    name="address-line-2"
                                    placeholder="Address Line 2"
                                />
                                <FormTextInput v-model="applicationForm.city" :errors="v$.city.$errors" class="lg:col-span-4" label="City" name="city" placeholder="City" />
                                <FormTextInput v-model="applicationForm.state" :errors="v$.state.$errors" class="lg:col-span-4" label="State" name="state" placeholder="State" />
                                <FormTextInput
                                    v-model="applicationForm.postalCode"
                                    :errors="v$.postalCode.$errors"
                                    class="lg:col-span-4"
                                    label="Postal Code"
                                    name="postal-code"
                                    placeholder="Postal Code"
                                />
                            </div>
                            <div class="lg:col-span-4">
                                <FormUploader
                                    v-model="applicationForm.image"
                                    :allowed-types="['image', 'svg']"
                                    :errors="v$.image.$errors"
                                    label="Network Logo"
                                    name="company-logo"
                                />
                            </div>
                        </div>
                        <div class="gap-5 grid lg:grid-cols-12">
                            <FormSelectInput
                                v-model="applicationForm.countryId"
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
                            <FormTextInput v-model="applicationForm.email" :errors="v$.email.$errors" class="lg:col-span-6" label="Email" name="email" placeholder="Email" />

                            <FormTextInput
                                v-model="applicationForm.phone"
                                :errors="v$.phone.$errors"
                                class="lg:col-span-6"
                                label="Phone Number"
                                name="phone"
                                placeholder="Phone Number"
                            />
                            <FormTextInput
                                v-model="applicationForm.website"
                                :errors="v$.website.$errors"
                                class="lg:col-span-6"
                                label="Website"
                                name="website"
                                placeholder="Website"
                            />
                            <FormSelectInput
                                v-model="applicationForm.businessEst"
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
                                v-model="applicationForm.membersCount"
                                :errors="v$.membersCount.$errors"
                                class="lg:col-span-6"
                                label="Approximate Number Of Employees"
                                name="employees-num"
                                placeholder="Example: 1,2 or 20"
                            />
                            <FormSelectInput
                                v-model="applicationForm.fpp"
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
                                v-model="applicationForm.profile"
                                :errors="v$.profile.$errors"
                                class="lg:col-span-12"
                                label="Network profile"
                                name="company-profile"
                                placeholder="Network profile"
                                type="textarea"
                            />
                        </div>
                    </FormSection>
                    <!--                    <div class="px-6 flex items-center justify-end">-->
                    <!--                        <Button class="btn btn-sm btn-primary gap-2" type="button" @click="addPerson()">-->
                    <!--                            <Icon name="solar:add-square-linear" class="size-4" />-->
                    <!--                            <span>Add Representative</span>-->
                    <!--                        </Button>-->
                    <!--                    </div>-->
                    <FormSection title="Representative Details">
                        <div v-for="(person, index) in applicationForm.contactPersons" :key="index" class="relative grid lg:grid-cols-12 gap-5">
                            <!--                            <div class="absolute z-50 right-0 -top-12 flex items-center gap-5">-->
                            <!--                                <Button title="Remove" class="btn btn-sm btn-danger gap-2" type="button" @click="deletePerson(index)">-->
                            <!--                                    <Icon name="solar:trash-bin-minimalistic-outline" class="size-4" />-->
                            <!--                                </Button>-->
                            <!--                            </div>-->
                            <FormSelectInput
                                v-model="person.title"
                                :clearable="false"
                                :errors="v$.contactPersons[index].title.$errors"
                                :select-data="titles"
                                class="lg:col-span-2"
                                keyvalue="value"
                                label="Title"
                                labelvalue="name"
                                name="title"
                                placeholder="Title"
                            />
                            <FormTextInput
                                v-model="person.firstName"
                                :errors="v$.contactPersons[index].firstName.$errors"
                                :name="'person-first-name-' + (index + 1)"
                                class="lg:col-span-5"
                                label="First Name"
                                placeholder="First Name"
                            />
                            <FormTextInput
                                v-model="person.lastName"
                                :errors="v$.contactPersons[index].lastName.$errors"
                                :name="'person-last-name-' + (index + 1)"
                                class="lg:col-span-5"
                                label="Last Name"
                                placeholder="Last Name"
                            />
                            <FormTextInput
                                v-model="person.email"
                                :errors="v$.contactPersons[index].email.$errors"
                                :name="'person-email-' + (index + 1)"
                                class="lg:col-span-6"
                                label="Email"
                                placeholder="Email"
                            />
                            <FormTextInput
                                v-model="person.jobTitle"
                                :errors="v$.contactPersons[index].jobTitle.$errors"
                                :name="'person-job-title-' + (index + 1)"
                                class="lg:col-span-6"
                                label="Job Title"
                                placeholder="Job Title"
                            />
                            <FormTextInput
                                v-model="person.phoneNumber"
                                :errors="v$.contactPersons[index].phoneNumber.$errors"
                                :name="'person-phone-' + (index + 1)"
                                class="lg:col-span-6"
                                label="Phone Number"
                                placeholder="Phone Number"
                            />
                            <FormTextInput
                                v-model="person.cellNumber"
                                :errors="v$.contactPersons[index].cellNumber.$errors"
                                :name="'person-cell-' + (index + 1)"
                                class="lg:col-span-6"
                                label="Fax Number"
                                placeholder="Cell Number"
                            />
                        </div>
                    </FormSection>
                    <div class="px-6">
                        <button :disabled="isLoading" class="group btn btn-primary w-full" type="submit">
                            <Icon class="mr-4 size-5 group-hover:mr-2 group-hover:rotate-45 ease-in-out duration-300" name="solar:plain-broken" />
                            <span>Submit Your Application</span>
                        </button>
                    </div>
                </form>
            </TransitionExpand>
        </template>
        <TransitionExpand>
            <div v-if="applicationSuccess" class="p-3 text-center bg-green-200 text-green-900 border-success/25 rounded-2xl my-12 max-w-2xl mx-auto border">
                <div class="text-base uppercase">Your Application Submitted Successfully</div>
            </div>
        </TransitionExpand>
    </div>
</template>
