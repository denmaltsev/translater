package dvm.translater.controller;

import lombok.Getter;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("translate")
@Getter
public class TranslateController {

    private static final String MESSAGE_SERVICE_AVAILABLE = "Сервис доступен";
    private static final String MESSAGE_SERVICE_UNAVAILABLE = "Сервис не доступен";

    private static final String API_KEY = "trnsl.1.1.20191116T081438Z.4e2042ca1d0c4bf0.5e3288d242c52625f6941daad238cfb4ce79c2cd";
    private static final String API_URL_GET_SUPPORTED_LANG = "https://translate.yandex.net/api/v1.5/tr.json/getLangs";
    private static final String API_URL_TRANSLATE = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=%s&text=%s&lang=%s-%s";
    private static final String API_URL_LAG_DETECT = "https://translate.yandex.net/api/v1.5/tr.json/detect";

//    private String apiUrl="https://translate.yandex.net/api/v1.5/tr.json";

//    https://translate.yandex.net/api/v1.5/tr.json/getLangs
//            ? [key=<API-ключ>]
//            & [ui=<код языка>]
//            & [callback=<имя callback-функции>]

    private boolean serviceAvailable = false;

    private List<Map <String, String>> languageList = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{ put("lang", "ru"); put("desc", "Russian"); }});
        add(new HashMap<String, String>() {{ put("lang", "en"); put("desc", "English"); }});
        add(new HashMap<String, String>() {{ put("lang", "sl"); put("desc", "Slovenian"); }});
    }};

//    Проверяем доступность сервиса переводчика
    private static boolean pingHost (String url, int port, int timeOut) {

        HttpURLConnection connection;
        try {
            connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setConnectTimeout(timeOut);
            connection.setReadTimeout(timeOut);
            connection.setRequestMethod("GET");
            int responce = connection.getResponseCode();

            return (200 <= responce && responce <= 399);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
//        try (Socket socket = new Socket()) {
//            socket.connect(new InetSocketAddress(host, port), timeOut);
//            return socket.isConnected();
//        } catch (IOException e) {
//            return false;
//        }
    }


    //    Запрос к сервису
    private static String request (String url) throws IOException {

        URL nUrl = new URL(url);

        URLConnection connection = nUrl.openConnection();

        InputStream inputStream = connection.getInputStream();
        String response = new BufferedReader(new InputStreamReader(inputStream)).readLine();

        inputStream.close();

        return response;
    }

    private Map<String, Object> stringToMap (String str) {

        JsonParser parser = new BasicJsonParser();
        Map<String, Object> jsonMap;
        jsonMap = parser.parseMap(str);

        return jsonMap;
    }

    @GetMapping(value = "/")
    public String checkServiceAvailable() {

        if (pingHost("http://ya.ru", 80, 300)) {
            serviceAvailable = true;
            return MESSAGE_SERVICE_AVAILABLE;
        } else {
            serviceAvailable = false;
            return MESSAGE_SERVICE_UNAVAILABLE;
        }

    }

        @GetMapping(value = "/get_lang")
    public Map <String, Object> getSupportedLanguages() throws IOException {
        return stringToMap(request(API_URL_GET_SUPPORTED_LANG + "?key=" + API_KEY + "&ui=ru"));
    }

    @GetMapping(value = "/do")
    public Map <String, Object> getSupportedLanguages(
            @RequestParam (name = "src") String src,
            @RequestParam (name = "dst") String dst,
            @RequestParam (name = "text") String text
    ) throws IOException {
        return stringToMap(request(String.format(API_URL_TRANSLATE, API_KEY, text, src, dst)));
    }
}
