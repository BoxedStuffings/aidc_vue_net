import { inject, reactive, onMounted, onBeforeMount } from 'vue';

export default function useSelect() {
    const fabric = inject('fabric');
    const canvas = inject('canvas');
    const event = inject('event');
    return {
        fabric,
        canvas,
        mixinState: state,
    };
}
