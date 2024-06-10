package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

class User {
    private String username;
    private String password;
    private String email;

    @JsonCreator
    public User(@JsonProperty("username") String username, 
            @JsonProperty("password") String password, 
            @JsonProperty("email") String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return this.username + " | " + this.email;
    }
}

public class UserHandler {
    private final String FILEPATH = "src/main/secrets/users.json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public boolean addUser(String username, String password, String email) throws IOException {
        List<User> users = readUsersFromFile();
        users.add(new User(username, password, email));
        writeUsersToFile(users);
        return true;
    }

    public boolean isUserPresent(String username, String password) throws IOException {
        List<User> users = readUsersFromFile();
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    private List<User> readUsersFromFile() throws IOException {
        File file = new File(FILEPATH);
        if (!file.exists()) {
            return new ArrayList<>(); // Return an empty list if the file does not exist
        }
        return objectMapper.readValue(file, new TypeReference<List<User>>() {});
    }

    private void writeUsersToFile(List<User> users) throws IOException {
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILEPATH), users);
    }
}
