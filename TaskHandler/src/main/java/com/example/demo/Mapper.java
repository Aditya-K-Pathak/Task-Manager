package com.example.demo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Date;
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

    @CrossOrigin
    @PostMapping("/get-task-summary/")
    public ResponseEntity<Summary> getTaskSummary(@RequestParam String username, @RequestParam String password) throws IOException{
        Summary summary = new Summary();
        TaskScheduler ts = new TaskScheduler();
        ts.FILEPATH += username + "_" + password + ".json";
        List<Task> taskList = ts.readTaskFromFile();
        System.err.println(taskList);

        int totalReceivedTasks = 0;
        int totalHighPriorityTasks = 0;
        int totalLowPriorityTask = 0;
        int totalCompleteTasks = 0;
        int totalHighPriorityCompleteTasks = 0;
        int totalLowPriorityCompleteTask = 0;
        int totalIncompleteTasks = 0;
        int totalHighPriorityIncompleteTasks = 0;
        int totalLowPriorityIncompleteTasks = 0;

        for (Task task: taskList){
            totalReceivedTasks ++;
            if (task.getPriority()){
                totalHighPriorityTasks ++;
            } else {
                totalLowPriorityTask ++;
            }
            if (task.getStatus()){
                totalCompleteTasks ++;
                if (task.getPriority()){
                    totalHighPriorityCompleteTasks ++;
                } else {
                    totalLowPriorityCompleteTask ++;
                }
            } else{
                totalIncompleteTasks ++;
                if (task.getPriority()){
                    totalHighPriorityIncompleteTasks ++;
                } else {
                    totalLowPriorityIncompleteTasks ++;
                }
            }
        }
        summary.setTotalReceivedTasks(totalReceivedTasks);
        summary.setTotalHighPriorityTasks(totalHighPriorityTasks);
        summary.setTotalLowPriorityTasks(totalLowPriorityTask);
        summary.setTotalCompleteTasks(totalCompleteTasks);
        summary.setTotalIncompleteTasks(totalIncompleteTasks);
        summary.setTotalHighPriorityCompleteTasks(totalHighPriorityCompleteTasks);
        summary.setTotalLowPriorityCompleteTasks(totalLowPriorityCompleteTask);
        summary.setTotalHighPriorityIncompleteTasks(totalHighPriorityIncompleteTasks);
        summary.setTotalLowPriorityIncompleteTasks(totalLowPriorityIncompleteTasks);

        return ResponseEntity.ok(summary);
    }

    @PostMapping("/add-task/")
    public ResponseEntity<String> addTask(@RequestParam String username, @RequestParam String password, 
        @RequestParam String name, @RequestParam String desc, 
        @RequestParam Boolean priority, @RequestParam Boolean status, @RequestParam String deadline) throws IOException {
            Task task = new Task(name, desc, priority, status, deadline);
            System.err.println(task);

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