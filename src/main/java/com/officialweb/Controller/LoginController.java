package com.officialweb.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ClassName: IndexController
 * Version:
 * Description:
 *
 * @Program:
 * @Author: sniper
 * @Date: 2019/12/27 09:05
 */
@Controller
public class LoginController {
    public LoginController() {
    }

    @RequestMapping("/")
    public String mainPage(){
        return "index";
    }
}
