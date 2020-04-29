<template>
    <div id='app' v-cloak>
        <div class="flex items-center justify-between flex-wrap shadow-xl mb-6 vue-nav">
            <img height='150' width='150' :src='logo' />
        </div>

        <login-form/>
    </div>
</template>

<script>
    import LoginForm from '@Auth/login'

    export default {
        name: 'dashboard-view',
        components: { LoginForm },
        data: () => ({
            logo: 'https://camo.githubusercontent.com/4f5f2a67d153e06cf1420c22aaf228f518b35901/68747470733a2f2f7468756d62732e6766796361742e636f6d2f50696e6b5069657263696e6742756c6c2d73697a655f726573747269637465642e676966'  
        })
    }
</script>

