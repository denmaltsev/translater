var translateActions = {
    get_lang: {method: 'GET', url: '/translate/get_lang'},
    do: {method: 'GET', url: '/translate/do'},
    detect: {method: 'GET', url: '/translate/detect'}
};

var translateApi = Vue.resource("/translate{/id}", {}, translateActions);

var app = new Vue({
    el: '#app',
    data: {
        message: 'Привет, Vue!'
    }
});