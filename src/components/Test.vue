<template>
    <div id="app">
    <select v-model="selected">
        <option disabled value="">Select Item</option>
        <option v-for="item in items" :value="item.text" :key="item.text">{{ item.text }}</option>
    </select>
 
    <p>
        <b>Selected</b>: {{ selected }}
    </p>
</div>
</template>

<script>
export default {
    data(){
        return{
            items:[
                { text: 'first'},
                { text: 'second'},
                { text: 'third'},
                { text: 'fourth'},
                { text: 'fifth'},
                { text: 'six'}
            ],
            selected: ''
        }
    },
}
</script>