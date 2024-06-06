package com.example.demo;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TaskScheduler {
    String FILEPATH = "src/main/secrets/";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Task getTaskById(String id) throws IOException {
        List<Task> taskList = readTaskFromFile();
        for (Task task : taskList) {
            if (task.getId().equals(id)) {
                return task;
            }
        }
        return null;
    }

    public Task deleteTaskById(String id) throws IOException {
        List<Task> taskList = readTaskFromFile();
        for (Task task : taskList) {
            if (task.getId().equals(id)) {
                taskList.remove(task);
                writeTaskToFile(taskList);
                return task;
            }
        }
        return null;
    }

    public Boolean addTask(Task task) throws IOException {
        List<Task> taskList = readTaskFromFile();
        taskList.add(task);
        writeTaskToFile(taskList);
        return true;
    }

    public List<Task> readTaskFromFile() throws IOException {
        File file = new File(FILEPATH);

        if (!file.exists()) {
            return new ArrayList<>();
        }
        return objectMapper.readValue(file, new TypeReference<List<Task>>() {
        });
    }

    public Task updateTaskById(String id, String name, String description, Boolean priority, Boolean status)
            throws IOException {
        Task task = getTaskById(id);
        task.setName(name);
        task.setDescrption(description);
        task.setPriority(priority);
        task.setStatus(status);

        deleteTaskById(id);
        addTask(task);

        return task;
    }

    private void writeTaskToFile(List<Task> tasklist) throws IOException {
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILEPATH), tasklist);
    }
}
