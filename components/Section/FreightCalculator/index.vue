<script setup>
import Table from '~/components/Section/FreightCalculator/Table.vue';

const tabs = ref([
    { id: 'units-converting', name: 'Units Converting', icon: 'solar:tuning-square-2-outline' },
    { id: 'ocean-freight-measure', name: 'Ocean/Sea Freight Measure', icon: 'hugeicons:cargo-ship' },
    { id: 'air-freight-weight', name: 'Air Freight Weight', icon: 'ph:airplane' },
    { id: 'courier-weight', name: 'Courier Weight', icon: 'hugeicons:shipping-truck-02' },
]);

const activeTab = ref('units-converting');
const unitList = ref([
    { id: 'pound', name: 'Pound' },
    { id: 'grams', name: 'Grams' },
    { id: 'kilograms', name: 'Kilograms' },
]);
const measurementUnits = ref([
    { id: 'cm', name: 'CM' },
    { id: 'm', name: 'M' },
    { id: 'inch', name: 'INCH' },
]);
const sizesList = ref([
    { id: 'feet', name: 'Cubic Feet' },
    { id: 'meters', name: 'Cubic Meters' },
]);
const airCBM = ref([{ id: 'meters', name: 'Cubic Meters' }]);

const toggleActiveTab = (tab) => {
    activeTab.value = tab;
};

const weight = ref({
    value: null,
    unit: null,
    output: null,
});

const resetWeight = () => {
    weight.value = {
        value: null,
        unit: null,
        output: null,
    };
};
const convertUnitsKg = () => {
    const { value, unit } = weight.value;
    if (value && unit) {
        switch (unit) {
            case 'pound':
                weight.value.output = (value * 0.453592).toFixed(3); // Convert pounds to kilograms
                break;
            case 'grams':
                weight.value.output = (value / 1000).toFixed(3); // Convert grams to kilograms
                break;
            case 'kilograms':
                weight.value.output = value.toFixed(3); // No conversion needed
                break;
            default:
                weight.value.output = null; // Invalid unit
        }
    } else {
        weight.value.output = null; // Reset output if either value or unit is null
    }
};

const size = ref({
    value: null,
    unit: null,
    output: null,
});
const resetSize = () => {
    size.value = {
        value: null,
        unit: null,
        output: null,
    };
};

const convertUnitsMeter = () => {
    const { value, unit } = size.value;
    if (value && unit) {
        switch (unit) {
            case 'feet':
                size.value.output = (value * 0.0283168).toFixed(3); // Convert cubic feet to cubic meters
                break;
            case 'meters':
                size.value.output = value.toFixed(3); // No conversion needed
                break;
            default:
                size.value.output = null; // Invalid unit
        }
    } else {
        size.value.output = null; // Reset output if either value or unit is null
    }
};

const cbm = ref({
    value: null,
    unit: null,
    output: null,
});

const resetCBM = () => {
    cbm.value = {
        value: null,
        unit: null,
        output: null,
    };
};
const convertUnitsCBM = () => {
    const { value, unit } = cbm.value;
    if (value !== null && unit !== null) {
        switch (unit) {
            case 'meters':
                cbm.value.output = (value * 166.67).toFixed(4); // Convert cubic feet to cubic meters
                break;
            default:
                cbm.value.output = null; // Invalid unit
        }
    } else {
        cbm.value.output = null; // Reset output if either value or unit is null
    }
};

const dimensions = ref({
    length: null,
    width: null,
    height: null,
    // Output
    outputInches: null,
    outputCM: null,
    outputCFeet: null,
});
const resetDimensions = () => {
    dimensions.value = {
        length: null,
        width: null,
        height: null,
        // Output
        outputInches: null,
        outputCM: null,
        outputCFeet: null,
    };
};

