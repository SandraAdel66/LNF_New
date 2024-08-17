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
    countryId: clientCountryId.value,
    name: undefined,
    email: undefined,
    image: undefined,
    addressLine1: undefined,
    addressLine2: undefined,
    city: undefined,
    state: undefined,
    postalCode: undefined,
    phone: undefined,
    phoneKeyId: clientCountryId.value,
    fax: undefined,
    faxKeyId: clientCountryId.value,
    website: undefined,
    profile: undefined,
    branches: undefined,
    businessEst: undefined,
    employeesNum: undefined,
    refValue: undefined,
    referralId: undefined,
    otherCertificates: undefined,
    otherServices: undefined,
    certificates: [],
    services: [],
    contactPersons: Array.from({ length: 1 }, () => ({
        title: undefined,
        name: undefined,
        email: undefined,
        birthDate: undefined,
        phone: undefined,
        phoneKeyId: clientCountryId.value,
        cell: undefined,
        cellKeyId: clientCountryId.value,
        jobTitle: undefined,
    })),
    tradeReferences: Array.from({ length: 3 }, () => ({
        name: undefined,
        email: undefined,
        person: undefined,
        jobTitle: undefined,
        city: undefined,
        countryId: undefined,
    })),
    tosAcceptance: false,
    detectedCountryId: clientCountryId.value,
});

const rules = ref({
    name: { required },
    addressLine1: { required },
    addressLine2: {},
    email: { required, email },
    image: { required },
    city: { required },
    state: {},
    postalCode: {},
    phone: { required },
    phoneKeyId: { required },
    fax: {},
    faxKeyId: {},
    website: { required },
    profile: {},
    branches: {},
    businessEst: { required },
    employeesNum: { required },
    refValue: {},
    referralId: {},
    otherCertificates: {},
    otherServices: {},
    countryId: { required },
    certificates: { required },
    services: { required },
    contactPersons: Array.from({ length: 1 }, () => ({
        title: { required },
        name: { required },
        email: { required, email },
        birthDate: { required },
        phone: {},
        phoneKeyId: {},
        cell: {},
        cellKeyId: {},
        jobTitle: { required },
    })),
    tradeReferences: Array.from({ length: 3 }, () => ({
        name: { required },
        email: { required, email },
        person: { required },
        jobTitle: { required },
        city: {},
        countryId: { required },
    })),
    tosAcceptance: {},
    detectedCountryId: {},
});
const tos = ref({
    content:
        'By checking the box below you confirm that you are not an owner, administrator, board member or advisor to other freight forwarding networks/alliances, or events or exhibition booth promotions of freight forwarders, profit or non-profit oriented, formal or informal. If any form of link of the above is established, your membership can be cancelled without refund and agree that World Shipping alliance (WSA) may terminate your membership / event attendance and inform all members/attendees of the termination including other network owners, associations, alliances. *This is to confirm that we do not have any outstanding payable with any of our forwarding partners beyond 90 days, or any outstanding disputes. We are not listed on any blacklisting either in FDRS or our local association, any findings can be published.',
    waiver: 'By checking the below check box you do confirm that you read and agreed of all the World Shipping Alliance rules and conditions which mentioned now and which may be updated.',
});

