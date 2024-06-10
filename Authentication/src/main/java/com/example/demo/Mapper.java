package com.example.demo;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Mapper {
    UserHandler db = new UserHandler();
    @CrossOrigin
    @PostMapping("/create-user/")
    public ResponseEntity<String> createUser(@RequestParam String username, @RequestParam String password, @RequestParam String email) throws IOException{
        if (db.isUserPresent(username, password)) 
            return ResponseEntity.badRequest().body("Username Already Exists!");

        db.addUser(username, password, email);
        return ResponseEntity.ok("User Created Successfully!");
    }

    @CrossOrigin
    @PostMapping("/get-user/")
    public ResponseEntity<Boolean> getUser(@RequestParam String username, @RequestParam String password, @RequestParam String email) throws IOException {
        return ResponseEntity.ok(db.isUserPresent(username, password));
    }

    @GetMapping("/")
    String Response() throws IOException{
        return "Hello World!";
    }
}
