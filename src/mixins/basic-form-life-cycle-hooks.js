export default {
  beforeCreate() {
    console.log('Hook 1: beforeCreate, js object for component has not been created yet')
  },
  created() {
    console.log('Hook 2: created, js object for component is created ~ but component is NOT mounted to DOM')
  },
  beforeMount() {
    console.log('Hook 3: beforeMount, component has not been mounted to DOM yet, but is about to be')
  },
  mounted() {
    console.log('Hook 4: mounted, component has been mounted to DOM')
  },
  beforeUpdate() {
    console.log('Hook 5: before update, component template is about to update')
  },
  updated() {
    console.log('Hook 6: updated, component template has just finished updating')
  },
  beforeDestroy() {
    console.log('Hook 7: component is about to be destroyed')
  },
  destroyed() {
    console.log('Hook 8: component isntance has been destroyed')
  },
}