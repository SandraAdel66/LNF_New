<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

const contactForm = ref({
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    subject: undefined,
    message: undefined,
});

const resetContactForm = async () => {
    contactForm.value = {
        name: undefined,
        email: undefined,
        phone: undefined,
        address: undefined,
        subject: undefined,
        message: undefined,
    };
};

const isLoading = ref(false);
const rules = ref({
    name: { required },
    email: { required, email },
    phone: {},
    address: {},
    subject: { required },
    message: { required },
});
const v$ = useVuelidate(rules, contactForm.value);

const sendMessage = async () => {
    isLoading.value = true;
    const result = await v$.value.$validate();
    if (!result) {
        isLoading.value = false;
        useToast({ title: 'Error', message: 'Please fill all required fields', type: 'error', duration: 5000 });
        return false;
    }
    await useApiFetch('/sanctum/csrf-cookie');
    const { data, error } = await useApiFetch(`/api/contact-us-public`, {
        method: 'POST',
        body: contactForm.value,
        lazy: true,
    });
    if (data.value) {
        useToast({
            title: 'Success',
            message: 'Your Message submitted successfully',
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
    <div class="p-5 bg-white rounded-2xl max-w-5xl mx-auto">
        <form class="grid lg:grid-cols-12 gap-5" @submit.prevent="sendMessage">
            <FormTextInput v-model="contactForm.name" :errors="v$.name.$errors" class="lg:col-span-6" label="Full Name" name="name" placeholder="Full Name" />
            <FormTextInput v-model="contactForm.phone" :errors="v$.phone.$errors" class="lg:col-span-6" label="Phone" name="name" placeholder="+1 234 5678 9123" />
            <FormTextInput v-model="contactForm.email" :errors="v$.email.$errors" class="lg:col-span-6" label="Email" name="email" placeholder="name@company.com" type="email" />
            <FormTextInput v-model="contactForm.address" :errors="v$.address.$errors" class="lg:col-span-6" label="Address" name="address" placeholder="Address" />
            <FormTextInput v-model="contactForm.subject" :errors="v$.subject.$errors" class="lg:col-span-12" label="Subject" name="subject" placeholder="Subject" />
            <FormTextInput v-model="contactForm.message" :errors="v$.message.$errors" class="lg:col-span-12" label="Message" name="message" placeholder="Message" type="textarea" />
            <div class="lg:col-span-12">
                <button :disabled="isLoading" class="group btn btn-primary w-full" type="submit">
                    <Icon
                        :name="isLoading ? 'svg-spinners:3-dots-fade' : 'solar:plain-broken'"
                        class="mr-4 size-5 group-hover:mr-2 group-hover:rotate-45 ease-in-out duration-300"
                    />
                    <span>Send</span>
                </button>
            </div>
        </form>
    </div>
</template>
