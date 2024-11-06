export const useApplicationStore = defineStore('application', () => {
    const application = ref<ApplicationFormType>({
        name: null,
        email: null,
        image: null,
        addressLineOne: null,
        addressLineTwo: null,
        city: null,
        state: null,
        postalCode: null,
        phone: null,
        fpp: null,
        website: null,
        profile: null,
        businessEst: null,
        membersCount: null,
        contactPersons: [],
        countryId: null,
        detectedCountryId: null,
    });
    const isLoading = ref<boolean>(false);
    const success = ref<boolean>(false);

    const addPerson = (item: ContactPersons) => {
        (application.value as ApplicationFormType).contactPersons.push(item);
    };
    const removePerson = (index: number) => {
        (application.value as ApplicationFormType).contactPersons.splice(index, 1);
    };

    const resetApplication = () => {
        application.value = {
            name: null,
            email: null,
            image: null,
            addressLineOne: null,
            addressLineTwo: null,
            city: null,
            state: null,
            postalCode: null,
            phone: null,
            fpp: null,
            website: null,
            profile: null,
            businessEst: null,
            membersCount: null,
            contactPersons: [],
            countryId: null,
            detectedCountryId: null,
        };
    };

    const submit = async (refValue?: number | null) => {
        await useApiFetch('/sanctum/csrf-cookie');
        const { data, error } = await useApiFetch(`/api/application-form`, {
            method: 'POST',
            body: application.value,
            params: { ref: refValue ?? null },
            lazy: true,
        });
        if (data.value) {
            useToast({
                title: 'Success',
                message: 'Your Application submitted successfully',
                type: 'success',
                duration: 5000,
            });
            success.value = true;
            isLoading.value = false;
            resetApplication();
            navigateTo('/');
        }
        if (error.value) {
            useToast({ title: 'Error', message: error.value.data.message ?? error.value.message, type: 'error', duration: 5000 });
            isLoading.value = false;
        }
    };

    return { application, addPerson, removePerson, submit, resetApplication, isLoading, success };
});
