package com.officialweb.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ClassName: gyzl
 * Version:
 * Description:
 *
 * @Program:
 * @Author: sniper
 * @Date: 2019/12/27 11:01
 */
@Controller
@RequestMapping("/gyzl")
public class gyzl {
    public gyzl() {
    }

    @GetMapping("/dsj")
    public String dsj(){
        return "gyzl/dsj";
    }
}
