package com.example.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

class Response{
    private String message;
    private Boolean status;

    public Response(String message, Boolean status){
        this.message = message;
        this.status = status;
    }

    public String getMessage(){
        return this.message;
    }

    public Boolean getStatus(){
        return this.status;
    }
}

@RestController

public class Mapper{
    private String FILEPATH = "src/main/secrets/";

    @CrossOrigin
    @GetMapping("/create-task-file/")
    public ResponseEntity<String> createTaskFile(@RequestParam String username, @RequestParam String password) throws IOException {
        String filepath = this.FILEPATH + username + "_" + password + ".json";
        File file = new File(filepath);


        if (!file.exists()) {
            file.createNewFile();

            FileOutputStream fos = new FileOutputStream(filepath);
            fos.write("[]".getBytes());
            fos.close();
        }
        return ResponseEntity.ok("File created");
    }

    @CrossOrigin
    @GetMapping("/get-all-task/")
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam String username, @RequestParam String password) throws IOException{
        TaskScheduler ts = new TaskScheduler();
        ts.FILEPATH += username + "_" + password + ".json";
        List<Task> taskList = ts.readTaskFromFile();
        return ResponseEntity.ok(taskList);
    }

    @PostMapping("/add-task/")
    public ResponseEntity<String> addTask(@RequestParam String username, @RequestParam String password, 
        @RequestParam String name, @RequestParam String desc, 
        @RequestParam Boolean priority, @RequestParam Boolean status) throws IOException {
            Task task = new Task(name, desc, priority, status);

            TaskScheduler ts = new TaskScheduler();
            ts.FILEPATH += username + "_" + password + ".json";
            ts.addTask(task);
            return ResponseEntity.ok("Task added");
    }

    @PostMapping("/get-task/id/")
    public ResponseEntity<Task> getTaskById(@RequestParam String username, @RequestParam String password, @RequestParam String id) throws IOException{
        TaskScheduler ts = new TaskScheduler();
        ts.FILEPATH += username + "_" + password + ".json";
        Task task = ts.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping("/update-task/id/")
    public ResponseEntity<Task> updateTaskById(@RequestParam String username, 
        @RequestParam String password, @RequestParam String id, 
        @RequestParam String name, @RequestParam String desc,
        @RequestParam Boolean priority, @RequestParam Boolean status) throws IOException{
            TaskScheduler ts = new TaskScheduler();
            ts.FILEPATH += username + "_" + password + ".json";
            Task task = ts.updateTaskById(id, name, desc, priority, status);
            return ResponseEntity.ok(task);
        }

    @PostMapping("/delete-task/id/")
    public ResponseEntity<String> deleteTaskById(@RequestParam String username, @RequestParam String password, @RequestParam String id) throws IOException{
        TaskScheduler ts = new TaskScheduler();
        ts.FILEPATH += username + "_" + password + ".json";
        if (ts.deleteTaskById(id) != null)
            return ResponseEntity.ok("Task deleted");

        return ResponseEntity.badRequest().body("No Such Task Exist!");
    }

    @GetMapping("/")
    public ResponseEntity<Response> greet(){
        return ResponseEntity.ok(new Response("Hello World", true));
    }

}