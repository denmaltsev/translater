package dvm.translater.util;

import dvm.translater.exceptions.ServiceNotAvailable;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

@Service
public class RestService {

    private final RestTemplate restTemplate;

    public RestService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public Post request(String url){
        ResponseEntity<Post> response = this.restTemplate.getForEntity(url, Post.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            return null;
        }
    }

    public String unknownRequest(String url){
        try {
            return this.restTemplate.getForObject(url, String.class);
        } catch (HttpStatusCodeException e) {

            if (e.getRawStatusCode() == 404) throw new ServiceNotAvailable();
        }

        return null;
    }
}
