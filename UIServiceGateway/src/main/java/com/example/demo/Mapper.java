package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Mapper {
    
    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/dashboard/")
    public String dashboard(@RequestParam String username, @RequestParam String password) {
        System.out.println(username + "|" + password);
        return "index";
    }
}

class User{
    private String username;
    private String password;

    String getUserName(){
        return username;
    }
    String getPassword(){
        return password;
    }

    String setUserName(String username){
        return this.username = username;
    }
    String getPassword(String password){
        return this.password = password;
    }
}