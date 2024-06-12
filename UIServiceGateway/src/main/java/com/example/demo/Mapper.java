package com.example.demo;

import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Mapper {
    
    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/dashboard/")
    public String dashboard(@RequestParam String username, @RequestParam String password, Model model) {
        return "dashboard";
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