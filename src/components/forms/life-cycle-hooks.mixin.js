export default {
    beforeCreate() {
        // console.log('Before Create: Before the js object for the vue instance is created')
        // console.log('beforeCreate does not have access to this')
    },
    created() {
        // console.log('created: right after the js object for the vue instance is created')
        // console.log('created is just the js object, we have not mounted the template to the dom as of yet')
    },
    beforeMount() {
        // console.log('beforeMount: after vue instance js object is created but before we have mounted the template to the dom')
    },
    mounted() {
        // console.log('mounted: triggers immedietly after we mount the vue template to our DOM')
    },
    beforeUpdate() {
        // console.log('beforeUpdate: triggered before the template updates')
    },
    updated() {
        // console.log('updated: triggered right after the template is updated')

    },
    beforeDestroy() {
        // console.log('beforeDestroy: triggered before the vue instance is destroyed')
    },
    destroyed() {
        // console.log('destroyed: triggered after vue js instance is destroyed')
    },
}