const convertUnitsDimension = () => {
    const { length, width, height } = dimensions.value;

    if (length !== null && width !== null && height !== null) {
        // Calculate outputs
        dimensions.value.outputInches = length.toFixed(3);
        dimensions.value.outputCM = (length * 2.54).toFixed(3); // Convert inches to centimeters
        dimensions.value.outputCFeet = ((length * width * height) / 1728).toFixed(3); // Calculate cubic feet
    } else {
        // Reset outputs if any dimension is null
        dimensions.value.outputInches = null;
        dimensions.value.outputCM = null;
        dimensions.value.outputCFeet = null;
    }
};

const sea = ref({
    measures: [],
    activeSeaMeasure: {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    },
    totalSeaMeasure: 0,
});

const resetAllSeaMeasurements = () => {
    sea.value = {
        measures: [],
        activeSeaMeasure: {
            qty: null,
            des: null,
            length: null,
            width: null,
            height: null,
            cubicInches: null,
            unit: 'cm',
            cbm: null,
        },
        totalSeaMeasure: 0,
    };
};

const resetCurrentSeaMeasurement = () => {
    sea.value.activeSeaMeasure = {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    };
};

const convertAndAddSeaCBM = () => {
    const { qty, des, length, width, height, unit } = sea.value.activeSeaMeasure;

    if (qty && des && length && width && height && unit) {
        let cubicInches;

        if (unit === 'cm') {
            cubicInches = length * width * height * 0.0610237;
        } else if (unit === 'm') {
            cubicInches = 61023.7 * (length * width * height);
            cubicInches = Math.round(cubicInches);
        } else {
            cubicInches = length * width * height;
        }
        const cbm = cubicInches * 0.000016387064;
        sea.value.measures.push({
            qty: parseInt(qty), // Convert to integer
            des: des.toString(), // Convert to string
            length: parseInt(length), // Convert to integer
            width: parseInt(width), // Convert to integer
            height: parseInt(height), // Convert to integer
            cubicInches: Math.round(cubicInches), // Ensure cubicInches is rounded to the nearest integer
            cbm: cbm.toFixed(4),
            unit, // Store the unit for display
        });
        sea.value.totalSeaMeasure = (parseFloat(sea.value.totalSeaMeasure) + cbm * qty).toFixed(4);
        // Reset activeSeaMeasure
        sea.value.activeSeaMeasure.qty = null;
        sea.value.activeSeaMeasure.des = null;
        sea.value.activeSeaMeasure.length = null;
        sea.value.activeSeaMeasure.width = null;
        sea.value.activeSeaMeasure.height = null;
        sea.value.activeSeaMeasure.unit = 'cm'; // Reset to default unit
    }
};

const air = ref({
    measures: [],
    activeAirMeasure: {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    },
    totalAirMeasure: 0,
});

const resetAllAirMeasurements = () => {
    air.value = {
        measures: [],
        activeAirMeasure: {
            qty: null,
            des: null,
            length: null,
            width: null,
            height: null,
            cubicInches: null,
            unit: 'cm',
            cbm: null,
        },
        totalAirMeasure: 0,
    };
};

const resetCurrentAirMeasurement = () => {
    air.value.activeAirMeasure = {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    };
};

const convertAndAddAirCBM = () => {
    const { qty, des, length, width, height, unit } = air.value.activeAirMeasure;

    if (qty && des && length && width && height && unit) {
        let cubicInches;

        if (unit === 'cm') {
            cubicInches = length * width * height * 0.0610237;
        } else if (unit === 'm') {
            cubicInches = 61023.7 * (length * width * height);
            cubicInches = Math.round(cubicInches);
        } else {
            cubicInches = length * width * height;
        }

        const cbm1 = cubicInches * 16.387064;
        const cbm = cbm1 / 6000;

        air.value.measures.push({
            qty: parseInt(qty), // Convert to integer
            des: des.toString(), // Convert to string
            length: parseInt(length), // Convert to integer
            width: parseInt(width), // Convert to integer
            height: parseInt(height), // Convert to integer
            cubicInches,
            cbm: cbm.toFixed(4),
            unit, // Store the unit for display
        });

        air.value.totalAirMeasure = (parseFloat(air.value.totalAirMeasure) + cbm * qty).toFixed(4);

        // Reset activeAirMeasure
        air.value.activeAirMeasure.qty = null;
        air.value.activeAirMeasure.des = null;
        air.value.activeAirMeasure.length = null;
        air.value.activeAirMeasure.width = null;
        air.value.activeAirMeasure.height = null;
        air.value.activeAirMeasure.unit = 'cm'; // Reset to default unit
    }
};

