package com.springapp.mvc.web.daoLike;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.model.Suggestions;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2016/01/16.
 * for input（form） suggestions
 */
@Repository
public class SuggestionDAO {
    private RestClient rc = new RestClient();

    public List<String> getSuggestions(String query) {
        List<String> suggestions = Suggestions.getSuggestions();
        List<String> result = new ArrayList<String>();
        String[] queryList = query.split(" ");
        for (int i = 0; i < queryList.length; i++) {
            for (String s : suggestions) {
                if (s.contains(queryList[i])) {
                    result.add(s);
                }
            }
        }
        return result;
    }

    /*public static void main(String[] args) {
        SuggestionDAO dao = new SuggestionDAO();
        dao.getSuggestions("8");
        dao.getSuggestions("2 8 l");
    }*/
}