const titles = ref([
    { value: 'mr', name: 'Mr' },
    { value: 'ms', name: 'Ms' },
    { value: 'mrs', name: 'Mrs' },
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
    const { data, error } = await useApiFetch(`/api/user`, {
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
        useToast({ title: 'Error', message: error.value.message, type: 'error', duration: 5000 });
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
                    <FormSection title="Company Details">
                        <div class="items-start gap-5 grid lg:grid-cols-12">
                            <div class="grid lg:grid-cols-12 gap-5 lg:col-span-8">
                                <FormTextInput
                                    v-model="applicationForm.name"
                                    :errors="v$.name.$errors"
                                    class="lg:col-span-12"
                                    label="Company Name"
                                    name="name"
                                    placeholder="Company Name"
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
                                    label="Company Logo"
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
                            <FormSelectInput
                                v-model="applicationForm.phoneKeyId"
                                :errors="v$.phoneKeyId.$errors"
                                :select-data="resources.countries"
                                class="lg:col-span-2"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                label="Phone Key"
                                labelvalue="key"
                                name="phone-key"
                                placeholder="Phone Key"
                                prefix="+"
                            />
                            <FormTextInput
                                v-model="applicationForm.phone"
                                :errors="v$.phone.$errors"
                                class="lg:col-span-4"
                                label="Phone Number"
                                name="phone"
                                placeholder="Phone Number"
                            />
                            <FormSelectInput
                                v-model="applicationForm.faxKeyId"
                                :errors="v$.faxKeyId.$errors"
                                :select-data="resources.countries"
                                class="lg:col-span-2"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                label="Fax Key"
                                labelvalue="key"
                                name="fax-key"
                                placeholder="Fax Key"
                                prefix="+"
                            />
                            <FormTextInput v-model="applicationForm.fax" :errors="v$.fax.$errors" class="lg:col-span-4" label="Fax Number" name="fax" placeholder="Fax Number" />
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
                                v-model="applicationForm.employeesNum"
                                :errors="v$.employeesNum.$errors"
                                class="lg:col-span-12"
                                label="Approximate Number Of Employees"
                                name="employees-num"
                                placeholder="Example: 1,2 or 20"
                            />
                            <FormTextInput
                                v-model="applicationForm.branches"
                                :errors="v$.branches.$errors"
                                class="lg:col-span-12"
                                label="Branches Number / Locations"
                                name="branches-number-locations"
                                placeholder="Branches Number / Locations"
                                type="textarea"
                            />
                            <FormTextInput
                                v-model="applicationForm.profile"
                                :errors="v$.profile.$errors"
                                class="lg:col-span-12"
                                label="Company profile"
                                name="company-profile"
                                placeholder="Company profile"
                                type="textarea"
                            />
                        </div>
                    </FormSection>
                    <FormSection title="Contact Person">
                        <div v-for="(person, index) in applicationForm.contactPersons" :key="index" class="grid lg:grid-cols-12 gap-5">
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
                                v-model="person.name"
                                :errors="v$.contactPersons[index].name.$errors"
                                :name="'person-name-' + (index + 1)"
                                class="lg:col-span-5"
                                label="Name"
                                placeholder="Name"
                            />
                            <FormTextInput
                                v-model="person.jobTitle"
                                :errors="v$.contactPersons[index].jobTitle.$errors"
                                :name="'person-job-title-' + (index + 1)"
                                class="lg:col-span-5"
                                label="Job Title"
                                placeholder="Job Title"
                            />
                            <FormSelectInput
                                v-model="person.phoneKeyId"
                                :errors="v$.contactPersons[index].phoneKeyId.$errors"
                                :name="'person-phone-key-' + (index + 1)"
                                :select-data="resources.countries"
                                class="lg:col-span-2"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                label="Phone Key"
                                labelvalue="key"
                                placeholder="Phone  Key"
                                prefix="+"
                            />
                            <FormTextInput
                                v-model="person.phone"
                                :errors="v$.contactPersons[index].phone.$errors"
                                :name="'person-phone-' + (index + 1)"
                                class="lg:col-span-4"
                                label="Phone Number"
                                placeholder="Phone Number"
                            />
                            <FormSelectInput
                                v-model="person.cellKeyId"
                                :errors="v$.contactPersons[index].cellKeyId.$errors"
                                :name="'person-cell-key-' + (index + 1)"
                                :select-data="resources.countries"
                                class="lg:col-span-2"
                                imgvalue="imageUrl"
                                keyvalue="id"
                                label="Fax Key"
                                labelvalue="key"
                                placeholder="Fax  Key"
                                prefix="+"
                            />
                            <FormTextInput
                                v-model="person.cell"
                                :errors="v$.contactPersons[index].cell.$errors"
                                :name="'person-cell-' + (index + 1)"
                                class="lg:col-span-4"
                                label="Fax Number"
                                placeholder="Fax Number"
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
                                v-model="person.birthDate"
                                :errors="v$.contactPersons[index].birthDate.$errors"
                                :name="'person-birth-date' + (index + 1)"
                                class="lg:col-span-6"
                                label="Birth Date"
                                placeholder="Birth Date"
                                type="date"
                            />
                        </div>
                    </FormSection>
                    <FormSection :title="' Terms and condition'">
                        <div class="flex flex-col gap-3 leading-normal">
                            <p class="font-light" v-html="tos.content" />
                            <p class="font-normal" v-html="tos.waiver" />
                            <FormCheckbox v-model="applicationForm.tosAcceptance" label="I Do Confirm" name="tos-confirmation" />
                        </div>
                    </FormSection>
                    <div class="px-6">
                        <button :disabled="!applicationForm.tosAcceptance || isLoading" class="group btn btn-primary btn-rounded w-full" type="submit">
                            <Icon class="mr-4 size-5 group-hover:mr-2 group-hover:rotate-45 ease-in-out duration-300" name="solar:plain-broken" />
                            <span>Submit Your Application</span>
                        </button>
                    </div>
                </form>
            </TransitionExpand>
        </template>
        <TransitionExpand>
            <div v-if="applicationSuccess" class="p-5 text-center bg-green-200 text-green-900 border-success/25 rounded-2xl my-12 max-w-2xl mx-auto border">
                <div class="text-lg font-medium">Your Application Submitted Successfully</div>
                <p class="font-light mt-3 text-base">The Application is under review and WSA team will contact you soon</p>
            </div>
        </TransitionExpand>
    </div>
</template>