const courier = ref({
    measures: [],
    activeCourierMeasure: {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    },
    totalCourierMeasure: 0,
});

const resetAllCourierMeasurements = () => {
    courier.value = {
        measures: [],
        activeCourierMeasure: {
            qty: null,
            des: null,
            length: null,
            width: null,
            height: null,
            cubicInches: null,
            unit: 'cm',
            cbm: null,
        },
        totalCourierMeasure: 0,
    };
};

const resetCurrentCourierMeasurement = () => {
    courier.value.activeCourierMeasure = {
        qty: null,
        des: null,
        length: null,
        width: null,
        height: null,
        cubicInches: null,
        unit: 'cm',
        cbm: null,
    };
};

const convertAndAddCourierCBM = () => {
    const { qty, des, length, width, height, unit } = courier.value.activeCourierMeasure;

    if (qty && des && length && width && height && unit) {
        let cubicInches;
        if (unit === 'cm') {
            cubicInches = length * width * height * 0.0610237;
        } else if (unit === 'm') {
            cubicInches = 61023.7 * (length * width * height);
            cubicInches = Math.round(cubicInches);
        } else {
            cubicInches = length * width * height;
        }

        const cbm1 = cubicInches * 16.387064;
        const cbm = cbm1 / 5000;

        courier.value.measures.push({
            qty: parseInt(qty), // Convert to integer
            des: des.toString(), // Convert to string
            length: parseInt(length), // Convert to integer
            width: parseInt(width), // Convert to integer
            height: parseInt(height), // Convert to integer
            cubicInches,
            cbm: cbm.toFixed(4),
            unit, // Store the unit for display
        });

        courier.value.totalCourierMeasure = (parseFloat(courier.value.totalCourierMeasure) + cbm * qty).toFixed(4);

        // Reset activeCourierMeasure
        courier.value.activeCourierMeasure.qty = null;
        courier.value.activeCourierMeasure.des = null;
        courier.value.activeCourierMeasure.length = null;
        courier.value.activeCourierMeasure.width = null;
        courier.value.activeCourierMeasure.height = null;
        courier.value.activeCourierMeasure.unit = 'cm'; // Reset to default unit
    }
};
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex lg:flex-row flex-col gap-5">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="[activeTab !== tab.id ? 'bg-white text-slate-600 opacity-75' : 'btn-primary', 'btn   gap-3 grow']"
                @click="toggleActiveTab(tab.id)"
            >
                <Icon v-if="tab.icon" :name="tab.icon" class="size-5" />
                <span>{{ tab.name }}</span>
            </button>
        </div>
        <TransitionExpand>
            <div v-if="activeTab === 'units-converting'" class="flex flex-col gap-5">
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Please enter the weight and size of your freight:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="weight.value" class="lg:col-span-3" name="weight-value" placeholder="Enter weight value" type="number" />
                        <FormSelectInput
                            v-model="weight.unit"
                            :select-data="unitList"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="weight-unit"
                            placeholder="Select your unit"
                        />

                        <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertUnitsKg">Convert</button>
                        <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetWeight">Reset</button>
                        <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                            <span>{{ weight.output ?? 0 }}</span>
                            <span class="text-xs font-light">Kilograms</span>
                        </div>
                    </div>
                </div>
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Please enter the measure and size of your freight:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="size.value" class="lg:col-span-3" name="size-value" placeholder="Enter Measure value" type="number" />
                        <FormSelectInput
                            v-model="size.unit"
                            :select-data="sizesList"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="size-unit"
                            placeholder="Select your unit"
                        />

                        <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertUnitsMeter">Convert</button>
                        <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetSize">Reset</button>
                        <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                            <span>{{ size.output ?? 0 }}</span>
                            <span class="text-xs font-light">Meters</span>
                        </div>
                    </div>
                </div>
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Please enter CBM to Convert to AirFreight Weight:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="cbm.value" class="lg:col-span-3" name="size-value" placeholder="Enter Measure value" type="number" />
                        <FormSelectInput
                            v-model="cbm.unit"
                            :select-data="airCBM"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="size-unit"
                            placeholder="Select your unit"
                        />

                        <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertUnitsCBM">Convert</button>
                        <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetCBM">Reset</button>
                        <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                            <span>{{ cbm.output ?? 0 }}</span>
                            <span class="text-xs font-light">Kilograms</span>
                        </div>
                    </div>
                </div>
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Please enter the Dimension and size of your freight (per inch):</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="dimensions.length" class="lg:col-span-3" name="size-value" placeholder="Enter length value in inch" type="number" />
                        <FormTextInput v-model="dimensions.width" class="lg:col-span-3" name="size-value" placeholder="Enter width value in inch" type="number" />
                        <FormTextInput v-model="dimensions.height" class="lg:col-span-3" name="size-value" placeholder="Enter height value in inch" type="number" />

                        <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertUnitsDimension">Convert</button>
                        <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetDimensions">Reset</button>
                        <div class="lg:col-span-12 grid lg:grid-cols-12 gap-3">
                            <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                                <span>{{ dimensions.outputCFeet ?? 0 }}</span>
                                <span class="text-xs font-light">Cubic Feet</span>
                            </div>
                            <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                                <span>{{ dimensions.outputCM ?? 0 }}</span>
                                <span class="text-xs font-light">CM</span>
                            </div>
                            <div class="lg:col-span-3 bg-slate-50 flex items-center place-content-center text-sm justify-between py-2 px-5 rounded-full">
                                <span>{{ dimensions.outputInches ?? 0 }}</span>
                                <span class="text-xs font-light">Inches</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionExpand>
        <TransitionExpand>
            <div v-if="activeTab === 'ocean-freight-measure'" class="flex flex-col gap-5">
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Use the form below to calculate the total Ocean/Sea Freight Measure:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="sea.activeSeaMeasure.qty" class="lg:col-span-3" name="weight-value" placeholder="QTY of boxes" type="number" />
                        <FormTextInput v-model="sea.activeSeaMeasure.des" class="lg:col-span-9" name="weight-value" placeholder="Description" />
                        <FormTextInput v-model="sea.activeSeaMeasure.length" class="lg:col-span-3" name="weight-value" placeholder="Please enter length per box" type="number" />
                        <FormTextInput v-model="sea.activeSeaMeasure.width" class="lg:col-span-3" name="weight-value" placeholder="Please enter width per box" type="number" />
                        <FormTextInput v-model="sea.activeSeaMeasure.height" class="lg:col-span-3" name="weight-value" placeholder="Please enter height per box" type="number" />
                        <FormSelectInput
                            v-model="sea.activeSeaMeasure.unit"
                            :clearable="false"
                            :select-data="measurementUnits"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="weight-unit"
                            placeholder="Select your unit"
                        />
                        <div class="lg:col-span-12 flex lg:flex-row flex-col gap-5 justify-end mt-5">
                            <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertAndAddSeaCBM">Add</button>
                            <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetCurrentSeaMeasurement">Reset Current</button>
                            <button class="lg:col-span-1 btn btn-danger" type="button" @click="resetAllSeaMeasurements">Reset All Values</button>
                        </div>
                    </div>
                </div>
                <div v-if="sea.measures.length > 0">
                    <table class="mt-8 table table-report font-light text-sm">
                        <thead>
                            <tr class="uppercase">
                                <th class="text-left">QTY</th>
                                <th class="text-left lg:table-cell hidden">Description</th>
                                <th class="text-left">Length</th>
                                <th class="text-left">Width</th>
                                <th class="text-left">Height</th>
                                <th class="text-left">Cubic Inches</th>
                                <th class="text-left">CBM/Box</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in sea.measures" :key="row.id">
                                <td>{{ row.qty }}</td>
                                <td class="lg:table-cell hidden">
                                    <div class="truncate max-w-64">{{ row.des }}</div>
                                </td>
                                <td>{{ row.length + ' ' + row.unit }}</td>
                                <td>{{ row.width + ' ' + row.unit }}</td>
                                <td>{{ row.height + ' ' + row.unit }}</td>
                                <td>{{ row.cubicInches }}</td>
                                <td>{{ row.cbm }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex md:flex-row flex-col items-center justify-between gap-5">
                        <div>Total</div>
                        <div class="md:min-w-64 border bg-white flex items-center place-content-center text-base justify-between py-2 px-5 rounded-full">
                            <span>{{ sea.totalSeaMeasure ?? 0 }}</span>
                            <span class="text-sm font-light">Cubic Meter</span>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionExpand>
        <TransitionExpand>
            <div v-if="activeTab === 'air-freight-weight'" class="flex flex-col gap-5">
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Use the form below to calculate the total Air Freight Weight:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="air.activeAirMeasure.qty" class="lg:col-span-3" name="weight-value" placeholder="QTY of boxes" type="number" />
                        <FormTextInput v-model="air.activeAirMeasure.des" class="lg:col-span-9" name="weight-value" placeholder="Description" />
                        <FormTextInput v-model="air.activeAirMeasure.length" class="lg:col-span-3" name="weight-value" placeholder="Please enter length per box" type="number" />
                        <FormTextInput v-model="air.activeAirMeasure.width" class="lg:col-span-3" name="weight-value" placeholder="Please enter width per box" type="number" />
                        <FormTextInput v-model="air.activeAirMeasure.height" class="lg:col-span-3" name="weight-value" placeholder="Please enter height per box" type="number" />
                        <FormSelectInput
                            v-model="air.activeAirMeasure.unit"
                            :clearable="false"
                            :select-data="measurementUnits"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="weight-unit"
                            placeholder="Select your unit"
                        />
                        <div class="lg:col-span-12 flex lg:flex-row flex-col gap-5 justify-end mt-5">
                            <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertAndAddAirCBM">Add</button>
                            <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetCurrentAirMeasurement">Reset Current</button>
                            <button class="lg:col-span-1 btn btn-danger" type="button" @click="resetAllAirMeasurements">Reset All Values</button>
                        </div>
                    </div>
                </div>
                <div v-if="air.measures.length > 0">
                    <table class="mt-8 table table-report font-light text-sm">
                        <thead>
                            <tr class="uppercase">
                                <th class="text-left">QTY</th>
                                <th class="text-left lg:table-cell hidden">Description</th>
                                <th class="text-left">Length</th>
                                <th class="text-left">Width</th>
                                <th class="text-left">Height</th>
                                <th class="text-left">Cubic Inches</th>
                                <th class="text-left">Volumetric Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in air.measures" :key="row.id">
                                <td>{{ row.qty }}</td>
                                <td class="lg:table-cell hidden">
                                    <div class="truncate max-w-64">{{ row.des }}</div>
                                </td>
                                <td>{{ row.length + ' ' + row.unit }}</td>
                                <td>{{ row.width + ' ' + row.unit }}</td>
                                <td>{{ row.height + ' ' + row.unit }}</td>
                                <td>{{ row.cubicInches }}</td>
                                <td>{{ row.cbm }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex md:flex-row flex-col items start justify-between gap-5">
                        <div>Total</div>
                        <div class="space-y-2">
                            <div class="md:min-w-64 border bg-white flex items-center place-content-center text-base justify-between py-2 px-5 rounded-full">
                                <span>{{ air.totalAirMeasure ?? 0 }}</span>
                                <span class="text-sm font-light">Volumetric Weight</span>
                            </div>
                            <div class="md:min-w-64 border bg-white flex items-center place-content-center text-base justify-between py-2 px-5 rounded-full">
                                <span>{{ (air.totalAirMeasure * 2.20462).toFixed(4) ?? 0 }}</span>
                                <span class="text-sm font-light">lbs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionExpand>
        <TransitionExpand>
            <div v-if="activeTab === 'courier-weight'" class="flex flex-col gap-5">
                <div class="intro-x bg-white border p-5 rounded-2xl">
                    <div class="font-light text-sm">Use the form below to calculate the total Courier Weight:</div>
                    <div class="mt-3 grid lg:grid-cols-12 gap-3">
                        <FormTextInput v-model="courier.activeCourierMeasure.qty" class="lg:col-span-3" name="weight-value" placeholder="QTY of boxes" type="number" />
                        <FormTextInput v-model="courier.activeCourierMeasure.des" class="lg:col-span-9" name="weight-value" placeholder="Description" />
                        <FormTextInput
                            v-model="courier.activeCourierMeasure.length"
                            class="lg:col-span-3"
                            name="weight-value"
                            placeholder="Please enter length per box"
                            type="number"
                        />
                        <FormTextInput
                            v-model="courier.activeCourierMeasure.width"
                            class="lg:col-span-3"
                            name="weight-value"
                            placeholder="Please enter width per box"
                            type="number"
                        />
                        <FormTextInput
                            v-model="courier.activeCourierMeasure.height"
                            class="lg:col-span-3"
                            name="weight-value"
                            placeholder="Please enter height per box"
                            type="number"
                        />
                        <FormSelectInput
                            v-model="courier.activeCourierMeasure.unit"
                            :clearable="false"
                            :select-data="measurementUnits"
                            class="lg:col-span-3"
                            keyvalue="id"
                            labelvalue="name"
                            name="weight-unit"
                            placeholder="Select your unit"
                        />
                        <div class="lg:col-span-12 flex lg:flex-row flex-col gap-5 justify-end mt-5">
                            <button class="lg:col-span-2 btn btn-primary" type="button" @click="convertAndAddCourierCBM">Add</button>
                            <button class="lg:col-span-1 btn btn-light bg-slate-50" type="button" @click="resetCurrentCourierMeasurement">Reset Current</button>
                            <button class="lg:col-span-1 btn btn-danger" type="button" @click="resetAllCourierMeasurements">Reset All Values</button>
                        </div>
                    </div>
                </div>
                <div v-if="courier.measures.length > 0">
                    <table class="mt-8 table table-report font-light text-sm">
                        <thead>
                            <tr class="uppercase">
                                <th class="text-left">QTY</th>
                                <th class="text-left lg:table-cell hidden">Description</th>
                                <th class="text-left">Length</th>
                                <th class="text-left">Width</th>
                                <th class="text-left">Height</th>
                                <th class="text-left">Cubic Inches</th>
                                <th class="text-left">CBM Per Box</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in courier.measures" :key="row.id">
                                <td>{{ row.qty }}</td>
                                <td class="lg:table-cell hidden">
                                    <div class="truncate max-w-64">{{ row.des }}</div>
                                </td>
                                <td>{{ row.length + ' ' + row.unit }}</td>
                                <td>{{ row.width + ' ' + row.unit }}</td>
                                <td>{{ row.height + ' ' + row.unit }}</td>
                                <td>{{ row.cubicInches }}</td>
                                <td>{{ row.cbm }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex md:flex-row flex-col items start justify-between gap-5">
                        <div>Total</div>
                        <div class="space-y-2">
                            <div class="md:min-w-64 border bg-white flex items-center place-content-center text-base justify-between py-2 px-5 rounded-full">
                                <span>{{ courier.totalCourierMeasure ?? 0 }}</span>
                                <span class="text-sm font-light">Volumetric Weight</span>
                            </div>
                            <div class="md:min-w-64 border bg-white flex items-center place-content-center text-base justify-between py-2 px-5 rounded-full">
                                <span>{{ (courier.totalCourierMeasure * 2.20462).toFixed(4) ?? 0 }}</span>
                                <span class="text-sm font-light">lbs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionExpand>
    </div>
</template>
