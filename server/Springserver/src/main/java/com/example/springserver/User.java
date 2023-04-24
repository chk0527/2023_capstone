package com.example.springserver;

import javax.persistence.*;

@Entity
@Table(name = "comvideo")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    private int timestamp;

    private String object;

    private String action;

    private String link;

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }





    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTimestamp(int timestamp) {
        this.timestamp = timestamp;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public void setAva_label(String ava_label) {
        this.ava_label = ava_label;
    }



    private String ava_label;
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getTimestamp() {
        return timestamp;
    }

    public String getObject() {
        return object;
    }

    public String getAva_label() {
        return ava_label;
    }
    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }




}