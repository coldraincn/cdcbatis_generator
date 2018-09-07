package com.juluancj.jlcj.entity.po;

import java.io.Serializable;

public class ActionLog implements Serializable{
    private static final long serialVersionUID = 1L;
    private Integer id;
    private Integer userId;
    private String ip;
    private String action;
    private String target;
    private String remark;
    private Integer status;
    private Long createTime;
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getIp() {
        return this.ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
    public String getAction() {
        return this.action;
    }

    public void setAction(String action) {
        this.action = action;
    }
    public String getTarget() {
        return this.target;
    }

    public void setTarget(String target) {
        this.target = target;
    }
    public String getRemark() {
        return this.remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    public Long getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }
}