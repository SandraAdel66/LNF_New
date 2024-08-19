<script setup>
import VueSelect from 'vue-select';

const props = defineProps({
    id: {
        type: String,
        default: null,
    },
    size: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    autofocus: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    icon: {
        type: String,
        default: '',
    },
    flexTitle: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    prefix: {
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
    searchable: {
        type: Boolean,
        default: false,
    },
    clearable: {
        type: Boolean,
        default: true,
    },
    selectable: {
        type: Function,
        default: () => true,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    errors: {
        type: Array,
        default: () => [],
    },
    required: {
        type: Boolean,
        default: false,
    },
    isRoundedImage: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: Object,
        default: () => {},
    },
    selectData: {
        type: Array,
        default: () => [],
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
    <div :class="[flexTitle ? 'form-inline' : '']" class="text-base">
        <div v-if="label" :class="[flexTitle ? '!text-left sm:w-20' : '']" class="form-label">
            <span>{{ label }}</span>
            <span v-if="label && required" class="ml-1 text-sm text-danger">*</span>
        </div>
        <div class="relative flex items-stretch grow focus-within:z-10">
            <VueSelect
                :id="name"
                v-model="value"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :clearable="clearable"
                :disabled="disabled"
                :imgvalue="$attrs.imgvalue"
                :is-rounded-image="isRoundedImage"
                :label="$attrs.labelvalue"
                :multiple="multiple"
                :name="name"
                :options="selectData"
                :placeholder="placeholder"
                :readonly="readonly"
                :reduce="(data) => data[$attrs.keyvalue]"
                :required="required"
                :secondlabel-value="$attrs.secondlabelvalue"
                :selectable="selectable"
                :thirdlabel-value="$attrs.thirdlabelvalue"
                class="grow"
            >
                <template #option="option">
                    <div
                        class="text-sm group flex items-center py-1.5 hover:bg-primary rounded-lg px-4 ease-in-out duration-100 cursor-pointer first:border-t-0 last:border-b-0 truncate border-y border-dashed border-slate-100"
                    >
                        <NuxtImg
                            v-if="$attrs.imgvalue"
                            :alt="option[$attrs.labelvalue]"
                            :class="[isRoundedImage ? 'rounded-lg w-5 h-5' : 'rounded-sm w-6 h-4', 'mr-2 object-contain bg-white shrink-0']"
                            :src="option[$attrs.imgvalue]"
                            :title="option[$attrs.labelvalue]"
                        />
                        <span v-if="prefix !== null || prefix !== ''" class="group-hover:text-slate-100">{{ prefix }}</span>
                        <span class="group-hover:text-slate-100">{{ option[$attrs.labelvalue] }}</span>
                        <span v-if="$attrs.secondlabelvalue" class="font-light ml-0.5 group-hover:text-slate-100 opacity-75">, {{ option[$attrs.secondlabelvalue] }}</span>
                        <span v-if="$attrs.thirdlabelvalue" class="font-light ml-0.5 group-hover:text-slate-100 opacity-75">, {{ option[$attrs.thirdlabelvalue] }}</span>
                    </div>
                </template>
                <template #selected-option="{ name, key, imageUrl, title, label }">
                    <div>
                        <div :class="[icon && 'pl-5', 'flex items-center whitespace-nowrap truncate text-sm']">
                            <NuxtImg
                                v-if="$attrs.imgvalue"
                                :alt="name"
                                :class="[isRoundedImage ? 'rounded-lg w-5 h-5' : 'rounded-sm w-6 h-4', ' mr-2 object-contain bg-white shrink-0']"
                                :src="imageUrl"
                                :title="name"
                            />
                            <div v-if="prefix" class="truncate">{{ prefix }}</div>
                            <div v-if="$attrs.labelvalue === 'name'" class="truncate">{{ name }}</div>
                            <div v-if="$attrs.labelvalue === 'label'" class="truncate">{{ label }}</div>
                            <div v-if="$attrs.labelvalue === 'title'" class="truncate">{{ title }}</div>
                            <div v-if="$attrs.labelvalue === 'key'" class="truncate">{{ key }}</div>
                        </div>
                    </div>
                </template>
                <template #search="{ attributes, events }">
                    <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon :name="icon" class="h-5 w-5 text-slate-400 dark:text-slate-600" />
                    </div>
                    <label :for="name" class="sr-only">{{ label }}</label>
                    <input
                        :id="name"
                        :class="[icon ? 'pl-10' : 'pl-4', errors.length > 0 ? 'border !border-danger' : '', 'vs__search form-control']"
                        v-bind="attributes"
                        v-on="events"
                    />
                </template>
            </VueSelect>
        </div>
        <div v-if="description" class="form-help !text-slate-400 ml-4" v-html="description" />
        <template v-if="errors.length > 0">
            <ul class="mt-1">
                <li v-for="(error, errorIndex) in errors" :key="errorIndex" class="!text-xs !font-light text-danger">
                    {{ error.$message }}
                </li>
            </ul>
        </template>
    </div>
</template>
