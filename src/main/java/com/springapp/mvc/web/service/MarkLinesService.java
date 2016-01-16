package com.springapp.mvc.web.service;

import com.springapp.mvc.web.daoLike.MarkLineDAO;
import com.springapp.mvc.web.model.MarkLineResponseBody;
import com.springapp.mvc.web.model.MarkLines;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lyp on 2015/12/10.
 * 业务逻辑层
 */
@Service
public class MarkLinesService {
    private static final Logger logger = LoggerFactory.getLogger(MarkLinesService.class);
    private final MarkLineDAO markLineDAO;

    @Autowired
    public MarkLinesService(MarkLineDAO markLineDAO) {
        this.markLineDAO = markLineDAO;
    }

    public MarkLineResponseBody getAllMarkLines(String pageId) {
        MarkLineResponseBody result = new MarkLineResponseBody();
//        System.out.println("MarkLineResponseBody starts-----------");
        MarkLines marklines = markLineDAO.getAllMarkLines(pageId);
        if (!"".equals(pageId)) {
            if (marklines != null && marklines.getLines().size() > 0) {
                result.setStatuscode("200");
                result.setErrmsg("");
                result.setData(marklines);
            } else {
                result.setStatuscode("204");
                result.setErrmsg("No related data!");
            }
        } else {
            result.setStatuscode("400");
            result.setErrmsg("PageId is empty!");
        }
        //ResponseBody will be converted into json format and send back to the request.
        return result;
    }

/*    public static void main(String[] args) {
        MarkLinesService mls = new MarkLinesService(new MarkLinesDAO());
        System.out.println(mls.getAllMarkLines());
    }*/
}
