package com.springapp.mvc.web.timer;

import com.springapp.mvc.web.model.NewSuggestions;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by lyp on 2016/1/17.
 * 定时任务，每天陵城2点从搜索平台获取数据，为界面的input提示准备数据
 */
public class SuggestionTimer {
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void execute() {
        Runnable task = new Runnable() {
            @Override
            public void run() {
                NewSuggestions.initSuggestions();
//                System.out.println("----------init-------------" + new Date().getTime());
            }
        };
        if (scheduler.isShutdown()) {
            scheduler = Executors.newScheduledThreadPool(1);
            scheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.DAYS);
        } else {
            scheduler.scheduleAtFixedRate(task, 0, 1, TimeUnit.DAYS);
        }
    }

    public void stop() {
        scheduler.shutdown();
    }

}






























