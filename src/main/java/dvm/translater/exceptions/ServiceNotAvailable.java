package dvm.translater.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (value = HttpStatus.SERVICE_UNAVAILABLE)
public class ServiceNotAvailable extends RuntimeException {
}
