package com.example.demo;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

class Task implements Serializable {
    private String id;
    private String name;
    private String description;
    private Boolean priority;
    private Boolean status;

    @JsonCreator
    Task(@JsonProperty("name") String name, @JsonProperty("desc") String description,
            @JsonProperty("priority") Boolean priority, @JsonProperty("status") Boolean status) {
        this.id = LocalDateTime.now().toString();
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.status = status;
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Boolean getPriority() {
        return this.priority;
    }

    public String setName(String name) {
        return this.name = name;
    }

    public String setDescrption(String desc) {
        return this.description = desc;
    }

    public Boolean setPriority(Boolean priority) {
        return this.priority = priority;
    }

    public Boolean setStatus(Boolean status) {
        return this.status = status;
    }

    @Override
    public String toString() {
        return this.name + " | " + this.status;
    }
}
