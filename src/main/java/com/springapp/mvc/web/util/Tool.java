package com.springapp.mvc.web.util;

import net.sf.json.JSONObject;

/**
 * Created by lyp on 2016-01-22.
 * 工具类
 */
public class Tool {
    private static final String MAPPING = "{\"阿富汗\":\"Afghanistan\",\"阿尔巴尼亚\":\"Albania\",\"阿尔及利亚\":\"Algeria\",\"安道尔\":\"Andorra\",\"安哥拉\":\"Angola\",\"安提瓜和巴布达\":\"Antigua and Barbuda\",\"阿根廷\":\"Argentina\",\"亚美尼亚\":\"Armenia\",\"澳大利亚\":\"Australia\",\"奥地利\":\"Austria\",\"阿塞拜疆\":\"Azerbaijan\",\"巴哈马\":\"Bahamas, The\",\"巴林\":\"Bahrain\",\"孟加拉\":\"Bangladesh\",\"巴巴多斯\":\"Barbados\",\"比利时\":\"Belgium\",\"伯利兹\":\"Belize\",\"贝宁\":\"Benin\",\"百慕大\":\"Bermuda\",\"玻利维亚\":\"Bolivia\",\"博茨瓦纳\":\"Botswana\",\"巴西\":\"Brazil\",\"文莱\":\"Brunei\",\"保加利亚\":\"Bulgaria\",\"布隆迪\":\"Burundi\",\"喀麦隆\":\"Cameroon\",\"加拿大\":\"Canada\",\"智利\":\"Chile\",\"中国\":\"China\",\"哥伦比亚\":\"Colombia\",\"刚果(金)\":\"Congo\",\"哥斯达黎加\":\"Costa Rica\",\"古巴\":\"Cuba\",\"塞浦路斯\":\"Cyprus\",\"捷克\":\"Czech Republic\",\"丹麦\":\"Denmark\",\"吉布提\":\"Djibouti\",\"多米尼加\":\"Dominica\",\"多米尼克\":\"Dominican Republic\",\"厄瓜多尔\":\"Ecuador\",\"埃及\":\"Egypt\",\"萨尔瓦多\":\"El Salvador\",\"爱沙尼亚\":\"Estonia\",\"埃塞俄比亚\":\"Ethiopia\",\"斐济\":\"Fiji\",\"芬兰\":\"Finland\",\"法国\":\"France\",\"法属波利尼西亚\":\"French Polynesia\",\"加蓬\":\"Gabon\",\"格鲁吉亚\":\"Georgia\",\"德国\":\"Germany\",\"加纳\":\"Ghana\",\"希腊\":\"Greece\",\"格陵兰\":\"Greenland\",\"格林纳达\":\"Grenada\",\"危地马拉\":\"Guatemala\",\"海地\":\"Haiti\",\"洪都拉斯\":\"Honduras\",\"匈牙利\":\"Hungary\",\"冰岛\":\"Iceland\",\"印度\":\"India\",\"印度尼西亚\":\"Indonesia\",\"伊朗\":\"Iran\",\"伊拉克\":\"Iraq\",\"爱尔兰\":\"Ireland\",\"以色列\":\"Israel\",\"意大利\":\"Italy\",\"科特迪瓦\":\"Ivory Coast\",\"牙买加\":\"Jamaica\",\"日本\":\"Japan\",\"约旦\":\"Jordan\",\"哈萨克斯坦\":\"Kazakhstan\",\"肯尼亚\":\"Kenya\",\"韩国\":\"Korea, Peoples Republic of\",\"科威特\":\"Kuwait\",\"吉尔吉斯斯坦\":\"Kyrgyzstan\",\"老挝\":\"Laos\",\"拉脱维亚\":\"Latvia\",\"黎巴嫩\":\"Lebanon\",\"莱索托\":\"Lesotho\",\"列支敦士登\":\"Liechtenstein\",\"立陶宛\":\"Lithuania\",\"卢森堡\":\"Luxembourg\",\"马达加斯加\":\"Madagascar\",\"马来西亚\":\"Malaysia\",\"马尔代夫\":\"Maldives\",\"马里\":\"Mali\",\"马耳他\":\"Malta\",\"马提尼克岛\":\"Martinique\",\"毛里求斯\":\"Mauritius\",\"墨西哥\":\"Mexico\",\"摩纳哥\":\"Monaco\",\"蒙古\":\"Mongolia\",\"摩洛哥\":\"Morocco\",\"莫桑比克\":\"Mozambique\",\"纳米比亚\":\"Namibia\",\"尼泊尔\":\"Nepal\",\"荷兰\":\"Netherlands\",\"新西兰\":\"New Zealand\",\"尼加拉瓜\":\"Nicaragua\",\"尼日尔\":\"Niger\",\"尼日利亚\":\"Nigeria\",\"挪威\":\"Norway\",\"阿曼\":\"Oman\",\"巴基斯坦\":\"Pakistan\",\"巴拿马\":\"Panama\",\"巴布亚新几内亚\":\"Papua New Guinea\",\"巴拉圭\":\"Paraguay\",\"秘鲁\":\"Peru\",\"菲律宾\":\"Philippines\",\"波兰\":\"Poland\",\"葡萄牙\":\"Portugal\",\"波多黎各\":\"Puerto Rico\",\"卡塔尔\":\"Qatar\",\"留尼汪岛\":\"Reunion\",\"罗马尼亚\":\"Romania\",\"俄罗斯\":\"Russia\",\"圣马力诺\":\"San Marino\",\"沙特阿拉伯\":\"Saudi Arabia\",\"塞内加尔\":\"Senegal\",\"塞舌尔\":\"Seychelles\",\"新加坡\":\"Singapore\",\"斯洛伐克\":\"Slovakia\",\"斯洛文尼亚\":\"Slovenia\",\"南非\":\"South Africa\",\"西班牙\":\"Spain\",\"斯里兰卡\":\"Sri Lanka\",\"圣文森特和格林纳丁斯\":\"St. Vincent and the Grenadines\",\"苏丹\":\"Sudan\",\"斯威士兰\":\"Swaziland\",\"瑞典\":\"Sweden\",\"瑞士\":\"Switzerland\",\"叙利亚\":\"Syria\",\"塔吉克斯坦\":\"Tajikistan\",\"坦桑尼亚\":\"Tanzania, United Republic of\",\"泰国\":\"Thailand\",\"多哥\":\"Togo\",\"特立尼达和多巴哥\":\"Trinidad and Tobago\",\"突尼斯\":\"Tunisia\",\"土耳其\":\"Turkey\",\"乌干达\":\"Uganda\",\"乌克兰\":\"Ukraine\",\"阿联酋\":\"United Arab Emirates\",\"英国\":\"United Kingdom\",\"美国\":\"United States\",\"乌拉圭\":\"Uruguay\",\"乌兹别克斯坦\":\"Uzbekistan\",\"委内瑞拉\":\"Venezuela\",\"越南\":\"Vietnam\",\"也门\":\"Yemen\",\"赞比亚\":\"Zambia\"}";

    public static JSONObject getCountryMapping() {
        return JSONObject.fromObject(MAPPING);
    }
}
