<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
    flexTitle: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    timePicker: {
        type: Boolean,
        default: true,
    },
    errors: {
        type: Array,
        default: () => [],
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    icon: {
        type: String,
        default: 'solar:calendar-linear',
    },
    format: {
        type: String,
        default: null,
    },
    required: {
        type: Boolean,
        default: false,
    },
    range: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(['update:model-value']);
const value = ref(props.modelValue);
onMounted(() => {
    value.value = props.modelValue;
});
watchEffect(() => {
    emit('update:model-value', value.value);
});
watchEffect(() => {
    value.value = props.modelValue;
});
</script>
<template>
    <div :class="[flexTitle && 'form-inline']" class="text-base">
        <label v-if="label" :class="[flexTitle ? '!text-left sm:w-20' : '']" :for="name" class="form-label">
            <span>{{ label }}</span>
            <span v-if="label && required" class="ml-1 text-sm text-danger">*</span>
        </label>
        <VueDatePicker
            v-model="value"
            :auto-apply="true"
            :autocomplete="autocomplete"
            :class="{ 'has-error': errors.length > 0 }"
            :disabled="disabled"
            :enable-time-picker="timePicker"
            :format="format ? format : timePicker ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'"
            :model-type="format ? format : timePicker ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'"
            :name="name"
            :placeholder="placeholder"
            :range="range"
            :readonly="readonly"
            :teleport="true"
            class="form-control form-control-rounded"
        >
            <template #dp-input="{ value }">
                <div :class="[icon && 'relative']" class="grow">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon :name="icon" class="h-5 w-5 text-slate-400 dark:text-slate-600" />
                    </div>
                    <input :placeholder="placeholder" :value="value" class="font-light form-control form-control-rounded pl-10 shadow-none" type="text" />
                </div>
            </template>
        </VueDatePicker>

        <template v-if="errors.length > 0">
            <ul class="mt-1">
                <li v-for="(error, errorIndex) in errors" :key="errorIndex" class="text-sm text-danger">
                    {{ error.$message }}
                </li>
            </ul>
        </template>
    </div>
</template>
<style lang="scss">
.has-error > {
    .dp__input {
        @apply border-danger;
    }
}
</style>
