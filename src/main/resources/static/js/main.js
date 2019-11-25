// import Vue from 'vue';

var translateActions = {
    get_lang:{ method: 'GET', url: '/translate/get_lang' },
    do:{ method: 'GET', url: '/translate/do' },
    detect:{ method: 'POST', url: '/translate/detect' }
};

var translateApi = Vue.resource("/translate", {}, translateActions);

Vue.component('translate-result', {
    props:[ 'translatedText' ],
    template: '<div>' +
                '<span>Результат:</span><br>' +
                '<textarea disabled v-model="translatedText" placeholder="результат перевода" ></textarea>'+
              '</div>'
});

Vue.component('translate', {
    // props:[ 'text', 'langFrom', 'langTo', 'translatedText' ],
    props:[ 'langFrom', 'langTo' ],
    data: function() {
        return {
            // textLocal: this.text
            text: '',
            translatedText: ''
        }
    },
    template: '<div>' +
                '<span>Тект для перевода:</span></br>' +
                '<textarea v-model="text" placeholder="введите тект для перевода"></textarea></br>'+
                // '<textarea type="text" v-model="textInput" placeholder="введите тект для перевода"></textarea></br>'+
                '<button  v-on:click="translate">Перевести</button>'+
                '<button>Экспорт в XML</button></br>'+
                '<span>Результат:</span></br>' +
                '<textarea readonly v-model="translatedText" placeholder="результат перевода" ></textarea>'+
              '</div>',
    methods: {
            translate: function() {
                translateApi.do( {src: this.langFrom, dst: this.langTo, text: this.text}).then(result =>
                    result.json().then(data => {this.translatedText = data.text})
                )
            }
    }
});


Vue.component('language-form', {
  props: [ 'langFrom', 'langTo' ],
  data: function() {
      return {
          langFromLocal: this.langFrom,
          langToLocal: this.langTo,
          Languages: [],
          LanguagesTo: []
      }
  },
  template: '<div>' +
                '<div>' +
                    '<select v-model="langFromLocal" >' +
                        '<option v-on:click="" v-for="lang in Languages" v-bind:value="lang.code"> {{ lang.desc }} </option>' +
                    '</select>' +
                '</div>' +
                '<div>' +
                    '<select v-model="langToLocal">' +
                        '<option v-for="lang in LanguagesTo" v-bind:value="lang.code"> {{ lang.desc }} </option>' +
                    '</select>' +
                '</div>' +
            '</div>',
  created: function() {
    translateApi.get_lang().then(result =>
        result.json().then(data => {
                data.forEach(
                    lang => {
                        this.Languages.push(lang);
                        this.LanguagesTo.push(lang);
                    }
                )
            }
        )
    )
  }
});

Vue.component( 'translate-form', {
    // props:[ 'langFrom', 'langTo' ],
    // template: '<div> {{ supportedLanguages }} </div>'
    // data: function() {
    //   return {
    //       text: '',
    //       translatedText: ''
    //   }
    // },
    data:function () {
        return {
            langFrom: 'ru',
            langTo: 'en'
        }
    },
    template: '<div>' +
                '<language-form :langFrom="langFrom" :langTo="langTo"/>' +
                '<translate :langFrom="langFrom" :langTo="langTo"/>'+
              '</div>'
});

var app = new Vue({
    el: '#app',
    template: '<translate-form />'
    // template: '<translate-form :Languages="Languages" :langFrom="langFrom" :langTo="langTo"/>',
    // data: {
    //     langFrom: 'ru',
    //     langTo: 'en'
    //     // Languages: []
            // { code: 'ru', text:'Русский'},
            // { code: 'en', text:'Английский'},
            // { code: 'sl', text:'Словенский'}
        // ]
    // }
    // methods:{
    //     pullSupportedLanguages(){
    //         translateApi.get_lang().then(result =>
    //             result.json().then(data =>
    //                 data.forEach(lang => this.supportedLanguages.push(lang))
    //                 // console.log(data)
    //             )
    //         )
    //     }
    // },
    // created: function() {
    //     this.pullSupportedLanguages()
    // }
});