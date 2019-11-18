package dvm.translater.util;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
class Post implements Serializable {
    private int userId;
    private int id;
    private String title;
    private String body;
}
