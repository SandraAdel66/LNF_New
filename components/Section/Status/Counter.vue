<template>
    <div>
        {{ count }}<span class="ml-2">{{ prefix }}</span>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'AutoCountSimple',
    props: {
        endValue: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            default: 4000, // Default duration in milliseconds (4 seconds)
        },
        prefix: {
            type: String,
            default: '+',
        },
    },
    setup(props) {
        const count = ref(0);
        let interval;
        const durationSpeed = ref(Math.ceil(props.duration / props.endValue));

        // console.log(durationSpeed)
        const startCounter = () => {
            const step = 1; // Calculate step based on duration
            interval = setInterval(() => {
                if (count.value < props.endValue) {
                    count.value += step;
                } else {
                    count.value = props.endValue;
                    clearInterval(interval);
                }
            }, durationSpeed.value);
        };

        onMounted(() => {
            startCounter();
        });

        onBeforeUnmount(() => {
            clearInterval(interval);
        });

        return {
            count,
        };
    },
};
</script>
