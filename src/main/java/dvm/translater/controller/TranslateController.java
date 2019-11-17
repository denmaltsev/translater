package dvm.translater.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("translate")
public class TranslateController {

    private String apiKey="trnsl.1.1.20191116T081438Z.4e2042ca1d0c4bf0.5e3288d242c52625f6941daad238cfb4ce79c2cd";
    private String apiUrl="https://translate.yandex.net/api/v1.5/tr.json";

//    https://translate.yandex.net/api/v1.5/tr.json/getLangs
//            ? [key=<API-ключ>]
//            & [ui=<код языка>]
//            & [callback=<имя callback-функции>]


    private List<Map <String, String>> languageList = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{ put("lang", "ru"); put("desc", "Russian"); }});
        add(new HashMap<String, String>() {{ put("lang", "en"); put("desc", "English"); }});
        add(new HashMap<String, String>() {{ put("lang", "sl"); put("desc", "Slovenian"); }});
    }};

    @GetMapping
    public List<Map<String, String>> langList () {
        return languageList;
    }

}
