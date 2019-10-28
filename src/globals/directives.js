import Vue from 'vue'

Vue.directive('href', {
  bind(element, binding) {
    element.href = binding.value;
    element.addEventListener("click", event => {
      event.preventDefault();
      window.location = event.target.href;
    });
  }
})