package dvm.translater.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Data
public class SupportedLanguagesDto {
    private String[] dirs;
    private List<Map <String, String>> langs;
}
