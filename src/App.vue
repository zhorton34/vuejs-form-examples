<template>
  <div id="app">
    
    <basic-form />

  </div>
</template>

<script>
  import BasicForm from './components/basic-form.vue'
  
  export default {
    name: 'app',
    components: {
      BasicForm
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.example-box {
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  height: 200px;
  z-index: 2;
  background-color: #d5d5d5;
  padding: 15px;
  border-left: 1px solid #0275d8;
  border-bottom: 1px solid #0275d8;
}
form {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  height: auto;
  width: 100;
}
form > input {
  width: 100%;
  text-align: left;
  border: 1px solid #333;
  border-radius: 3px;
  margin-top: 5px;
  font-size: 25px;
  padding-left: 20px;
  padding-right: 20px;
}
form > button {
  width: 100%;
  font-weight: bolder;
  text-align: center;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  margin-top: 5px;
  font-size: 25px;
  padding-left: 20px;
  background-color: #0275d8;
  color: #fff;
}
h1 {
  font-size: 44px;
  text-align: left;
  margin-bottom: -50px;
}
form {
  width: 70vw;
  padding: 25px;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  height: 80vh;
}
</style>