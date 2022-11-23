<template>
    <button class="btn" v-for="marker in markers" @click="center = marker.position" :key="marker.position">
        {{ marker.title }}
    </button>
    <GoogleMap api-key="AIzaSyBB0xtfPt3KJ4Xf9vt9Kg8wc2i0WyMx84s" style="width: 100%; height: 500px" :center="center" :zoom="10">
        <Marker v-for="m in markers" :options="m" @click="center = m.position" :key="m.position" />
    </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
    props: {},
    components: { GoogleMap, Marker },
    data() {
        return {
            center: { lat: 31.7683, lng: 35.2137 },
            markers: [
                {
                    title: 'Tel-Aviv',
                    label: 'Hipster Toy',
                    position: { lat: 32.0853, lng: 34.7818 },
                },
                {
                    title: 'Jerusalem',
                    label: 'Toy El Uts',
                    position: { lat: 31.7683, lng: 35.2137 },
                },
                {
                    title: 'Ramalla',
                    label: 'Toy El Machmud',
                    position: { lat: 31.8928, lng: 35.2113 },
                },
                {
                    title: 'Aman',
                    label: 'Toy El Muhanad',
                    position: { lat: 31.8928, lng: 35.9113 },
                },
            ],
        }
    },
}
</script>
