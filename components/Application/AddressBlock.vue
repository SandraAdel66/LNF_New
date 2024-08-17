<script lang="ts" setup>
const isOpen = ref(false);

async function closeModal() {
    isOpen.value = false;
}

async function openModal() {
    isOpen.value = true;
}
</script>

<template>
    <div class="text-sm bg-white p-5 border rounded-2xl border-slate-200/75">
        <div class="text-base pb-2 border-b border-dashed flex items-center justify-between gap-5">
            <div>Address</div>
            <Icon class="size-5 opacity-75 cursor-pointer hover:text-primary/50 transition-all shrink-0" name="solar:streets-map-point-outline" @click="openModal" />
        </div>
        <div class="font-light mt-2 opacity-85" v-html="useSettingValue('address')" />
    </div>
    <TheModal :open-modal="isOpen" size="4xl" @close-modal="closeModal()">
        <template #content>
            <div v-html="useSettingValue('google_map_location_code')" />
        </template>
        <template #footer>
            <div class="w-full flex items-center justify-end gap-5">
                <button class="btn-rounded btn-sm btn btn-danger px-4" type="button" @click="closeModal">
                    <Icon class="w-5 h-5 mr-2" name="solar:close-circle-linear" />
                    <span>Close</span>
                </button>
            </div>
        </template>
    </TheModal>
</template>
