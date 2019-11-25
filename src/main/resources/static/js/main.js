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

Vue.component('translate-from', {
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
                let text = {text: this.text};
                let langFrom = {langFrom: this.langFrom};
                let langTo = {langTo: this.langTo};
                let translatedText = {translatedText: this.translatedText};

                // console.log(text);
                // console.log(langFrom);
                // console.log(langTo);

                translateApi.do( {src: this.langFrom, dst: this.langTo, text: this.text}).then(result =>
                    result.json().then(data => {
                                                    this.translatedText = data.text
                                               }
                                      )
                )

            }
        },
    // computed: {
    //     textInput: {
    //         get: function() {
    //             return this.text.trim();
    //         },
    //         set: function( newValue ) {
    //             this.$emit('update:text', newValue)
    //         }
    //     }
    // }
});

Vue.component('languages', {
  props: ['supportedLanguages', 'langFrom', 'langTo'],
  data: function() {
      return {
          langFromLocal: this.langFrom,
          langToLocal: this.langTo
      }
  },
  template: '<div>' +
              '<select v-model="langFromLocal">' +
              '<option v-for="lang in supportedLanguages" v-bind:value="lang.code"> {{ lang.text }} </option>' +
              '</select>' +
              '<select v-model="langToLocal">' +
              '<option v-for="lang in supportedLanguages" v-bind:value="lang.code"> {{ lang.text }} </option>' +
              '</select>' +
            '</div>'
    // created: function() {
    //     translateApi.get_lang().then(result =>
    //         result.json().then(data => {
    //                 data.forEach(lang => this.supportedLanguages.push(lang));
    //                 // console.log(data)
    //                 // data.forEach (lang => this.langToLocal.push(lang))
    //             }
    //         )
    //     )
    // }
});

Vue.component('translate-form', {
    props: ['supportedLanguages', 'langFrom', 'langTo'/*, 'text', 'translatedText'*/],
    // template: '<div> {{ supportedLanguages }} </div>'
    // data: function() {
    //   return {
    //       text: '',
    //       translatedText: ''
    //   }
    // },
    template: '<div>' +
            '<languages :supportedLanguages="supportedLanguages" :langFrom="langFrom" :langTo="langTo"/>' +
            // '<translate-from :text="text" :langFrom="langFrom" :langTo="langTo"/>'+
            '<translate-from :langFrom="langFrom" :langTo="langTo"/>'+
            // '<translate-result :translatedText="translatedText"/>'+
        '</div>'
});

var app = new Vue({
    el: '#app',
    template: '<translate-form :supportedLanguages="supportedLanguages" :langFrom="langFrom" :langTo="langTo"/>',
    data: {
        langFrom: 'ru',
        langTo: 'en',
        supportedLanguages: [
            { code: 'ru', text:'Русский'},
            { code: 'en', text:'Английский'},
            { code: 'sl', text:'Словенский'}
        ]
    },
    methods:{
        pullSupportedLanguages(){
            translateApi.get_lang().then(result =>
                result.json().then(data =>
                    data.forEach(lang => this.supportedLanguages.push(lang))
                    // console.log(data)
                )
            )
        }
    },
    // created: function() {
    //     this.pullSupportedLanguages()
    // }
});