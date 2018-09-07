package com.juluancj.jlcj.mapper.provider;
import com.juluancj.jlcj.entity.po.ActionLog;
import org.apache.ibatis.jdbc.SQL;
public class ActionLogProvider {
    public String update(ActionLog ActionLog) {
        String sql= new SQL() {
            {
                UPDATE("jl_action_log");
               if (ActionLog.getUserId() != null) {
                    SET("user_id = #{userId}");
                }
               if (ActionLog.getIp() != null) {
                    SET("ip = #{ip}");
                }
               if (ActionLog.getAction() != null) {
                    SET("action = #{action}");
                }
               if (ActionLog.getTarget() != null) {
                    SET("target = #{target}");
                }
               if (ActionLog.getRemark() != null) {
                    SET("remark = #{remark}");
                }
               if (ActionLog.getStatus() != null) {
                    SET("status = #{status}");
                }
               if (ActionLog.getCreateTime() != null) {
                    SET("create_time = #{createTime}");
                }
                WHERE("id=#{id}");
            }

        }.toString();
        return sql;
    }
    public String batchDelete(String ids) {
        String deletesql="DELETE FROM jl_action_log where id in ("+ids+")";
        return deletesql;
    }

}
