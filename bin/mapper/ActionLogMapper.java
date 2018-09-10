package com.juluancj.jlcj.mapper;
import java.util.List;

import com.juluancj.jlcj.entity.po.ActionLog;
import com.juluancj.jlcj.mapper.provider.ActionLogProvider;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.DeleteProvider;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.UpdateProvider;

@Mapper
public interface ActionLogMapper{
    @Select(value = { "SELECT * FROM jl_action_log WHERE id = #{id}" })
    ActionLog find(int id);

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert(value = { "INSERT INTO jl_action_log(user_id,ip,action,target,remark,status,create_time) VALUES (#{userId},#{ip},#{action},#{target},#{remark},#{status},#{createTime})" })
    Integer insert(ActionLog ActionLog);

    @UpdateProvider(type=ActionLogProvider.class,method="update")
    int update(ActionLog ActionLog);

    @Delete(value = { "DELETE FROM jl_action_log WHERE id=#{id}" })
    int delete(int id);

    @Select(value = { "SELECT * FROM jl_action_log" })
    List<ActionLog> list();

    @DeleteProvider(type=ActionLogProvider.class,method="batchDelete")
    int batchDelete(String ids);

}