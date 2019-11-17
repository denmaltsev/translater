package dvm.translater.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TranslateResultDto {
    private String code;
    private String lang;
    private String text;
}
