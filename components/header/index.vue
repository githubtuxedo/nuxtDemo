<template>
    <header>
        <Left></Left>
        这里是头
        <!-- <Looper>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </Looper> -->
    </header>
</template>

<style>

</style>

<script>
import {Left, Looper} from './left.js';
export default {
    name: 'Headers',
    components: {
        Left,
        Looper,
    }
}
</script>


